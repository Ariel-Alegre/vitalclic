const { OnlineShifts } = require('../db');

module.exports = {
    UpdateSatusShift: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      // Validar el estado proporcionado
      const validStatuses = ['pendiente', 'activo', 'atendido', 'cancelar'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Estado no válido' });
      }

      // Actualizar el estado
      const [updatedCount] = await OnlineShifts.update(
        { status },
        {
          where: { id },
        }
      );

      // Verificar si se actualizó algún registro
      if (updatedCount === 0) {
        return res.status(404).json({ message: 'Turno no encontrado' });
      }

      // Obtener el registro actualizado (si returning no está soportado)
      const updatedShift = await OnlineShifts.findOne({ where: { id } });

      return res.status(200).json({ success: true, data: updatedShift });
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      return res.status(500).json({ message: 'Error al actualizar el estado' });
    }
  },
};
