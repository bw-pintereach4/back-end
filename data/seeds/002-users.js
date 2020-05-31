const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(async function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "test1",
          password: await bcrypt.hash("test1", 12),
          first_name: "john",
          last_name: "doe",
          email: "test1@gmail.com",
        },
        {
          username: "test2",
          password: await bcrypt.hash("test2", 12),
          first_name: "jane",
          last_name: "doe",
          email: "test2@gmail.com",
        },
        {
          username: "test3",
          password: await bcrypt.hash("test3", 12),
          first_name: "jim",
          last_name: "doe",
          email: "test3@gmail.com",
        },
      ]);
    });
};
