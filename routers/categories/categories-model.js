const db = require("../../data/config");

function getCategories() {
  return db("categories").select("category_name");
}

module.exports = {
  getCategories,
};
