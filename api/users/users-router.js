const router = require("express").Router();
const Users = require("./users-model");
const { checkUserExists, checkUserPayload } = require("./users-middleware");

router.get("/", (req, res, next) => {
  Users.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get("/:user_id", checkUserExists, (req, res, next) => {
  Users.findById(req.params.user_id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.put("/:user_id", checkUserExists, checkUserPayload, (req, res, next) => {
  Users.update(req.decodedToken.subject, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.delete("/:user_id", checkUserExists, (req, res, next) => {
  Users.remove(req.decodedToken.subject)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

module.exports = router;