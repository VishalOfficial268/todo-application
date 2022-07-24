const router = require('express').Router();
const userController = require('../controller/user');


//save the users data as signup:
router.post('/register', userController.signup);

//check the user credentials as login:
router.post('/login', userController.login);


//exporting the router:
module.exports = router;