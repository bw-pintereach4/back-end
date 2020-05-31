const supertest = require("supertest");
const server = require("../server");
const db = require("../data/config");

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("users integration tests", () => {
  it("POST login user", async () => {
    const userObject = {
      username: "test1",
      password: "test1",
    };

    const user = await supertest(server)
      .post("/api/auth/login")
      .send(userObject);

    expect(user.statusCode).toBe(200);
    expect(user.type).toBe("application/json");
  });

  it("POST login a user with invalid username", async () => {
    const wrongUser = {
      username: "tst1",
      password: "test1",
    };

    const user = await supertest(server)
      .post("/api/auth/login")
      .send(wrongUser);

    expect(user.statusCode).toBe(428);
    expect(user.body.message).toBe("Login details invalid");
  });

  it("POST login a user with invalid password", async () => {
    const wrongUser = {
      username: "test1",
      password: "tst1",
    };

    const user = await supertest(server)
      .post("/api/auth/login")
      .send(wrongUser);

    expect(user.statusCode).toBe(401);
    expect(user.body.message).toMatch(/invalid password/i);
  });

  it("POST register user", async () => {
    const user = {
      username: "testing1",
      password: "testing",
      first_name: "Bob",
      last_name: "Ross",
      email: "bobross@ross.com",
    };

    const res = await supertest(server).post("/api/auth/register").send(user);

    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
  });

  it("POST register user with taken username", async () => {
    const user = {
      username: "test1",
      password: "test",
      first_name: "Jim",
      last_name: "Jimmy",
      email: "jim@jimmy.com",
    };

    const res = await supertest(server).post("/api/auth/register").send(user);

    expect(res.statusCode).toBe(409);
    expect(res.type).toBe("application/json");
    expect(res.body.message).toMatch(/username is taken/i);
  });
});
