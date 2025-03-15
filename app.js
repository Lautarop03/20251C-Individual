const express = require("express");
const winston = require("winston");
const { v4: uuidv4 } = require('uuid');
const Ajv = require("ajv")
require("dotenv").config();

const app = express();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

// Middleware to check if the request body is valid
const ajv = new Ajv();
const schema = {
  type: 'object',
  properties: {
    title: { 
      type: 'string',
      minLength: 1
     },
    description: { 
      type: 'string',
      minLength: 50,
      maxLength: 255
    }
  },
  required: ['title', 'description'],
  additionalProperties: false // Additional properties are not allowed
};
const validate = ajv.compile(schema);

// This middleware is for req.body to work
app.use(express.json());

// map to persist data in memory 
const courses = new Map();

// Creates a new course and stores it in memory.
app.post('/courses', (req, res) => {
  const {title, description} = req.body;
  
  if (!validate(req.body)) {
    res.status(400).json(
      {type: 'about:blank', 
        title: 'Bad Request', 
        status: 400, 
        detail: 'Invalid request body', 
        instance: req.url}
    );

    logger.error('POST /courses failed: Invalid request body');
    return;
  }

  const id = uuidv4(); // Generates a unique ID for the course

  const data = {id, title, description};

  courses.set(id, {title, description});

  res.status(201).json({data});
  logger.info(`Course created: ${title}, ID: ${id}`);
})

// Returns all courses in reverse chronological order.
app.get('/courses', (req, res) => {
  const data = Array.from(courses.entries()).map(([id, course]) => ({ // mostrar en orden cronológico inverso
    id,
    title: course.title,
    description: course.description
  }));

  res.status(200).json({data});
  logger.info('GET /courses');
});

// Reusable function to handle the "not found" case
const handleCourseNotFound = (res, req) => {
  res.status(404).json({
    type: 'about:blank',
    title: 'Not Found',
    status: 404,
    detail: 'Course not found',
    instance: req.url
  });
};

// Reusable function to handle the "internal server error" case
const handleInternalServerError = (res, req, error) => {
  res.status(500).json(
    {type: 'about:blank', 
      title: 'Internal Server Error', 
      status: 500, 
      detail: error.message, 
      instance: req.url}
  );
};

// Returns a course by its ID.
app.get('/courses/:id', (req, res) => {
  try {
    const id = req.params.id;

    if (!courses.has(id)) {
      handleCourseNotFound(res, req);

      logger.error(`GET /courses/${id} failed: course not found`);
      return;
    }

    const course = courses.get(id)
    const data = {id, ...course};
    res.status(200).json({data});
    logger.info(`GET /courses/${id}`);

  } catch (error) {
    handleInternalServerError(res, req, error);

    logger.error(`GET /courses/${id} failed: internal server error`);
  }
});

// Deletes a course by its ID.
app.delete('/courses/:id', (req, res) => {
  try {
    const id = req.params.id;

    if (!courses.delete(id)) {
      handleCourseNotFound(res, req);

      logger.error(`DELETE /courses/${id} failed: course not found`);
      return;
    }

    res.status(204).send();
    logger.info(`DELETE /courses/${id}`);
  } catch (error) {
    handleInternalServerError(res, req, error);

    logger.error(`DELETE /courses/${id} failed: internal server error`);
  }
});

module.exports = app;