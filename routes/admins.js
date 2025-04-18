let express = require('express');
let router = express.Router();
const admin_controller = require('../controller/adminController');

router.post('/create', admin_controller.admin_create_post);

module.exports = router;