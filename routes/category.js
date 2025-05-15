const express = require('express');
const router = express.Router();
const category_controller = require('../controller/catogoryController');

router.post('/create', category_controller.category_create);

router.get('/list');

module.exports = router;