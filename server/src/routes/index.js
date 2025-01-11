
const { Router  }= require('express');
const router = Router();
const routerProfesional = require("./prefessional");
const routerUser = require("./user");
const routerShift = require("./onlineShifts");
const routerSede= require("./sede");
const routerShiftDanger= require("./DangerShit");
const routerInpersonShifts= require("./InpersonShiftss");








router.use('/api', routerProfesional, routerUser, routerShift, routerSede, routerShiftDanger, routerInpersonShifts) 



















module.exports = router