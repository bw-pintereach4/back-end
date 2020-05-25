const db = require("../../data/config");

function getCategories() {
  return db("categories").select("*");
}

module.exports = {
  getCategories,
};
