const supertest = require("supertest");
const server = require("../server");

test("Welcome URL", async () => {
  const res = await supertest(server).get("/");

  expect(res.statusCode).toBe(200);
  expect(res.body.message).toMatch(/welcome/i);
  expect(res.type).toBe("application/json");
});
