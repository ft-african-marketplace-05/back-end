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

// async function checkItemNameUnique(req, res, next) {
//   try {
//     const existing = await Items.findBy(req.decodedToken.subject, {
//       name: req.body.name,
//     }).first();
//     if (existing) {
//       next({ status: 422, message: "This name is taken already." });
//     } else {
//       next();
//     }
//   } catch (err) {
//     next(err);
//   }
// }

function validateItemPayload(req, res, next) {
  const { name, description, price } = req.body;
  if (!name || name.trim() === 0 || !description || description.trim() === 0) {
    next({ status: 422, message: "Name and description required." });
  } else if (price === undefined) {
    next({ status: 422, message: "Price required." });
  } else if (typeof price !== "number") {
    next({ status: 422, message: "Price must be a number" });
  } else if (price < .01) {
    next({ status: 422, message: "Price must be at least .01" });
  } else {
    req.body.name = name.trim();
    req.body.description = description.trim();
    next();
  }
}

module.exports = {
  checkItemExists,
//   checkItemNameUnique,
  validateItemPayload,
};