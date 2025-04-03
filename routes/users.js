var express = require('express');
var router = express.Router();
const user_controller = require('../controller/userController');

/* GET users listing. */
router.get('/', user_controller.user_create_list); // Only admin request list

router.post('/', user_controller.user_create_post); // Only admin

router.delete('/:id/delete', user_controller.user_delete_post);

router.put('/:id/update', user_controller.user_update_post);

module.exports = router;