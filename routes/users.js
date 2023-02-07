const express = require('express');
const UsersController = require('../controller/users');

const router = express.Router();

router.post('/', UsersController.createUser);
router.get('/', UsersController.getUsers);
router.get('/:id', UsersController.getUser);
router.put('/:id', UsersController.updateUser);
router.delete('/:id', UsersController.deleteUser);

module.exports = router;
