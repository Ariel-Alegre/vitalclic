  const { UserProfessional } = require('../db');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  require('dotenv').config();

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  module.exports = {
    RegisterProfessional: async (req, res) => {
      const { name, lastName,dni, professional_college,emergencyServices, registration_number, specialty_number_rne, genre, birthdate, email, country, province, district, specialty, phone, password, termsAccepted, termsAcceptedAt } = req.body;

      try {
        // Validación de aceptación de términos
        if (!termsAccepted) {
          return res.status(400).json({ message: 'Debes aceptar los términos y condiciones para registrarte' });
        }

        const existingUser = await UserProfessional.findOne({ where: { email } });

        if (existingUser) {
          console.log('El usuario ya existe');
          return res.status(404).json({ message: 'El usuario ya existe' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let role = 'profesional';
        const adminEmails = ['admin1@gmail.com', 'admin2@fmail.com'];
        if (adminEmails.includes(email)) {
          role = 'admin';
        }

        const backgroundColor = getRandomColor();
        const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
        const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

        const newUser = await UserProfessional.create({
          name: capitalizedName,
          lastName: capitalizedLastName,
          email,
          password: hashedPassword,
          phone,
          dni,
          professional_college,
          registration_number,
          specialty_number_rne,
          genre,
          birthdate,
          specialty,
          country,
          emergencyServices,
          province,
          district,
          status: "pendiente",
          backgroundColor,
          termsAccepted,
          termsAcceptedAt: termsAcceptedAt || new Date() // Usa la fecha actual si no está especificada
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

