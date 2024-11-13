
const { Router  }= require('express');
const router = Router();

const {RegisterProfessional} = require("../controllers/RegisterProfessional")
const {AllProfessional} = require("../controllers/AllProfessional");
const {UpdateProfessional} = require("../controllers/UpdateProfessional");
const {Login} = require("../controllers/Login");





router.post('/register-professional', RegisterProfessional);
router.post('/login', Login);

router.get('/professionals', AllProfessional); 
router.put('/update-doctor-status/:id', UpdateProfessional); 





















module.exports = router