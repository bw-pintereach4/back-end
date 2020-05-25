exports.up = async function (knex) {
  await knex.schema.createTable("articles_categories", (tbl) => {
    tbl.increments();
    tbl.integer("article_id").references("id").inTable("articles");
    tbl.integer("category_id").references("id").inTable("categories");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("articles_categories");
};
