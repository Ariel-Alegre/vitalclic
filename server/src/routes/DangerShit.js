
const { Router  }= require('express');
const router = Router();

const {DangerShit} = require('../controllers/DangerShit');


router.post('/danger-shifts', DangerShit);








module.exports = router