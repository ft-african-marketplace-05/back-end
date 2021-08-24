const Users = require("./users-model");

async function checkUserExists(req, res, next) {
  const existing = await Users.findById(req.decodedToken.subject);
  console.log(existing)
  try {
    if (!existing) {
      next({ status: 404, message: "No user found with that ID." });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

function checkUserPayload(req, res, next) {
  const { username } = req.query;
  if (!username || username.trim().length < 3 || username.trim() > 30) {
    next({
      status: 422,
      message: "Username must be between 3 and 30 characters.",
    });
  } else {
    req.body.username = username.trim();
    next();
  }
}

module.exports = { checkUserExists, checkUserPayload };