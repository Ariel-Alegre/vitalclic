import React, { useState } from 'react';
import styles from '../styles/Home/AditionalForm.module.css'; // Asegúrate de importar tus estilos

const WhatsAppForm = () => {
  // Estado único para los datos del formulario
  const [formData, setFormData] = useState({
    lastName: '',
    age: '',
    gender: '',
    phone: '',
    reason: ''
  });

  // Manejar el cambio en los campos de entrada
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,  // Conservar los valores anteriores
      [name]: value  // Actualizar el valor del campo correspondiente
    });
  };

  // Función para enviar el mensaje por WhatsApp
  const handleSubmit = (event) => {
    event.preventDefault();

    // Generar el mensaje que se enviará por WhatsApp
    const message = `
      *Datos del paciente:*
      *Apellidos y Nombres:* ${formData.lastName}
      *Edad:* ${formData.age}
      *Género:* ${formData.gender}
      *Teléfono:* ${formData.phone}
      *Motivo de la consulta:* ${formData.reason}
    `;

    // Número de teléfono al que deseas enviar el mensaje (en formato internacional)
    const phoneNumber = '+541161361408'; // Cambia este número por el número destino

    // URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
  };

  return (
    <div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
      <h2 className={styles.title}>Datos del paciente</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Apellidos y Nombres</label>
        <input
          type="text"
          name="lastName"
          className={styles.input}
          placeholder="Ingrese sus nombres"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label className={styles.label}>Edad</label>
        <input
          type="number"
          name="age"
          className={styles.input}
          placeholder="Ingrese su edad"
          value={formData.age}
          onChange={handleChange}
        />

        <label className={styles.label}>Género</label>
        <select
          name="gender"
          className={styles.input}
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Seleccionar género</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>

        <label className={styles.label}>Teléfono</label>
        <input
          type="tel"
          name="phone"
          className={styles.input}
          placeholder="Ingrese su teléfono"
          value={formData.phone}
          onChange={handleChange}
        />

        <label className={styles.label}>Motivo de la consulta</label>
        <textarea
          name="reason"
          className={styles.input}
          placeholder="Especifique el motivo de la consulta"
          rows="4"
          value={formData.reason}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className={styles.button}>Solicitar atención</button>
      </form>
    </div>
  );
};

export default WhatsAppForm;
