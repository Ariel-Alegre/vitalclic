
const { Router  }= require('express');
const router = Router();

const {RegisterUser} = require("../controllers/RegisterUser")
const {AllUsers} = require("../controllers/AllUsers");
const {PutUsers} = require("../controllers/PutUsers");

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.put('/user/:userId', upload.single('image'), PutUsers);
router.post('/register-user', RegisterUser);
router.get('/all-user', AllUsers);








module.exports = router