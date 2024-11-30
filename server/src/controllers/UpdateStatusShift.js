const { OnlineShifts, UserProfessional } = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  UpdateStatusShift: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      // Obtener el token desde los headers
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ message: 'Token de autenticación requerido' });
      }

      // Decodificar el token para obtener el userProfesionalId
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verifica el token usando tu clave secreta

      // Obtener el userProfesionalId del payload decodificado
      const userProfesionalId = decoded.id;  // Asegúrate de que el token contiene este campo

      // Validar el estado proporcionado
      const validStatuses = ['pendiente', 'activo', 'atendido', 'cancelar'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Estado no válido' });
      }

      // Actualizar el estado del turno
      const [updatedCount] = await OnlineShifts.update(
        { status, userProfesionalId },  // También actualizas el userProfesionalId si lo necesitas
        { where: { id } }
      );

      // Verificar si se actualizó algún registro
      if (updatedCount === 0) {
        return res.status(404).json({ message: 'Turno no encontrado' });
      }

      // Obtener el registro actualizado junto con el UserProfessional asociado
      const updatedShift = await OnlineShifts.findOne({
        where: { id },
        include: {
          model: UserProfessional,  // Incluye los datos del UserProfessional relacionado
          as: 'userProfessional',   // Usa el alias si lo configuraste en la relación
          attributes: ['name', 'email'],  // Selecciona los campos de UserProfessional que necesitas
        },
      });

      return res.status(200).json({ success: true, data: updatedShift });
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      return res.status(500).json({ message: 'Error al actualizar el estado' });
    }
  },
};
