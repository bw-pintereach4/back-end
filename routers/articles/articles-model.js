const db = require("../../data/config");

function getArticles(id) {
  return db("articles").where("user_id", id);
}

function getArticlesByCategory(catId, userId) {
  return db("articles_categories as ac")
    .join("articles as a", "a.id", "ac.article_id")
    .where("ac.category_id", catId)
    .andWhere("a.user_id", userId)
    .select(["a.name", "a.url", "a.publisher", "a.description"]);
}

function getArticleById(id) {
  return db("articles").where({ id });
}

async function addArticle(article) {
  const [id] = await db("articles").insert(article);

  return { id, ...article };
}

async function editArticle(article, id) {
  await db("articles").where("id", id).update(article);

  return getArticleById(id);
}

async function deleteArticle(id) {
  return db("articles").where({ id }).del();
}

async function addCategory(arr) {
  await db("articles_categories").insert(arr);

  return;
}

function getCategories() {
  return db("categories").select("*");
}

module.exports = {
  getArticles,
  addArticle,
  editArticle,
  deleteArticle,
  addCategory,
  getArticlesByCategory,
  getCategoryById,
  getCategories,
};

async function getCategoryById(id) {
  await db("categories").where({ id });

  return;
}
