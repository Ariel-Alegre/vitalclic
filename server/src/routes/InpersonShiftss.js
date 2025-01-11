
const { Router  }= require('express');
const router = Router();

const {InpersonShifts} = require('../controllers/InPersonShifts');
const {AllShiftsInPerson} = require('../controllers/AllShiftsInPerson');
const {ShiftReservates} = require('../controllers/ShiftReservates');
const {UpdateStatusShift} = require('../controllers/UpdateStatusShift');






router.post('/inperson-shifts', InpersonShifts);
router.get('/shiftsinperson/:sedeId', AllShiftsInPerson);
router.get('/shift-reservates', ShiftReservates );
router.put('/online-shifts/:id', UpdateStatusShift);





module.exports = router