let express = require('express');
let router = express.Router();
const news_controller = require('../controller/newsController');

router.get('/list', news_controller.news_create_list);

router.post('/create', news_controller.news_create_post);

module.exports = router;