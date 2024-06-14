const express = require('express');
const { generateResume, updateUser, getUser, feedbacks } = require('../controllers/user.controller');

const router = express.Router();

router.post('/generate-resume', generateResume);
router.put('/update/:id', updateUser);
router.get('/get-user/:id', getUser);
router.post('/feedback', feedbacks);

module.exports = router;