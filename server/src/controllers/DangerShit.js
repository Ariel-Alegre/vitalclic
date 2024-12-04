const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth(), // Guarda la sesión automáticamente
});

// Genera el QR para iniciar sesión en WhatsApp Web
client.on('qr', (qr) => {
  console.log('Escanea este QR con tu WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Cliente de WhatsApp listo para enviar mensajes');
});

// Inicializa el cliente de WhatsApp
client.initialize();

module.exports = {
    DangerShit: async (req, res) => {
      try {
        // Verifica si el cliente está listo
        if (!client.info || !client.info.wid) {
          return res.status(503).json({ message: 'El cliente de WhatsApp no está conectado' });
        }
  
        // Número fijo al que siempre se enviará el mensaje
        const numeroFijo = '5491123456789'; // Reemplaza con tu número en formato internacional
        const chatId = `${numeroFijo}@c.us`; // El formato requerido por WhatsApp Web
  
        // Extrae los datos del cuerpo de la solicitud
        const { nombre, apellido, email, telefono } = req.body;
  
        // Valida los datos
        if (!nombre || !apellido || !email || !telefono) {
          return res.status(400).json({
            message: 'Nombre, apellido, email y teléfono son requeridos',
          });
        }
  
        // Construye el mensaje
        const mensaje = `Hola, tienes un nuevo contacto:
  - Nombre: ${nombre} ${apellido}
  - Email: ${email}
  - Teléfono: ${telefono}`;
  
        // Envía el mensaje
        await client.sendMessage(chatId, mensaje);
        res.status(200).json({ message: 'Mensaje enviado correctamente' });
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        res.status(500).json({ message: 'Error al enviar el mensaje', error });
      }
    },
  };