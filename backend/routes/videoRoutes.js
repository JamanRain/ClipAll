const express = require('express');
const router = express.Router();
const { downloadVideo } = require('../controllers/videoController');

router.post('/download', downloadVideo);

module.exports = router;
