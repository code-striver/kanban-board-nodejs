const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')

//to home cotroller
router.get('/', homeController.home);
router.use('/users', require('./users'))

//to user controller


module.exports = router;
