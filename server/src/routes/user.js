
const { Router  }= require('express');
const router = Router();

const {RegisterUser} = require("../controllers/RegisterUser")
const {AllUsers} = require("../controllers/AllUsers");
const {PutUsers} = require("../controllers/PutUsers");



router.post('/register-user', RegisterUser);
router.get('/all-user', AllUsers);


router.put('/user/:userId', upload.single('image'), PutUsers);






module.exports = router