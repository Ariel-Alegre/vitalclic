import React from 'react';
import { useNavigate } from 'react-router-dom';
const RegisterSuccess = () => {
    const navigate = useNavigate();

    const volverAlInicio = () => {
      navigate('/'); // Redirige a la página de inicio
    };
  return (
    <div className="container-successRegister">
      <h2 className="title-successRegister">¡Formulario enviado Exitosamente!</h2>
      <p className="message-successRegister">Tu formulario se envio correctamente.El equipo de administradores revisaran la solicitud y se te enviara un correo electrónico si tu solicitud se aprobo para iniciar sesión.</p>
      <button onClick={volverAlInicio} className='button-successRegister'>Volver al Inicio</button>
    </div>
  );
};



export default RegisterSuccess;
