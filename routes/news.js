let express = require('express');
let router = express.Router();
const news_controller = require('../controller/newsController');
const upload = require('../config/multer');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

router.get('/list', news_controller.news_create_list);

router.post('/create', upload.single('file'), news_controller.news_create_post);

router.get('/:id', news_controller.news_content);

module.exports = router;
