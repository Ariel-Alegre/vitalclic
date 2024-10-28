import React, { useState } from 'react';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    telefono: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // Aquí puedes manejar la lógica para enviar el formulario
  };

  return (
    <div id='text' className="form-container">

    <div className="form-box">
      <h1>DATOS DEL PACIENTE</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="nombres">NOMBRES</label>
          <input
            type="text"
            id="nombres"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="apellidos">APELLIDOS</label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="telefono">TELEFONO</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">SEPARAR CITA</button>
      </form>
    </div>
    </div>

  );
};

export default PatientForm;
