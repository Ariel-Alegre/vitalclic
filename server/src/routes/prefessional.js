
const { Router  }= require('express');
const router = Router();
const https = require('https');



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




router.post('/token', async (req, res) => {

    const { body, headers: { transactionid } } = req;
    const options = {
        host: 'sandbox-api-pw.izipay.pe',
        port: 443,
        path: '/security/v1/Token/Generate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'transactionId': transactionid,
        },
        body: body,
    };

    const request = https.request(options, callback => {
        callback.on('data', data => {
            res.send(JSON.parse(data));
        });
    });

    request.on('error', error => {
        console.error(error);
    });

    if (req.body) request.write(JSON.stringify(req.body));
    request.end();

});

















module.exports = router