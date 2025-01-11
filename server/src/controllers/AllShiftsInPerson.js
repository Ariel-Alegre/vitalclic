const { InPersonShifts } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  AllShiftsInPerson: async (req, res) => {
    try {
      const { sedeId } = req.params; // Obtiene el 'sedeId' desde los parámetros de la URL
      
      // Verifica si 'sedeId' fue proporcionado
      if (!sedeId) {
        return res.status(400).json({ success: false, message: 'El parámetro sedeId es requerido' });
      }

      // Busca los turnos que tengan el 'sedeId' proporcionado
      const shifts = await InPersonShifts.findAll({ where: { sedeId } });

      // Verifica si hay turnos encontrados
      if (shifts.length > 0) {
        console.log("Turnos encontrados");
        res.status(200).json({ success: true, data: shifts });
      } else {
        console.log("No hay turnos para el sedeId proporcionado");
        res.status(404).json({ success: false, message: "No hay turnos para el sedeId proporcionado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  },
};
