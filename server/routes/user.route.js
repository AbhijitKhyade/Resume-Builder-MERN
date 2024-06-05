const express = require('express');
const { generateResume } = require('../controllers/user.controller');

const router = express.Router();

router.post('/generate-resume', generateResume);

module.exports = router;