const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/create', UserController.createUser)
router.get('/all', UserController.getAllUsers )
router.get('/find/:uid', UserController.getUser )
router.put('/update/:uid', UserController.updateUser)
router.delete('/delete/:uid', UserController.deleteUser)


module.exports = router;