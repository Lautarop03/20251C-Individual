const express = require("express");
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();

const { logger, validate } = require("./middlewares");

const Database = require("./db");

const app = express();
app.use(express.json());

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

  //courses.set(id, {title, description});
  Database.create(data); // Persist the course in memory

  res.status(201).json({data});
  logger.info(`Course created: ${title}, ID: ${id}`);
})

// Returns all courses in reverse chronological order.
app.get('/courses', (req, res) => {
  /*const data = Array.from(courses.entries()).map(([id, course]) => ({ // TODO: mostrar en orden cronológico inverso
    id,
    title: course.title,
    description: course.description
  }));*/
  const data = Database.getAll();

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

    if (!Database.exists(id)) {
      handleCourseNotFound(res, req);

      logger.error(`GET /courses/${id} failed: course not found`);
      return;
    }

    //const course = courses.get(id)
    const course = Database.getById(id);
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

    if (!Database.delete(id)) {
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