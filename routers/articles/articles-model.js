const db = require("../../data/config");

async function getArticles(id) {
  const articles = await db("articles as a").where("a.user_id", id);

  const categories = articles.map((item) => {
    return getArticleCategories(item.id);
  });

  await Promise.all(categories).then((category) => {
    const articleCategories = {};
    category.forEach((item) => {
      item.forEach((item2) => {
        if (!articleCategories[item2.article_id]) {
          articleCategories[item2.article_id] = [];
        }
        articleCategories[item2.article_id].push(item2.category_name);
      });
    });
    articles.forEach((article) => {
      if (articleCategories[article.id]) {
        article.categories = articleCategories[article.id];
      } else {
        article.categories = [];
      }
    });
    return articles;
  });
  return articles;
}

// articles.forEach(article => {
//   value.forEach(i => {

//   })
// })

function getArticleCategories(articleId) {
  return db("categories as c")
    .join("articles_categories as ac", "c.id", "ac.category_id")
    .where("ac.article_id", articleId)
    .select("c.category_name", "ac.article_id");
}

function getArticlesByCategory(catId, userId) {
  return db("articles_categories as ac")
    .join("articles as a", "a.id", "ac.article_id")
    .where("ac.category_id", catId)
    .andWhere("a.user_id", userId)
    .select(["a.name", "a.url", "a.publisher", "a.description"]);
}

async function getArticleById(id) {
  const articles = await db("articles").where({ id }).first();

  const categories = await getArticleCategories(articles.id);

  return { ...articles, categories };
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

function addCategory(arr) {
  return db("articles_categories").insert(arr);
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
  getArticleById,
  getArticleCategories,
};

async function getCategoryById(id) {
  await db("categories").where({ id });

  return;
}
