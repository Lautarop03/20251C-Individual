const winston = require('winston');
const Ajv = require('ajv')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()]
});

// Middleware to check if the request body is valid
const ajv = new Ajv();
const schema = {
  type: 'object',
  properties: {
    title: {type: 'string', minLength: 1},
    description: {type: 'string', minLength: 50, maxLength: 255}
  },
  required: ['title', 'description'],
  additionalProperties: false  // Additional properties are not allowed
};
const validate = ajv.compile(schema);

module.exports = {
  logger,
  validate
};