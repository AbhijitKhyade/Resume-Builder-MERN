const express = require('express');
const { addResumeData, getAllResumeData } = require('../controllers/resume.controller');

const router = express.Router();

router.post('/resume-data', addResumeData);
router.get('/get-all-resume-data', getAllResumeData);

module.exports = router;