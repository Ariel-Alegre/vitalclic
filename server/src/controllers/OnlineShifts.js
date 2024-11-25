const { OnlineShifts } = require('../db');
require('dotenv').config();

module.exports = {
  OnlineShifts: async (req, res) => {
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
      } = req.body;

      if (!name || !lastName || !email || !phone || !date || !time || !specialty) {
       
       console.log('Por favor complete todos los campos obligatorios')
        return res.status(400).json({ message: 'Por favor complete todos los campos obligatorios' });
    
    
      }
      

      // Crear el nuevo registro en la base de datos
      const newShift = await OnlineShifts.create({
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
      });

      console.log("Turno reservado con éxito")
      // Responder con éxito
      return res.status(200).json({
        message: 'Formulario enviado con éxito',
        data: newShift,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
