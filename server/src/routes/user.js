
const { Router  }= require('express');
const router = Router();

const {RegisterUser} = require("../controllers/RegisterUser")
const {AllUsers} = require("../controllers/AllUsers")


router.post('/register-user', RegisterUser);
router.get('/all-user', AllUsers);








module.exports = router