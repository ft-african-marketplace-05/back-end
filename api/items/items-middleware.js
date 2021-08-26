const Items = require("./items-model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/index");

async function checkItemExists(req, res, next) {
  try {
    const existing = await Items.findById(
      req.params.item_id
    );
    if (!existing) {
      next({ status: 404, message: "No item found with that ID." });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateItemPayload(req, res, next) {
  const { name, description, price } = req.body;
  let newPrice;
  try { 
    if (price === undefined) {
      next({ status: 422, message: "Price required." });
    }
   newPrice = parseFloat(price)
  }
  catch {
    next({ status: 422, message: "Price must be a number" });
  }
  if (!name || name.trim() === 0 || !description || description.trim() === 0) {
    next({ status: 422, message: "Name and description required." });
  } else if (newPrice < .01) {
    next({ status: 422, message: "Price must be at least .01" });
  } else {
    req.body.name = name.trim();
    req.body.description = description.trim();
    next();
  }
}

function restricted(req, res, next) {
  let token = req.headers.authorization;
  if (!token) {
    return next({ status: 401, message: "Token required." });
  }
  token = token.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
        console.log(token)
      return next({ status: 401, message: "Invalid token." });
    }
    req.decodedToken = decodedToken;
    next();
  });
}

module.exports = {
  checkItemExists,
  validateItemPayload,
  restricted
};