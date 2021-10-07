
const express = require('express');

const userController = require('../controllers/user')



const router = express.Router();
router.get( '/signin', userController.userSignIn );
router.get( '/register', userController.userRegister );



module.exports = router;
