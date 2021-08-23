exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("items")
      .del()
      .then(function () {
        // Inserts seed entries
        return knex("items").insert([
          {
            name: "Olive",
            description: "Olive",
            price: 2,
            user_id: 1,
          },
          {
            name: "Rice",
            description: "White Rice",
            price: 3,
            user_id: 1,
          },
          {
            name: "Corn",
            description: "Corn on the cob",
            price: 4,
            user_id: 2,
          },
          {
            name: "Blueberries",
            description: "100 berries per pack",
            price: 7,
            user_id: 3,
          },
          {
            name: "Apple",
            description: "Honeycrisp Apple",
            price: 2,
            user_id: 2,
          },
          {
            name: "Bananas",
            description: "Bundle of bananas",
            price: 5,
            user_id: 4,
          },
          {
            name: "Salmon",
            description: "Fresh salmon",
            price: 6,
            user_id: 4,
          },
        ]);
      });
  };
  