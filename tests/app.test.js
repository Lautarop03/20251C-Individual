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

describe('GET /courses', () => {
  it('should return all courses and return 200 with an array', async () => {
    const newCourse = {
      title: 'Test Course',
      description: 'Test Description'
    };

    await request(app)
      .post('/courses')
      .send(newCourse)
      
    const response = await request(app)
      .get('/courses')

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);

    const found = response.body.data.find(course => course.title === newCourse.title);
    expect(found).toBeDefined();
    expect(found).toHaveProperty('id');
    expect(found.description).toBe(newCourse.description);
  });
});

describe('GET /courses/:id', () => {
  it("should return a course by id and return 200", async () => {
    const newCourse = {
      title: "Test Course",
      description: "Test Description"
    };

    const postResponse = await request(app)
      .post("/courses")
      .send(newCourse)

    const courseId = postResponse.body.data.id;

    const response = await request(app)
      .get(`/courses/${courseId}`)

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.id).toBe(courseId);
    expect(response.body.data.title).toBe(newCourse.title);
    expect(response.body.data.description).toBe(newCourse.description);
  });

  it('should return 404 if course is not found', async () => {
    const fakeId = "0";

    const response = await request(app)
      .get(`/courses/${fakeId}`)

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('type');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('detail');
    expect(response.body).toHaveProperty('instance');
  });
});