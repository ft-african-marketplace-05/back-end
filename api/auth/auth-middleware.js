const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/index");
const Users = require("../users/users-model");

async function checkUsernameUnique(req, res, next) {
  try {
    const existing = await Users.findBy({
      username: req.body.username,
    }).first();
    if (existing) {
      next({ status: 422, message: "This username is taken already." });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateCredentials(req, res, next) {
  const { username, password } = req.query;
  if (
    !username ||
    username.trim() === "" ||
    !password ||
    password.trim() === ""
  ) {
    next({ status: 422, message: "Username and password required." });
  } else if (username.trim().length < 3 || username.trim() > 30) {
    next({
      status: 422,
      message: "Username must be between 3 and 30 characters.",
    });
  } else if (password.trim().length < 6 || password.trim().length > 30) {
    next({
      status: 422,
      message: "Password must be between 6 and 30 characters.",
    });
  } else {
    req.body.username = username.trim();
    req.body.password = password.trim();
    next();
  }
}

async function checkUsernameExists(req, res, next) {
  try {
    const existing = await Users.findBy({
      username: req.body.username,
    }).first();
    if (!existing) {
      next({ status: 404, message: "User not found." });
    } else {
      req.validUser = existing;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return next({ status: 401, message: "Token required." });
  }
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return next({ status: 401, message: "Invalid token." });
    }
    req.decodedToken = decodedToken;
    next();
  });
}

module.exports = {
  validateCredentials,
  checkUsernameExists,
  checkUsernameUnique,
  restricted,
};