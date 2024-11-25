
const { Router  }= require('express');
const router = Router();
const routerProfesional = require("./prefessional");
const routerUser = require("./user");
const routerShift = require("./onlineShifts");






router.use('/api', routerProfesional, routerUser, routerShift  ) 



















module.exports = router