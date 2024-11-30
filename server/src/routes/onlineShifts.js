
const { Router  }= require('express');
const router = Router();

const {OnlineShifts} = require('../controllers/OnlineShifts');
const {AllShifts} = require('../controllers/AllShifts');
const {ShiftReservates} = require('../controllers/ShiftReservates');
const {UpdateSatusShift} = require('../controllers/UpdateSatusShift');





router.post('/online-shifts', OnlineShifts);
router.get('/all-shifts', AllShifts);
router.get('/shift-reservates', ShiftReservates );
router.put('/online-shifts/:id', UpdateSatusShift);





module.exports = router