const { UserProfessional } = require('../db');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = {
  PutProfessional: async (req, res) => {
    const { professionalId } = req.params;
    const { name, lastName, email, phone, specialty, genre, province, district } = req.body;
    const file = req.file; // Imagen cargada desde un formulario multipart/form-data

    try {
      // Buscar el profesional en la base de datos
      const professional = await UserProfessional.findByPk(professionalId);

      if (!professional) {
        return res
          .status(404)
          .send({ success: false, message: "No se encuentra el profesional de la salud" });
      }

      // Si hay una imagen, subirla a Cloudinary
      let uploadedImage;
      if (file) {
        uploadedImage = await cloudinary.uploader.upload(file.path, {
          folder: 'health_professionals',
          resource_type: 'image',
        });
      }

      // Actualizar la información del profesional
      const updatedProfessional = await professional.update({
        name: name || professional.name,
        lastName: lastName || professional.lastName,
        email: email || professional.email,
        phone: phone || professional.phone,
        specialty: specialty || professional.specialty,
        genre: genre || professional.genre,
        province: province || professional.province,
        district: district || professional.district,
        image: uploadedImage ? uploadedImage.secure_url : professional.image,
      });

      res.status(200).json({
        success: true,
        message: 'Información actualizada exitosamente',
        data: updatedProfessional,
      });
    } catch (error) {
      console.error('Error al actualizar el profesional:', error);
      res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
    }
  },
};
