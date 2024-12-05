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
client.on('ready', () => {
  console.log('Cliente de WhatsApp listo para enviar mensajes');
});

// Maneja errores de autenticación
client.on('auth_failure', (msg) => {
  console.error('Error de autenticación:', msg);
});

// Inicializa el cliente
client.initialize();

// Exporta la funcionalidad para enviar mensajes
module.exports = {
  DangerShit: async (req, res) => {
    try {
      // Número fijo al que se enviará el mensaje (en formato internacional)
      const numeroFijo = '5491123456789'; // Reemplaza con el número deseado
      const chatId = `${numeroFijo}@c.us`; // Formato de WhatsApp Web

      // Datos que se recibirán en la solicitud
      const { nombre, apellido, email, telefono } = req.body;

      // Valida que los datos necesarios estén presentes
      if (!nombre || !apellido || !email || !telefono) {
        return res.status(400).json({
          message: 'Nombre, apellido, email y teléfono son requeridos',
        });
      }

      // Construye el mensaje a enviar
      const mensaje = `Hola, tienes un nuevo contacto:
- Nombre: ${nombre} ${apellido}
- Email: ${email}
- Teléfono: ${telefono}`;

      // Envía el mensaje a WhatsApp
      await client.sendMessage(chatId, mensaje);
      console.log(`Mensaje enviado a ${numeroFijo}`);
      res.status(200).json({ message: 'Mensaje enviado correctamente' });
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      res.status(500).json({ message: 'Error al enviar el mensaje', error });
    }
  },
};
