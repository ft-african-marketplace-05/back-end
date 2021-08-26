const router = require("express").Router();
const Items = require("./items-model");

const {
  checkItemExists,
//   checkItemNicknameUnique,
  validateItemPayload,
} = require("./items-middleware");

router.get("/", (req, res, next) => {
  Items.findAll()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch(next);
});

router.get("/:item_id", checkItemExists, (req, res, next) => {
  Items.findById(req.params.item_id)
    .then((item) => {
      res.status(200).json(item);
    })
    .catch(next);
});

router.post("/", validateItemPayload, (req, res, next) => {
  Items.add(req.decodedToken.subject, req.body)
    .then((item) => {
      res.status(201).json(item);
    })
    .catch(next);
});

router.put("/:item_id", checkItemExists, validateItemPayload, (req, res, next) => {
    Items.update(req.params.item_id, req.body)
      .then((item) => {
        res.status(200).json(item);
      })
      .catch(next);
  }
);

router.delete("/:item_id", checkItemExists, (req, res, next) => {
  Items.remove(req.params.item_id)
    .then((item) => {
      res.status(200).json(item);
    })
    .catch(next);
});

module.exports = router;
