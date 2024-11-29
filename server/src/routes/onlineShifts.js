
const { Router  }= require('express');
const router = Router();

const {OnlineShifts} = require('../controllers/OnlineShifts');
const {AllShifts} = require('../controllers/AllShifts');



router.post('/online-shifts', OnlineShifts);
router.get('/all-shifts', AllShifts);







module.exports = router