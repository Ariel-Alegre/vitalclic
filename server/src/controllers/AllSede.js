const { UserSede } = require('../db');
require('dotenv').config();



module.exports = {
  AllSede: async (req, res) => {

    try {

      const allSede = await UserSede.findAll();

      if (allSede) {
        console.log("Todas las sede de la salud")
        res.status(200).send({success: true, data: allSede})
      } else {
        console.log("No se encuentran las sede")
        res.status(404).send({success: false, message: "No se encuentran las sedes"})
      }
 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};

