const { UserSede } = require('../db');
require('dotenv').config();



module.exports = {
    DetailsSede: async (req, res) => {
        const {sedeId} = req.params

    try {

      const detailSede = await UserSede.findByPk(sedeId);

      if (detailSede) {
        console.log("Detalles de la sede")
        res.status(200).send({success: true, data: detailSede})
      } else {
        console.log("No se encuentran sede")
        res.status(404).send({success: false, message: "No se encuentran profesionales de la salud"})
      }
 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};

