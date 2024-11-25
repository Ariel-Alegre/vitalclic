
const { Router  }= require('express');
const router = Router();

const {OnlineShifts} = require('../controllers/OnlineShifts');


router.post('/online-shifts', OnlineShifts);







module.exports = router