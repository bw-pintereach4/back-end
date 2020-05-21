exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("categories")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("categories").insert([
        { category_name: "Health" },
        { category_name: "Educational" },
        { category_name: "Sports" },
        { category_name: "Technology" },
        { category_name: "History" },
      ]);
    });
};
