import React, { useState } from 'react';

function RegisterDoctors() {
  const [data, setData] = useState({
    name: "",
    lastName: "",
    professional_college: "",
    registration_number: "",
    specialty_number_rne: "",
    genre: "",
    birthdate: "",
    email: "",
    country: "",
    province: "",
    district: "",
    specialty: "",
    phone: "",
    password: "",
    termsAccepted: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!data.termsAccepted) {
      alert("Debes aceptar los términos y condiciones para registrarte");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/register-doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registro exitoso");
        console.log("Token:", result.token);
      } else {
        alert(result.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error en el servidor");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Nombre" required />
      <input type="text" name="lastName" value={data.lastName} onChange={handleChange} placeholder="Apellido" required />
      <input type="text" name="professional_college" value={data.professional_college} onChange={handleChange} placeholder="Colegio Profesional" required />
      <input type="text" name="registration_number" value={data.registration_number} onChange={handleChange} placeholder="Número de Registro" required />
      <input type="text" name="specialty_number_rne" value={data.specialty_number_rne} onChange={handleChange} placeholder="Número de Especialidad (RNE)" required />
      
      <select name="genre" value={data.genre} onChange={handleChange} required>
        <option value="">Selecciona Género</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
        <option value="Otro">Otro</option>
      </select>

      <input type="date" name="birthdate" value={data.birthdate} onChange={handleChange} placeholder="Fecha de Nacimiento" required />
      <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Correo Electrónico" required />
      <input type="text" name="country" value={data.country} onChange={handleChange} placeholder="País" required />
      <input type="text" name="province" value={data.province} onChange={handleChange} placeholder="Provincia" required />
      <input type="text" name="district" value={data.district} onChange={handleChange} placeholder="Distrito" required />
      <input type="text" name="specialty" value={data.specialty} onChange={handleChange} placeholder="Especialidad" required />
      <input type="tel" name="phone" value={data.phone} onChange={handleChange} placeholder="Teléfono" required />
      <input type="password" name="password" value={data.password} onChange={handleChange} placeholder="Contraseña" required />

      <label>
        <input type="checkbox" name="termsAccepted" checked={data.termsAccepted} onChange={handleChange} />
        Acepto los términos y condiciones
      </label>
      
      <button type="submit">Registrarme</button>
    </form>
  );
}

export default RegisterDoctors;
