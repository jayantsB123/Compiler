const { body } = require('express-validator');

const validateCodeInput = [
  body('code').isString().notEmpty().withMessage('Code is required and must be a string'),
  body('timeout').optional().isInt({ min: 1000, max: 10000 }).withMessage('Timeout must be between 1000 and 10000 milliseconds'),
  body('compilerFlags').optional().isString().withMessage('Compiler flags must be a string'),
];

const validateCodeChallengeInput = [
  ...validateCodeInput,
  body('codeId').isString().notEmpty().withMessage('Code ID is required and must be a string'),
];

module.exports = {
  validateCodeInput,
  validateCodeChallengeInput,
};
