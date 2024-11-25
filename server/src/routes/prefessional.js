
const { Router  }= require('express');
const router = Router();



const {RegisterProfessional} = require("../controllers/RegisterProfessional")
const {AllProfessional} = require("../controllers/AllProfessional");
const {UpdateProfessional} = require("../controllers/UpdateProfessional");

const {Login} = require("../controllers/Login");
const {DetailsProfessional} = require("../controllers/DetailsProfessional");
const {DataPersonal} = require("../controllers/DataPersonal");



const { PutProfessional } = require('../controllers/PutProfessional');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });



router.put('/professional/:professionalId', upload.single('image'), PutProfessional);

router.post('/register-professional', RegisterProfessional);
router.get('/professional/:professionalId', DetailsProfessional); 
router.post('/login', Login);

router.get('/professionals', AllProfessional); 
router.put('/update-doctor-status/:id', UpdateProfessional);
router.get('/datapersonal', DataPersonal );






















module.exports = router