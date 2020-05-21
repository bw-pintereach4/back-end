const express = require("express");
const db = require("./categories-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const categories = await db.getCategories();

    if (!categories) {
      res.status(404).json({
        message: "can't find categories",
      });
    }
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
