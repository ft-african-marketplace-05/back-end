const router = require("express").Router();
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");
const tokenBuilder = require("./token-builder");

const {
  checkUsernameUnique,
  checkUsernameExists,
  validateCredentials,
} = require("./auth-middleware");

router.post(
  "/register",
  validateCredentials,
  checkUsernameUnique,
  (req, res, next) => {
    let user = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;

    Users.add(user)
      .then((newUser) => {
        res.status(201).json({
          message: `Account successfully created. Welcome ${newUser.username}!`,
          newUser: {
            user_id: newUser.user_id,
            username: newUser.username,
            // phone_number: newUser.phone_number,
          },
        });
      })
      .catch(next);
  }
);

router.post(
  "/login",
  validateCredentials,
  checkUsernameExists,
  (req, res, next) => {
    try {
      if (bcrypt.compareSync(req.body.password, req.validUser.password)) {
        const token = tokenBuilder(req.validUser);
        res
          .status(200)
          .json({
            user_id: req.validUser.user_id,
            message: `Welcome back ${req.validUser.username}`,
            token,
          });
      } else {
        next({ status: 401, message: "Invalid credentials" });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;