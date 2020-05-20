require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
// const bodyParser = require("body-parser");

const server = express();

server.use(express.json());
server.use(cors());
// server.use(bodyParser());

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
