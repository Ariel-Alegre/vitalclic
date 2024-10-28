const { UserProfessional } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



module.exports = {
  AllProfessional: async (req, res) => {

    try {

      const allProfessional = await UserProfessional.findAll();

      if (allProfessional) {
        console.log("Todos los profesionales de la salud")
        res.status(200).send({success: true, data: allProfessional})
      } else {
        console.log("No se encuentran profesionales de la salud")
        res.status(404).send({success: false, message: "No se encuentran profesionales de la salud"})
      }
 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};

