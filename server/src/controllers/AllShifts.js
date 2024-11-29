const { OnlineShifts } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



module.exports = {
    AllShifts: async (req, res) => {

    try {

      const shift = await OnlineShifts.findAll();

      if (shift) {
        console.log("Todos los turnos disponibles")
        res.status(200).send({success: true, data: shift})
      } else {
        console.log("No hay turnos")
        res.status(404).send({success: false, message: "No hay turnos"})
      }
 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};

