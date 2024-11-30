const { OnlineShifts, UserProfessional } = require('../db');
require('dotenv').config();

module.exports = {
  ShiftReservates: async (req, res) => {
    try {
      // Obtener la especialidad del profesional desde los parámetros o el cuerpo de la solicitud
      const { specialty } = req.query;

      if (!specialty) {
        return res.status(400).send({
          success: false,
          message: "Debe proporcionar una especialidad",
        });
      }

      // Buscar todos los turnos filtrados por la especialidad
      const shifts = await OnlineShifts.findAll({
        where: { specialty },
        include: [
          {
            model: UserProfessional,
            attributes: ['name', 'email'], // Ajusta los atributos según lo que necesites incluir
          },
        ],
      });

      if (shifts && shifts.length > 0) {
        console.log(`Turnos encontrados para la especialidad: ${specialty}`);
        res.status(200).send({ success: true, data: shifts });
      } else {
        console.log(`No hay turnos para la especialidad: ${specialty}`);
        res.status(404).send({
          success: false,
          message: `No hay turnos disponibles para la especialidad: ${specialty}`,
        });
      }
    } catch (error) {
      console.error("Error al obtener los turnos:", error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
