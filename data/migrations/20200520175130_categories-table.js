exports.up = async function (knex) {
  await knex.schema.createTable("categories", (tbl) => {
    tbl.increments();
    tbl.text("category_name").notNull().unique();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("categories");
};
