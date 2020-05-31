const db = require("../../data/config");

function findBy(username) {
  return db("users").where({ username });
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return { id, ...user };
}

module.exports = {
  findBy,
  add,
};
