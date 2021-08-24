const db = require("../data/db-config");

function findAll() {
  return db("users")
    .select("user_id", "username")
    .orderBy("user_id", "asc");
}

async function findById(user_id) {
  const rows = await db("users as u")
    .join("items as i", "u.user_id", "i.user_id")
    .where("u.user_id", user_id);

  if (rows.length === 0) {
    return undefined;
  }

  const result = {
    user_id: rows[0].user_id,
    username: rows[0].username,
    items: [],
  };

  rows.forEach((row) => {
    result.items.push({
      item_id: row.item_id,
      name: row.name,
      description: row.description,
      price: row.price,
    });
  });

  return result;
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [newUser] = await db("users").insert(user, [
    "user_id",
    "username",
  ]);
  return newUser;
}

async function update(user_id, user) {
  const [updatedUser] = await db("users")
    .update(user, ["user_id", "username"])
    .where("user_id", user_id);
  return updatedUser;
}

async function remove(user_id) {
  const [deletedUser] = await db("users")
    .del(["user_id", "username"])
    .where("user_id", user_id);
  return deletedUser;
}

module.exports = { findAll, findById, findBy, add, update, remove };