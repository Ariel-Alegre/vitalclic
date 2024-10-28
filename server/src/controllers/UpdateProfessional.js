// controllers/YourControllerFile.js
const { UserProfessional } = require('../db');
const { io } = require('../app'); // Asegúrate de que esta importación sea correcta

module.exports = {
    UpdateProfessional: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        try {
            if (!['pendiente', 'activo'].includes(status)) {
                return res.status(400).json({ message: 'Estado no válido' });
            }

            const updatedDoctor = await UserProfessional.update(
                { status },
                { 
                    where: { id },
                    returning: true
                }
            );

            if (updatedDoctor[0] === 0) {
                return res.status(404).json({ message: 'Médico no encontrado' });
            }

            // Emitir el evento a todos los clientes conectados
            io.emit('doctorStatusUpdated', updatedDoctor[1][0]);

            return res.status(200).json(updatedDoctor[1][0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al actualizar el estado' });
        }
    },
};
