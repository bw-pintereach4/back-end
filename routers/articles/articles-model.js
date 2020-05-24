const db = require("../../data/config");
const { findBy } = require("../users/user-model");

function getArticles(id) {
  return db("articles").where("user_id", id);
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

module.exports = {
  getArticles,
  addArticle,
  editArticle,
  deleteArticle,
};
