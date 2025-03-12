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
        status: res.statusCode, 
        detail: 'Title and description are required', 
        instance: req.url}
    );

    logger.error('POST /courses failed: missing title or description in request body');
    return;
  }

  id++; // TODO: uuid
  const data = {id, title, description};

  courses.set(id, {title, description});

  res.status(201).json(data);
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

app.listen(port, () => {
  logger.info(`App listening on port ${port}`)
})