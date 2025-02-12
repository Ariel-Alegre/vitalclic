const { UserBussines } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

require('dotenv').config();

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

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
  RegisterBussines: async (req, res) => {
    const { 
      reason_social, 
      name, 
      ruc, 
      address, 
      email, 
      country, 
      province, 
      district,
      department, 
      phone, 
      type_of_service,
      contact_person,
      specialty,
      charges,
      termsAccepted, 
      termsAcceptedAt, 
    } = req.body;

    try {
      // Validación de aceptación de términos
      if (!termsAccepted) {
        console.log('Debes aceptar los términos y condiciones para registrarte')
        return res.status(400).json({ message: 'Debes aceptar los términos y condiciones para registrarte' });
      }

      const existingUser = await UserBussines.findOne({ where: { email } });

      if (existingUser) {
        console.log('La empresa ya existe');
        return res.status(404).json({ message: 'La empresa ya existe' });
      }

 

      let role = 'empresa';
      const adminEmails = ['admin1@gmail.com', 'admin2@fmail.com'];
      if (adminEmails.includes(email)) {
        role = 'admin';
      }

      const backgroundColor = getRandomColor();
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
       
 const emailContent = `
    <html>

<body style="background-color: #f4f4f4; padding: 2em 0;">
  <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; border: 1px solid #ddd; border-radius: 10px; font-family: Arial, Helvetica, sans-serif; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <tr>
      <td style=" width: 100%; border-radius: 10px; background-color: #53676c; text-align: center;margin: 0 auto; padding: 1em;">
        <img src="https://www.vitalclic.com/static/media/logo.43cb5a9254f3543cf08c.png" alt="logo" style="display: block; max-width: 150px; margin: 0 auto;">
      </td>
    </tr>
    <tr>
      <td style="padding: 2em; color: #333;">

        <p style="color: black; font-size: 18px; font-weight: bold; text-align: center;">
          ¡Formulario enviado con éxito!
        </p>

        <p style="color: black;">Hola [Nombre del colaborador (profesional/proveedor)],</p>
        
        <p style="color: black;">
          Gracias por registrarte en VITALCLIC. Hemos recibido tu formulario correctamente y estamos procesando tu información. 
          Nos emociona que formes parte de nuestra comunidad de salud digital.
        </p>

      

        <p style="color: black;">
          Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos a través de <a href="mailto:trabajemosjuntos@vitalclic.com">trabajemosjuntos@vitalclic.com</a> 
          o al [número de teléfono].
        </p>
        
        <p style="color: black; text-align: center; font-weight: bold;">
          ¡Tu salud es nuestra prioridad!
        </p>
        
        <p style="color: black; text-align: center;">
          Atentamente, <br>
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
    subject: '¡Formulario enviado con éxito!',
    html: emailContent,
  }); 
      const newUser = await UserBussines.create({
        reason_social,
        name: capitalizedName,
        ruc, 
        address, 
        email,
        phone,
        role,
        type_of_service,
        contact_person,
        charges,
        country,
        department, 
        specialty,
        province,
        district,
        status: "pendiente",
        backgroundColor,
        termsAccepted,
        termsAcceptedAt: termsAcceptedAt || new Date(),
      });

      const tokenPayload = { id: newUser.id, role: newUser.role };
      const token = jwt.sign(tokenPayload);

      console.log('empresa creado correctamente');

      return res.json({ token });
    } catch (error) {
      console.log('Error en el servidor' );

      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
