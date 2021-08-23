exports.up = async (knex) => {
    await knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 30).unique().notNullable();
      users.string("password").notNullable();
      users.string("phone_number", 20).notNullable();
    })
    .createTable("items", (items) => {
      items.increments("item_id");
      items.string("name", 50).notNullable();
      items.string("description", 100).notNullable();
      items.integer("price").notNullable();
      items.text("location", 250);
      items
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists("items").dropTableIfExists("users");
};
