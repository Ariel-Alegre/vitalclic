const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserProfessional, User, UserSede } = require('../db');
require('dotenv').config();

module.exports = {
  Login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Buscar en los tres modelos
      let user = await UserProfessional.findOne({
        where: { email },
        attributes: ['id', 'name', 'lastName', 'email', 'password', 'phone', 'status', 'role'],
      });

      if (!user) {
        user = await User.findOne({
          where: { email },
          attributes: ['id', 'name', 'lastName', 'email', 'password', 'phone', 'status', 'role'],
        });

        if (!user) {
          user = await UserSede.findOne({
            where: { email },
            attributes: ['id', 'name', 'lastName', 'email', 'password', 'phone', 'status', 'role'],
          });

          if (!user) {
            console.log('Usuario no encontrado en ninguno de los modelos');
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }
        }
      }

      // Verificar estado
      if (user.status === 'pendiente') {
        console.log('El usuario está en pendiente');
        return res.status(403).send({ success: false, message: 'El usuario está en pendiente' });
      }

      // Validar contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Contraseña incorrecta');
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }

      // Crear payload para el token
      const tokenPayload = {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      };

      // Generar el token
      const token = jwt.sign(tokenPayload, process.env.FIRMA_TOKEN);

      console.log('Inicio de sesión exitoso');
      return res.json({ token, role: user.role, userId: user.id, status: user.status });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
