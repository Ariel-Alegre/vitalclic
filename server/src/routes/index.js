
const { Router  }= require('express');
const router = Router();
const routerProfesional = require("./prefessional")




router.use('/api', routerProfesional ) 



















module.exports = router