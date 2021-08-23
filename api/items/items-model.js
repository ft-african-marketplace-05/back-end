const db = require("../data/db-config");

function findAll(user_id) {
  return db("items").where("user_id", user_id);
}

function findById(user_id, item_id) {
  return db("items")
    .where("user_id", user_id)
    .andWhere("item_id", item_id)
    .first();
}

function findBy(user_id, filter) {
  return db("items").where("user_id", user_id).andWhere(filter);
}

async function add(user_id, item) {
  const [newItem] = await db("items").insert(
    {
      user_id: user_id,
      name: item.name,
      description: item.description,
      price: item.price,
      location: item.location,
    },
    [
      "item_id",
      "name",
      "description",
      "price",
      "location",
      "user_id",
    ]
  );
  return newItem;
}

async function update(user_id, item_id, item) {
  const [updatedItem] = await db("items")
    .update(
      {
        user_id: user_id,
        name: item.name,
        description: item.description,
        price: item.price,
        location: item.location,
      },
      [
        "item_id",
        "name",
        "description",
        "price",
        "location",
        "user_id",
      ]
    )
    .where("item_id", item_id);
  return updatedItem;
}

async function remove(item_id) {
  const [removedItem] = await db("items")
    .del(["item_id", "name", "description", "user_id"])
    .where("item_id", item_id);
  return removedItem;
}

module.exports = { findAll, findById, findBy, add, update, remove };