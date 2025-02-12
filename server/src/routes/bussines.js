
const { Router  }= require('express');
const router = Router();

const {AllEmpresa} = require('../controllers/AllEmpresa');
const {PutSede} = require('../controllers/PutSede');
const {RegisterBussines} = require('../controllers/RegisterBussines');
const {UpdateSede} = require('../controllers/UpdateSede');
const {DetailsSede} = require('../controllers/DetailsSede');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });




router.get('/all-bussines', AllEmpresa);
router.put('/update-bussines/:bussinesId', upload.single('image'), PutSede);
router.post('/register-bussines', RegisterBussines );
router.put('/update-bussines-status/:id',  UpdateSede);
router.get('/bussines/:bussinesId',  DetailsSede);





module.exports = router