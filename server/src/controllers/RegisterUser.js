const { User } = require('../db');
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
  RegisterUser: async (req, res) => {
    const { 
      name, 
      lastName, 
      genre, 
      birthdate, 
      email, 
      country, 
      province, 
      district, 
      department,
      dni,
      address,
      phone, 
      password, 
      termsAccepted, 
      termsAcceptedAt, 
      dependents // Añadido dependents
    } = req.body;

    try {
      // Validación de aceptación de términos
      if (!termsAccepted) {
        return res.status(400).json({ message: 'Debes aceptar los términos y condiciones para registrarte' });
      }

      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        console.log('El usuario ya existe');
        return res.status(404).json({ message: 'El usuario ya existe' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      let role = 'personal';
      const adminEmails = ['admin1@gmail.com', 'admin2@fmail.com'];
      if (adminEmails.includes(email)) {
        role = 'admin';
      }

      const backgroundColor = getRandomColor();
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
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

          <p style="color: black;">¡Hola ${name} ${capitalizedLastName},
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
    subject: '¡Bienvenido/a a VITALCLIC!',
    html: emailContent,
  });  
  const validatedDependents = Array.isArray(dependents) ? dependents : [];

      const newUser = await User.create({
        name: capitalizedName,
        lastName: capitalizedLastName,
        email,
        password: hashedPassword,
        phone,
        role,
        genre,
        birthdate,
        country,
        province,
        department,
        dni,
        address,
        district,
        status: "activo",
        backgroundColor,
        termsAccepted,
        termsAcceptedAt: termsAcceptedAt || new Date(),
        dependents: validatedDependents || [], // Si no se envían dependents, se guarda como un array vacío
      });

      const tokenPayload = { id: newUser.id, role: newUser.role };
      const token = jwt.sign(tokenPayload, process.env.FIRMA_TOKEN);

      console.log('Usuario creado correctamente');

      return res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
