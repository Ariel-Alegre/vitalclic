const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inicializa el cliente con autenticación local
const client = new Client({
  authStrategy: new LocalAuth(),
});

// Genera el QR para iniciar sesión en WhatsApp
client.on('qr', (qr) => {
  console.log('Escanea este QR con tu WhatsApp:');
  qrcode.generate(qr, { small: true });
});

// Confirma que el cliente está listo
client.on('ready', async () => {
  console.log('Cliente de WhatsApp listo para enviar mensajes');

  // Lista los grupos disponibles en la cuenta
  const chats = await client.getChats();
  const grupos = chats.filter(chat => chat.isGroup);

  console.log('Grupos disponibles:');
  grupos.forEach(grupo => {
    console.log(`Nombre: ${grupo.name}, ID: ${grupo.id._serialized}`);
  });
});

// Maneja errores de autenticación
client.on('auth_failure', (msg) => {
  console.error('Error de autenticación:', msg);
});

// Inicializa el cliente
client.initialize();

// Controlador para manejar la solicitud de envío de mensajes
module.exports = {
  DangerShit: async (req, res) => {
    try {
      // **ID del grupo al que se enviará el mensaje**
      const groupId = '123456789@g.us'; // Reemplázalo con el ID de tu grupo

      // **Datos enviados desde el formulario**
      const { nombre, apellido, email, telefono } = req.body;

      // Valida que los datos estén completos
      if (!nombre || !apellido || !email || !telefono) {
        return res.status(400).json({
          message: 'Todos los campos son obligatorios',
        });
      }

      // Construye el mensaje a enviar
      const mensaje = `Nuevo formulario enviado:
      - Nombre: ${nombre} ${apellido}
      - Email: ${email}
      - Teléfono: ${telefono}`;

      // Envía el mensaje al grupo
      await client.sendMessage(groupId, mensaje);
      console.log(`Mensaje enviado al grupo: ${groupId}`);

      res.status(200).json({ message: 'Mensaje enviado correctamente al grupo' });
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      res.status(500).json({ message: 'Error al enviar el mensaje', error });
    }
  },
};
