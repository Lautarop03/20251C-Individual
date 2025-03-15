const request = require("supertest");
const app = require("../app");
const { NIL: NIL_UUID } = require('uuid');

require("dotenv").config();

const NEWCOURSE = {
  title: "Test Course",
  description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
};

const createCourse = async () => {
  const res = await request(app)
    .post("/courses")
    .send(NEWCOURSE);
  return res;
};

const expectErrorResponse = (res, status) => {
  expect(res.statusCode).toBe(status);
  expect(res.body).toHaveProperty('type');
  expect(res.body).toHaveProperty('title');
  expect(res.body).toHaveProperty('status');
  expect(res.body).toHaveProperty('detail');
  expect(res.body).toHaveProperty('instance');
};

describe("POST /courses", () => {
    it("should create a new course and return 201 with course data", async () => {
      const res = await createCourse();
        
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data.title).toBe(NEWCOURSE.title);
      expect(res.body.data.description).toBe(NEWCOURSE.description);
    });

    it('should return 400 if the body is invalid', async () => {
      const res = await request(app)
        .post("/courses")
        .send({
          // 'title' is missing
          description: "Course without a title"
        });
      
      expectErrorResponse(res, 400);
      });
});

describe('GET /courses', () => {
  it('should return all courses and return 200 with an array', async () => {
    await createCourse();
      
    const response = await request(app)
      .get('/courses')

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    
    // Check if the array have the new course
    const found = response.body.data.find(course => course.title === NEWCOURSE.title);
    expect(found).toBeDefined();
    expect(found).toHaveProperty('id');
    expect(found.description).toBe(NEWCOURSE.description);
  });
});

describe('GET /courses/:id', () => {
  it("should return a course by id and return 200", async () => {
    const postResponse = await createCourse();

    const courseId = postResponse.body.data.id;

    const response = await request(app)
      .get(`/courses/${courseId}`)

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.id).toBe(courseId);
    expect(response.body.data.title).toBe(NEWCOURSE.title);
    expect(response.body.data.description).toBe(NEWCOURSE.description);
  });

  it('should return 404 if course is not found', async () => {
    const response = await request(app)
      .get(`/courses/${NIL_UUID}`)

    expectErrorResponse(response, 404);
  });
});

describe('DELETE /courses/:id', () => {
  it('should delete a course by id and return 204', async () => {
    // Create a course first
    const postResponse = await createCourse();

    const courseId = postResponse.body.data.id;

    // Delete the course
    const deleteResponse = await request(app)
      .delete(`/courses/${courseId}`)

    expect(deleteResponse.statusCode).toBe(204);

    // Verify that it no longer exists
    const getResponse = await request(app)
      .get(`/courses/${courseId}`)

    expect(getResponse.statusCode).toBe(404);
  });

  it('should return 404 if course to delete is not found', async () => {
    const response = await request(app)
      .delete(`/courses/${NIL_UUID}`)

    expectErrorResponse(response, 404);
  });
});
