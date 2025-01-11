const jwt = require('jsonwebtoken');
const { UserProfessional, User, OnlineShifts, UserSede,InPersonShifts } = require('../db');

module.exports = {
  DataPersonal: async (req, res) => {
    const { authorization } = req.headers;

    try {
      // Verificar si se proporciona un token
      if (!authorization) {
        console.log('No se proporcionó un token de autorización');
        return res.status(400).json({ message: 'No se proporcionó un token de autorización' });
      }

      // Verificar y decodificar el token
      const payload = jwt.verify(authorization, process.env.FIRMA_TOKEN);

      // Buscar al usuario en UserProfessional
      let user = await UserProfessional.findOne({
        where: { id: payload.id },
        include:{
          model: OnlineShifts,  // Incluye los datos del UserProfessional relacionado
        },
      });

      // Si no está en UserProfessional, buscar en User
      if (!user) {
        user = await User.findOne({
          where: { id: payload.id },
        });

        // Si no está en User, buscar en UserSede
        if (!user) {
          user = await UserSede.findOne({
            where: { id: payload.id }, include: {
                model: InPersonShifts,  // Incluye los datos del UserProfessional relacionado
      
            }
          });

          if (!user) {
            console.log('Usuario no encontrado en ninguno de los modelos');
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }
        }
      }

      // Enviar los datos del usuario encontrado
      console.log('Usuario encontrado');
      return res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
