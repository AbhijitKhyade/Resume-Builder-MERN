const express = require('express');
const { addResumeData, getAllResumeData, generateResume } = require('../controllers/resume.controller');
const verifyUser = require('../utils/verifyUser');

const router = express.Router();

router.post('/resume-data', verifyUser, addResumeData);
router.get('/get-all-resume-data', verifyUser, getAllResumeData);
router.get('/generate-resume', generateResume);

module.exports = router;