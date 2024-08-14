const { validationResult } = require('express-validator');
const { executeCppCode } = require('../services/app.execute.js');
const Challenge = require('../models/app.model.js');

const runCode = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { code, timeout, compilerFlags } = req.body;

  executeCppCode(code, compilerFlags, timeout, [], (err, output) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json({ output });
  });
};

const runCodeChallenge = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { code, codeId, timeout, compilerFlags } = req.body;
  try {
    const challenge = await Challenge.findOne({ codeId });
    console.log(challenge)
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    executeCppCode(code, compilerFlags, timeout, challenge.testCases, (err, testResults) => {
      
      if (err) {
        return res.status(200).json({ error: err });
      }
      res.json({ testResults });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  runCode,
  runCodeChallenge,
};
