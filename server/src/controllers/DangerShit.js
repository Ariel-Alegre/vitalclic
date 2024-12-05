const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inicializa el cliente con autenticación local y configuración de puppeteer
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // Asegúrate de que Puppeteer funcione sin problemas en entornos restrictivos
  }
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

// Asegúrate de que el cliente esté listo antes de enviar el mensaje
module.exports = {
  DangerShit: async (req, res) => {
    try {
      // Espera hasta que el cliente esté completamente listo
      if (!client.ready) {
        return res.status(500).json({
          message: 'El cliente de WhatsApp aún no está listo',
        });
      }

      // Configura el número fijo al que siempre se enviará el mensaje
      const numeroFijo = '54116136148'; // Tu número en formato internacional
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

      // Envía el mensaje a tu WhatsApp
      await client.sendMessage(chatId, mensaje);
      console.log(`Mensaje enviado a ${numeroFijo}`);
      res.status(200).json({ message: 'Mensaje enviado correctamente' });
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      res.status(500).json({ message: 'Error al enviar el mensaje', error });
    }
  },
};
