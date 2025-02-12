
const { Router  }= require('express');
const cors = require('cors'); // Importar cors
const router = Router();
const routerProfesional = require("./prefessional");
const routerUser = require("./user");
const routerShift = require("./onlineShifts");
const routerSede= require("./sede");
const routerShiftDanger= require("./DangerShit");
const routerInpersonShifts= require("./InpersonShiftss");
const routerBussiness= require("./bussines");




router.use(cors());







router.use('/api', routerProfesional, routerUser, routerShift, routerSede, routerShiftDanger, routerInpersonShifts,routerBussiness) 



















module.exports = router