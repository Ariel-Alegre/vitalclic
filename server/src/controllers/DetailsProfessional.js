const { UserProfessional } = require('../db');
require('dotenv').config();



module.exports = {
    DetailsProfessional: async (req, res) => {
        const {professionalId} = req.params

    try {

      const detailProfessional = await UserProfessional.findByPk(professionalId);

      if (detailProfessional) {
        console.log("Detalles del profesional de la salud")
        res.status(200).send({success: true, data: detailProfessional})
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

