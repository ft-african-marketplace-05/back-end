const bcrypt = require("bcryptjs");

const hash = bcrypt.hashSync("password", 8);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "isaac", password: hash, phone_number: "555-837-2847" },
        { username: "jon", password: hash, phone_number: "555-738-1198" },
        { username: "jason", password: hash, phone_number: "555-166-2367" },
        { username: "garrett", password: hash, phone_number: "555-455-2801" },
      ]);
    });
};
