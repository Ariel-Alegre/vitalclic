const jwt = require('jsonwebtoken');
const { OnlineShifts, UserProfessional } = require('../db');

module.exports = {
  ShiftReservates: async (req, res) => {
    const { authorization } = req.headers;

    try {
      // Verificar si se proporciona un token
      if (!authorization) {
        console.log('No se proporcionó un token de autorización');
        return res.status(400).json({ message: 'No se proporcionó un token de autorización' });
      }

      // Verificar y decodificar el token
      const payload = jwt.verify(authorization, process.env.FIRMA_TOKEN);

      // Buscar al usuario profesional basado en el ID del token
      const userProfessional = await UserProfessional.findOne({
        where: { id: payload.id },
      });

      if (!userProfessional) {
        console.log('Usuario profesional no encontrado');
        return res.status(404).json({ message: 'Usuario profesional no encontrado' });
      }

      // Filtrar los turnos por la especialidad del usuario profesional
      const shifts = await OnlineShifts.findAll({
        where: { specialty: userProfessional.specialty },
      });

      if (shifts && shifts.length > 0) {
        console.log(`Turnos encontrados para la especialidad: ${userProfessional.specialty}`);
        return res.status(200).json({ success: true, data: shifts });
      } else {
        console.log(`No hay turnos para la especialidad: ${userProfessional.specialty}`);
        return res.status(404).json({ 
          success: false, 
          message: `No hay turnos disponibles para la especialidad: ${userProfessional.specialty}` 
        });
      }
    } catch (error) {
      console.error('Error al obtener los turnos:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
