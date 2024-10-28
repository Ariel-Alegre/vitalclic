
const { Router  }= require('express');
const router = Router();

const {RegisterProfessional} = require("../controllers/RegisterProfessional")
const {AllProfessional} = require("../controllers/AllProfessional");
const {UpdateProfessional} = require("../controllers/UpdateProfessional");




router.post('/register-doctor', RegisterProfessional);
router.get('/doctors', AllProfessional); 
router.put('/update-doctor-status/:id', UpdateProfessional); 





















module.exports = router