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
  /*     const emailContent = `
      <html>
     <body    style="
     background-color: #f3f3f3;
     display: grid;
     justify-content: center;
     max-width: 100%;
   ">
       <div     style="
       background-color: #fff;
       border: 8px solid #8ca7a6;
       padding: 2em;
       width: 600px;
       max-width: 100%;
       margin: 0 auto;
       font-family: Arial, Helvetica, sans-serif;
     " >
         <div style="margin: 0 auto; text-align: center; padding: 20px";  background-color: #8ca7a6;>
           <img src="https://vitalclic.com/static/media/logo.43cb5a9254f3543cf08c.png" alt="Logo de la empresa" style="display: block; max-width: 150px; margin: 0 auto;">
         </div>
   
         <p style="color: black;">¡Hola ${name} ${lastName} !</p>
         <p style="color: black;">¡Bienvenido a Vitalclic! Nos complace que te hayas registrado y formes parte de nuestra comunidad.</p>
         <p style="color: black;">Aquí tienes algunos detalles importantes:</p>
         <p style="color: black;"> <strong>Tu cuenta ha sido creada exitosamente.</strong> </p>
         <p style="color: black;">Para comenzar, solo necesitas Iniciar sesión:</p>
         
         <a href= "https://vitalclic.com/iniciar-sesión" >https://vitalclic.com/iniciar-sesión</a>
         <p style="color: black;">Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
   
         <p style="color: black;">Gracias por unirte a nosotros. ¡Esperamos que disfrutes de nuestra plataforma!</p>
         <p style="color: black;">Saludos cordiales,</p>
         <p style="color: black;">El equipo de Vitalclic</p>
   
         
         
   
      
       </div>
     </body>
   </html>
  `;
await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: '¡Bienvenido a nuestra plataforma!',
    html: emailContent,
  }); */
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
