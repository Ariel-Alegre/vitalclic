// controllers/YourControllerFile.js
const { UserSede } = require('../db');

module.exports = {
    UpdateSede: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        try {
            if (!['pendiente', 'activo'].includes(status)) {
                return res.status(400).json({ message: 'Estado no válido' });
            }

            const [updatedCount, updatedRows] = await UserSede.update(
                { status },
                { 
                    where: { id },
                    returning: true  // Este campo depende de tu base de datos; por ejemplo, PostgreSQL lo soporta.
                }
            );

            if (updatedCount === 0) {
                return res.status(404).json({ message: 'Sede no encontrado' });
            }

            return res.status(200).json(updatedRows[0]);  // Devuelve el profesional actualizado.
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al actualizar el estado' });
        }
    },
};
