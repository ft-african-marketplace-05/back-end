const Items = require("./items-model");

async function checkItemExists(req, res, next) {
  try {
    const existing = await Items.findById(
      req.decodedToken.subject,
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
  const { name, description, price } = req.query;
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
    req.query.name = name.trim();
    req.query.description = description.trim();
    next();
  }
}

module.exports = {
  checkItemExists,
  validateItemPayload,
};