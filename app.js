const express = require("express");
const winston = require("winston");

const app = express()
const port = process.env.PORT

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

// This middleware is for req.body to work
app.use(express.json());

// TODO: usar un uuid
let id = 0;

const courses = new Map();

// TODO: Documenta funciones y clases siguiendo el estándar del lenguaje elegido.

app.post('/courses', (req, res) => {
  const {title, description} = req.body;

  if (!title || !description) { // esta condicion es suficiente?
    res.status(400).json(
      {type: 'about:blank', 
        title: 'Bad Request', 
        status: 400, 
        detail: 'Title and description are required', 
        instance: req.url}
    );

    logger.error('POST /courses failed: missing title or description in request body');
    return;
  }

  id++; // TODO: uuid
  const data = {id, title, description};

  courses.set(id, {title, description});

  res.status(201).json({data});
  logger.info(`Course created: ${title}`);
})

app.get('/courses', (req, res) => {
  const data = Array.from(courses.entries()).map(([id, course]) => ({
    id,
    title: course.title,
    description: course.description
  }));

  res.status(200).json({data});
  logger.info('GET /courses');
});

app.get('/courses/:id', (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!courses.has(id)) {
      res.status(404).json(
        {type: 'about:blank', 
          title: 'Not Found', 
          status: 404, 
          detail: 'Course not found', 
          instance: req.url}
      );

      logger.error('GET /courses/:id failed: course not found');
      return;
    } 

    const course = courses.get(id)
    const data = {id, ...course};
    res.status(200).json({data});
    logger.info(`GET /courses/${id}`);

  } catch (error) {
    res.status(500).json(
      {type: 'about:blank', 
        title: 'Internal Server Error', 
        status: 500, 
        detail: error.message, 
        instance: req.url}
    );

    logger.error('GET /courses/:id failed: internal server error');
  }
});

app.listen(port, () => {
  logger.info(`App listening on port ${port}`)
})