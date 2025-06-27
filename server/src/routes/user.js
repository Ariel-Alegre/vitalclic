
const { Router  }= require('express');
const router = Router();
const https = require('https');

const {RegisterUser} = require("../controllers/RegisterUser")
const {AllUsers} = require("../controllers/AllUsers");
const {PutUsers} = require("../controllers/PutUsers");

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.put('/user/:userId', upload.single('image'), PutUsers);
router.post('/register-user', RegisterUser);
router.get('/all-user', AllUsers);

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