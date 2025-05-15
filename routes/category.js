const express = require('express');
const router = express.Router();
const category_controller = require('../controller/categoryController');

router.get('/list', category_controller.category_list);


router.post('/create', category_controller.category_create);


module.exports = router;