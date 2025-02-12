const { UserBussines } = require('../db');
require('dotenv').config();



module.exports = {
  AllEmpresa: async (req, res) => {

    try {

      const allBussines = await UserBussines.findAll();

      if (allBussines) {
        console.log("Todas las empresa ")
        res.status(200).send({success: true, data: allBussines})
      } else {
        console.log("No se encuentran las empresa")
        res.status(404).send({success: false, message: "No se encuentran las empresa"})
      }
 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};

