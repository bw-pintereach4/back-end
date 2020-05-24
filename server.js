require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
// const bodyParser = require("body-parser");

const authRouter = require("./auth/auth-router");
const categoriesRouter = require("./routers/categories/categories-router");
const articlesRouter = require("./routers/articles/articles-router");
const restrict = require("./auth/restrict");

const server = express();

server.use(express.json());
server.use(cors());
// server.use(bodyParser());

server.use("/api/auth", authRouter);
server.use("/api/categories", categoriesRouter);
server.use("/api/articles", restrict(), articlesRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "something went wrong",
  });
});

server.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to my API!",
  });
});

if (!module.parent) {
  server.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
}

module.exports = server;
