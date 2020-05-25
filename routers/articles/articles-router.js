const express = require("express");
const db = require("./articles-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const articles = await db.getArticles(req.token.userId);

    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, url, publisher, description, categories } = req.body;

    const payload = {
      user_id: req.token.userId,
      name,
      url,
      publisher,
      description,
    };

    if (!name || !url || !publisher || !description) {
      return res.status(400).json({
        message: "Missing info",
      });
    } else {
      const article = await db.addArticle(payload);

      const categories2 = categories.map((id) => {
        return {
          article_id: article.id,
          category_id: id,
        };
      });

      await db.addCategory(categories2);

      res.status(200).json(article);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/categories/:id", async (req, res, next) => {
  try {
    const categories = await db.getArticlesByCategory(
      req.params.id,
      req.token.userId
    );

    if (categories.length === 0) {
      res.status(404).json({
        message: "Couldn't find articles with those categories",
      });
    } else {
      res.status(200).json(categories);
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { name, url, publisher, description } = req.body;

    if (!name || !url || !publisher || !description) {
      return res.status(400).json({
        message: "Missing info",
      });
    }

    const article = await db.editArticle(req.body, req.params.id);

    res.status(200).json(article);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await db.deleteArticle(req.params.id);

    if (!deleted) {
      res.status(400).json({
        message: "couldn't find article by that id",
      });
    }

    res.status(200).json({
      message: "Article has been nuked",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
