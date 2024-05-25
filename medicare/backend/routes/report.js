const express = require('express');
const router = express.Router();

const controller = require('../controller/report_controller');
router.post('/create', controller.create);
router.post('/upload', controller.uploadFile);

module.exports = router;