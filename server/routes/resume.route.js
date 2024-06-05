const express = require('express');
const { addResumeData } = require('../controllers/resume.controller');

const router = express.Router();

router.post('/resume-data', addResumeData);

module.exports = router;