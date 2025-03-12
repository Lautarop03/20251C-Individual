const request = require("supertest");
const app = require("../app");
require("dotenv").config();

describe("POST /courses", () => {
    it("should create a new course and return 201 with course data", async () => {
      const res = await request(app)
        .post("/courses")
        .send({
          title: "Test Course",
          description: "Test Description"
        });
        
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data.title).toBe("Test Course");
      expect(res.body.data.description).toBe("Test Description");
    });

    it('should return 400 if the body is invalid', async () => {
      const res = await request(app)
        .post("/courses")
        .send({
          // 'title' is missing
          description: "Course without a title"
        });
        
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('type');
      expect(res.body).toHaveProperty('title');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('detail');
      expect(res.body).toHaveProperty('instance');
});
});