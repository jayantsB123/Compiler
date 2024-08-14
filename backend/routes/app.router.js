const express = require('express');
const { runCode, runCodeChallenge } = require('../controllers/app.controllers.run.js');
const { validateCodeInput, validateCodeChallengeInput } = require('../middlewares/app.middleware.js');

const router = express.Router();

router.post('/run', validateCodeInput, runCode);
router.post('/test', validateCodeChallengeInput, runCodeChallenge);

module.exports = router;
