const supertest = require("supertest");
const server = require("../server");

describe("category integration tests", () => {
  it("GET categories", async () => {
    const res = await supertest(server).get("/api/categories");

    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toHaveLength(5);
    expect(res.body[0].category_name).toMatch(/health/i);
  });
});
