const db = require("../data/db-config");

function findAll(user_id) {
  return db("items");
}

function findById(item_id) {
  return db("items")
  .where("item_id", item_id)
}

// function findBy(user_id, filter) {
//   return db("items").where("user_id", user_id).andWhere(filter);
// }

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

async function update(item_id, item) {
  const [updatedItem] = await db("items")
    .update(
      {
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

module.exports = { findAll, findById, add, update, remove };