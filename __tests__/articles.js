const supertest = require("supertest");
const server = require("../server");
const db = require("../data/config");

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("article integration tests", () => {
  it("GET articles by userId", async () => {
    const userObject = {
      username: "test1",
      password: "test1",
    };

    const user = await supertest(server)
      .post("/api/auth/login")
      .send(userObject);

    expect(user.statusCode).toBe(200);

    const res = await supertest(server)
      .get("/api/articles")
      .set("Authorization", user.body.token);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it("GET articles while not logged in", async () => {
    const res = await supertest(server).get("/api/articles");

    expect(res.statusCode).toBe(401);
  });

  it("POST article", async () => {
    const userObject = {
      username: "test1",
      password: "test1",
    };

    const user = await supertest(server)
      .post("/api/auth/login")
      .send(userObject);

    expect(user.statusCode).toBe(200);

    const article = {
      name: "test article",
      url: "pintereach.com",
      publisher: "Bob",
      description: "Test description",
      categories: [1, 3, 4],
    };

    const res = await supertest(server)
      .post("/api/articles")
      .send(article)
      .set("Authorization", user.body.token);

    expect(res.statusCode).toBe(200);
  });

  it("PUT article", async () => {
    const userObject = {
      username: "test1",
      password: "test1",
    };

    const user = await supertest(server)
      .post("/api/auth/login")
      .send(userObject);

    expect(user.statusCode).toBe(200);

    const newArticle = {
      name: "edited article",
      url: "pintereach.com",
      publisher: "Bob",
      description: "Test description",
      categories: [1, 4],
    };

    const res = await supertest(server)
      .put("/api/articles/1")
      .send(newArticle)
      .set("Authorization", user.body.token);

    expect(res.statusCode).toBe(200);
  });

  it("DELETE article", async () => {
    const userObject = {
      username: "test1",
      password: "test1",
    };

    const user = await supertest(server)
      .post("/api/auth/login")
      .send(userObject);

    expect(user.statusCode).toBe(200);

    const res = await supertest(server)
      .delete("/api/articles/1")
      .set("Authorization", user.body.token);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/has been nuked/i);
  });
});
