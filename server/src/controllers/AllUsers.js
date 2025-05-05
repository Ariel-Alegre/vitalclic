const { User, OnlineShifts, InPersonShifts } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



module.exports = {
    AllUsers: async (req, res) => {

    try {

      const allUsers = await User.findAll({
        include: [
          {
            model: OnlineShifts
          },
          {
            model: InPersonShifts

          }
        ]
      });

      if (allUsers) {
        console.log("Todos los usuarios")
        res.status(200).send({success: true, data: allUsers})
      } else {
        console.log("No se encuentran los usuarios")
        res.status(404).send({success: false, message: "No se encuentran los usuarios"})
      }
 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};

