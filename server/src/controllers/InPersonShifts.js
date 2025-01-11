const { InPersonShifts } = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  InpersonShifts: async (req, res) => {
    try {
      // Obtener los datos del cuerpo de la solicitud
      const {
        shifts,
        name,
        lastName,
        email,
        phone,
        age,
        document_number,
        reason_for_shift,
        date,
        time,
        specialty,
        sedeId,  // Este campo ahora puede ser opcional
      } = req.body;

      // Si no se proporciona el `userProfesionalId`, se establece como `null`
      const userSede = sedeId || null;

      // Crear el nuevo registro en la base de datos
      const newShift = await InPersonShifts.create({
        shifts,
        name,
        lastName,
        email,
        phone,
        age,
        document_number,
        reason_for_shift,
        date,
        time,
        specialty,
        status: 'pendiente',
        sedeId: userSede,  // Asigna `null` si no se proporciona
      });

      console.log("Turno reservado con éxito");
      return res.status(200).json({
        message: 'Formulario enviado con éxito',
        data: newShift,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  }
}

