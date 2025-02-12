const { UserSede } = require('../db');
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
  RegisterSede: async (req, res) => {
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
      password, 
      termsAccepted, 
      termsAcceptedAt, 
    } = req.body;

    try {
      // Validación de aceptación de términos
      if (!termsAccepted) {
        return res.status(400).json({ message: 'Debes aceptar los términos y condiciones para registrarte' });
      }

      const existingUser = await UserSede.findOne({ where: { email } });

      if (existingUser) {
        console.log('La sede ya existe');
        return res.status(404).json({ message: 'La sede ya existe' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      let role = 'sede';
      const adminEmails = ['admin1@gmail.com', 'admin2@fmail.com'];
      if (adminEmails.includes(email)) {
        role = 'admin';
      }

      const backgroundColor = getRandomColor();
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
       
/*    const emailContent = `
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

          <p style="color: black;">Hola ${name},
        </p>
          <p style="color: black;">Gracias por registrarte en VITALCLIC. Estamos emocionados y agradecidos por depositar tu confianza en nosotros. A partir de ahora eres parte de nuestra familia VITALCLIC, ayudando a miles de personas quienes forman parte de nuestra comunidad de salud digital.

        </p>

          <p style="color: black;">Ahora puedes acceder a nuestra plataforma y seleccionar todos los servicios que desees brindar como profesional o como empresa. Como profesional tendrás la facilidad de coordinar horarios, fechas y confirmación de citas médicas. Como empresa, podrás seleccionar de la lista de servicios que requerimos, aquellos que desees ofrecernos, adjuntando además, información adicional para ayudarnos a elegir la mejor opción tanto para tu empresa como para nuestra comunidad.

        </p>
          <p style="color: black;">Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos a través de [trabajemosjuntos@vitalclic.com] o [número de teléfono].
        </p>
          
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
    subject: '¡Bienvenido a nuestra plataforma!',
    html: emailContent,
  }); 
 */
      const newUser = await UserSede.create({
        reason_social,
        name: capitalizedName,
        ruc, 
        address, 
        email,
        password: hashedPassword,
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
      const token = jwt.sign(tokenPayload, process.env.FIRMA_TOKEN);

      console.log('sede creado correctamente');

      return res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
