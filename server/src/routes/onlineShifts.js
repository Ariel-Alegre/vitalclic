
const { Router  }= require('express');
const router = Router();

const {OnlineShifts} = require('../controllers/OnlineShifts');
const {AllShifts} = require('../controllers/AllShifts');
const {ShiftReservates} = require('../controllers/ShiftReservates');




router.post('/online-shifts', OnlineShifts);
router.get('/all-shifts', AllShifts);
router.get('/shift-reservates', ShiftReservates );






module.exports = router