const { OnlineShifts } = require('../db');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

require('dotenv').config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
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
        userProfesionalId,  // Este campo ahora puede ser opcional
      } = req.body;

      // Si no se proporciona el `userProfesionalId`, se establece como `null`
      const userProfesional = userProfesionalId || null;
   const emailContent = `
      <html>
 
 <body style="background-color: #f4f4f4; padding: 2em 0;">
   <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; border: 1px solid #ddd; border-radius: 10px; font-family: Arial, Helvetica, sans-serif; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
     <tr>
       <td style=" width: 100%; border-radius: 10px; background-color: #53676c; text-align: center;margin: 0 auto;  padding: 1em;">
         <img src="https://www.vitalclic.com/static/media/logo.43cb5a9254f3543cf08c.png" alt="logo" style="display: block; max-width: 150px; margin: 0 auto;">
       </td>
     </tr>
     <tr>
       <td style="padding: 2em; color: #333;">
 
           <p style="color: black;">¡Hola ${name},
         </p>
           <p style="color: black;">Gracias por registrarte en VITALCLIC. Estamos emocionados de tenerte como parte de nuestra comunidad de salud digital.
         </p>
 
           <p style="color: black;">Ahora puedes acceder a todos nuestros servicios, como agendar citas médicas, consultar con especialistas y recibir atención personalizada desde la comodidad de tu hogar.
         </p>
           <p style="color: black;">Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos a través de [ayudausuario@vitalclic.com] o [número de teléfono].</p>
           
           <p style="color: black;">¡Tu salud es nuestra prioridad!
         </p>
         <p style="color: black;">Atentamente,
             El equipo de VITALCLIC
             
         </p>
       </td>
     </tr>
   </table>
 </body>
 </html>
   `;

   await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: 'Confirmación de tu cita médica en VITALCLIC',
    html: emailContent,
  }); 
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
        status: 'pendiente',
        userProfesionalId: userProfesional,  // Asigna `null` si no se proporciona
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

