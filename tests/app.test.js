const request = require("supertest");
const app = require("../app");
require("dotenv").config();

describe("POST /courses", () => {
    it("should return body with title and description", async () => {
      const res = await request(app)
        .post("/courses")
        .send({
          title: "Test Course",
          description: "Test Description",
        });
        
      expect(res.statusCode).toBe(201);
      expect(res.body.data.title).toBe("Test Course");
      expect(res.body.data.description).toBe("Test Description");
    });
});
  