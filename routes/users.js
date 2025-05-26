var express = require('express');
var router = express.Router();
const user_controller = require('../controller/userController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

/* GET users listing. */

router.get('/me', authenticate, user_controller.user_info_get);

router.get('/list', user_controller.user_create_list); // Only admin request list

router.post('/login', user_controller.user_login_post);

router.post('/signup', user_controller.user_create_post);

router.delete('/:id/delete', user_controller.user_delete_post);

router.put('/:id/update', user_controller.user_update_post);

router.post('/logout', user_controller.user_logout);

module.exports = router;