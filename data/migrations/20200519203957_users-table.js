exports.up = async function (knex) {
  await knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.text("username").notNull().unique();
    tbl.text("password").notNull();
    tbl.text("first_name").notNull();
    tbl.text("last_name").notNull();
    tbl.text("email").notNull().unique();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
};
