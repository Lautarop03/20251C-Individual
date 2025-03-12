const express = require("express");
const winston = require("winston");

const app = express()
const port = 3000 // ENV

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

// usar un uuid
let id = 0;

const courses = new Map();

// Documenta funciones y clases siguiendo el estándar del lenguaje elegido.

// Variables de entorno en otro archivo ¿.env?

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

    logger.error('Post /courses request without title or description');
    return;
  }

  id++; // uuid
  const data = {id, title, description};

  courses.set(id, {title, description});

  res.status(201).json(data);
  logger.info(`Course created: ${title}`);
})

app.listen(port, () => {
  logger.info(`App listening on port ${port}`)
})