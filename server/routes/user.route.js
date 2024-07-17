const express = require('express');
const { generateResume, updateUser, getUser, feedbacks } = require('../controllers/user.controller');
const verifyUser = require('../utils/verifyUser');

const router = express.Router();

router.post('/generate-resume', verifyUser, generateResume);
router.put('/update/:id', verifyUser, updateUser);
router.get('/get-user/:id', verifyUser, getUser);
router.post('/feedback', verifyUser, feedbacks);

module.exports = router;