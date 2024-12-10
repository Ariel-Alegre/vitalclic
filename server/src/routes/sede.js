
const { Router  }= require('express');
const router = Router();

const {AllSede} = require('../controllers/AllSede');
const {PutSede} = require('../controllers/PutSede');
const {RegisterSede} = require('../controllers/RegisterSede');
const {UpdateSede} = require('../controllers/UpdateSede');
const {DetailsSede} = require('../controllers/DetailsSede');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });





router.get('/all-sede', AllSede);
router.put('/update-sede/:sedeId', upload.single('image'), PutSede);
router.post('/register-sede', RegisterSede );
router.put('/update-sede-status/:id',  UpdateSede);
router.get('/sede/:sedeid',  DetailsSede);






module.exports = router