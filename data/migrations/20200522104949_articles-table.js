exports.up = async function (knex) {
  await knex.schema.createTable("articles", (tbl) => {
    tbl.increments();
    tbl.text("name").notNull();
    tbl.text("url").notNull();
    tbl.text("publisher");
    tbl.text("description");
    tbl.integer("user_id").references("id").inTable("users");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("articles");
};
