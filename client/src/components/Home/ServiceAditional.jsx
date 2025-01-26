import React, { useState } from 'react';
import styles from '../../styles/Home/ServiceAditional.module.css'; // Importando CSS Module
import { Modal, Box, Typography, Button } from '@mui/material';

const ServiceAditional = () => {
  const servicios = [
    'Medico de urgencias',
    'Odontología de urgencias',
    'Topico de emfermería',
    'Laboratorio clínico',
    'Diagnostico por imágen',
    'Ambulancia',
    'Centro de vacunación',
    'Pediatra de urgencias',
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formType, setFormType] = useState(null); // 'teleconsulta' o 'domicilio'
  const handleServiceClick = (servicio) => {
    if (servicio === "Topico de emfermería" || servicio === "Ambulancia" ||servicio === "Centro de vacunación") {
      setSelectedService(servicio);
      setFormType(null); // Resetear el formulario al abrir el modal
      setTimeout(() => {
        document.getElementById('formAditional').scrollIntoView({ behavior: 'smooth' });
      }, 100); // Permite que React actualice el DOM antes del desplazamiento
      return;
    } else {

      setSelectedService(servicio);
      setModalVisible(true);
      setFormType(null); // Resetear el formulario al abrir el modal
    }
  };

  const handleOptionClick = (type) => {
    setFormType(type);
    setModalVisible(false); // Cierra el modal después de elegir la opción
    setTimeout(() => {
      document.getElementById('formAditional').scrollIntoView({ behavior: 'smooth' });
    }, 100); // Permite que React actualice el DOM antes del desplazamiento
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedService(null);
    setFormType(null);
  };

  return (
    <div className={styles.serviciosContainer}>
      <h2 className={styles.titulo}>Servicios adicionales</h2>
      <div className={styles.serviciosGrid}>
        {servicios.map((servicio, index) => (
          <div
            key={index}
            className={styles.servicioCard}
            onClick={() => handleServiceClick(servicio)}
          >
            {servicio}
          </div>
        ))}
      </div>

      <Modal
        open={modalVisible}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {`Seleccionaste: ${selectedService}`}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            ¿Cómo deseas continuar?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
           {selectedService === "Laboratorio clínico" ? (

          <Button
              variant="contained"
              onClick={() => handleOptionClick('establecimiento')}
              sx={{
                backgroundColor: '#4a5b57',
                ':hover': { backgroundColor: '#4a5b57' },
              }}
            >
              Establecimiento
            </Button>
            ): (
         
            <Button
              variant="contained"
              onClick={() => handleOptionClick('teleconsulta')}
              sx={{
                backgroundColor: '#4a5b57',
                ':hover': { backgroundColor: '#4a5b57' },
              }}
            >
              Teleconsulta
            </Button>
        

                 )
                }
             <Button
              variant="contained"
              onClick={() => handleOptionClick('domicilio')}
              sx={{
                backgroundColor: '#4a5b57',
                ':hover': { backgroundColor: '#4a5b57' },
              }}
            >
                   Médico a domicilio
                   </Button>
          </Box>
        </Box>
      </Modal>
      {formType === "teleconsulta" && selectedService === "Medico de urgencias" ? (


        <div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
          <h2 className={styles.title}>
            Datos del paciente
          </h2>
          <form className={styles.form}>
            <label className={styles.label}> Apellidos y Nombres</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ingrese sus nombres"
            />

                <label className={styles.label}>Edad</label>
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Ingrese su correo electrónico"
                />

                <label className={styles.label}>Género</label>
                <select name="" id="" className={styles.input}>
                  <option value="">Selecionar género</option>
                  <option value="masculino">Masculino </option>
                  <option value="femenino">Femenino</option>

                </select>
          
            <label className={styles.label}>Telefóno</label>
            <input
              type="tel"
              className={styles.input}
              placeholder="Ingrese su telefóno"
            />
     <label className={styles.label}>Motivo de la consulta</label>
              <textarea
                className={styles.input}
                placeholder="Especifique el motivo de la consulta"
                rows="4"
                name="reason_for_shift"
                required
              ></textarea>
            <button type="submit" className={styles.button}>
              Solicitar atención
            </button>
          </form>
        </div>
  ): null}



{formType === "domicilio" && selectedService === "Medico de urgencias" ? (


<div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
  <h2 className={styles.title}>
    Datos del paciente
  </h2>
  <form className={styles.form}>
    <label className={styles.label}> Apellidos y nombres</label>
    <input
      type="text"
      className={styles.input}
      placeholder="Ingrese sus nombres"
    />

        <label className={styles.label}>Edad</label>
        <input
          type="number"
          className={styles.input}
          placeholder="Ingrese su correo electrónico"
        />

        <label className={styles.label}>Género</label>
        <select name="" id="" className={styles.input}>
          <option value="">Selecionar género</option>
          <option value="masculino">Masculino </option>
          <option value="femenino">Femenino</option>

        </select>
  
    <label className={styles.label}>Telefóno</label>
    <input
      type="tel"
      className={styles.input}
      placeholder="Ingrese su teléfono"
    />


<label className={styles.label}>Dirección</label>
    <input
      type="text"
      className={styles.input}
      placeholder="Ingrese su dirección"
    />


<label className={styles.label}>Referencias</label>
    <input
      type="text"
      className={styles.input}
      placeholder="Ingrese su referencia"
    />
<label className={styles.label}>Motivo de consulta</label>
      <textarea
        className={styles.input}
        placeholder="Especifique el motivo de la consulta"
        rows="4"
        name="reason_for_shift"
        required
      ></textarea>
    <button type="submit" className={styles.button}>
      Solicitar atención
    </button>
  </form>
</div>
): null}



{formType === "teleconsulta" && selectedService === "Pediatra de urgencias" ? (


<div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
  <h2 className={styles.title}>
    DATOS DEL PACIENTE
  </h2>
  <form className={styles.form}>
    <label className={styles.label}> Apellidos y nombres</label>
    <input
      type="text"
      className={styles.input}
      placeholder="Ingrese sus nombres"
    />

        <label className={styles.label}>Edad</label>
        <input
          type="number"
          className={styles.input}
          placeholder="Ingrese su correo electrónico"
        />

        <label className={styles.label}>Género</label>
        <select name="" id="" className={styles.input}>
          <option value="">Selecionar género</option>
          <option value="masculino">Masculino </option>
          <option value="femenino">Femenino</option>

        </select>
  
    <label className={styles.label}>Telefóno</label>
    <input
      type="tel"
      className={styles.input}
      placeholder="Ingrese su teléfono"
    />
<label className={styles.label}>Motivo de la consulta</label>
      <textarea
        className={styles.input}
        placeholder="Especifique el motivo de la consulta"
        rows="4"
        name="reason_for_shift"
        required
      ></textarea>
    <button type="submit" className={styles.button}>
      Solicitar atención
    </button>
  </form>
</div>
): null}



{formType === "domicilio" && selectedService === "Pediatra de urgencias" ? (


<div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
<h2 className={styles.title}>
Datos del paciente
</h2>
<form className={styles.form}>
<label className={styles.label}> Apellido y nombres</label>
<input
type="text"
className={styles.input}
placeholder="Ingrese sus nombres"
/>

<label className={styles.label}>Edad</label>
<input
  type="number"
  className={styles.input}
  placeholder="Ingrese su correo electrónico"
/>

<label className={styles.label}>Género</label>
<select name="" id="" className={styles.input}>
  <option value="">Selecionar género</option>
  <option value="masculino">Masculino </option>
  <option value="femenino">Femenino</option>

</select>

<label className={styles.label}>Telefóno</label>
<input
type="tel"
className={styles.input}
placeholder="Ingrese su teléfono"
/>


<label className={styles.label}>Dirección</label>
<input
type="text"
className={styles.input}
placeholder="Ingrese su dirección"
/>


<label className={styles.label}>Referencia</label>
<input
type="text"
className={styles.input}
placeholder="Ingrese su referencia"
/>
<label className={styles.label}>Motivo de la consulta</label>
<textarea
className={styles.input}
placeholder="Especifique el motivo de la consulta"
rows="4"
name="reason_for_shift"
required
></textarea>
<button type="submit" className={styles.button}>
Solicitar atención
</button>
</form>
</div>
): null}











{formType === "teleconsulta" && selectedService === "Odontología de urgencias" ? (


<div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
  <h2 className={styles.title}>
    Datos del paciente
  </h2>
  <form className={styles.form}>
    <label className={styles.label}> Apellidos y nombres</label>
    <input
      type="text"
      className={styles.input}
      placeholder="Ingrese sus nombres"
    />

        <label className={styles.label}>Edad</label>
        <input
          type="number"
          className={styles.input}
          placeholder="Ingrese su correo electrónico"
        />

        <label className={styles.label}>Género</label>
        <select name="" id="" className={styles.input}>
          <option value="">Selecionar género</option>
          <option value="Masculino">Masculino </option>
          <option value="Femenino">Femenino</option>

        </select>
  
    <label className={styles.label}>Telefóno</label>
    <input
      type="tel"
      className={styles.input}
      placeholder="Ingrese su teléfono"
    />

<label className={styles.label}>Dentadura</label>
        <select name="" id="" className={styles.input}>
          <option value="">Selecionar dentadura</option>
          <option value="Natural">Natural </option>
          <option value="Postiza">Postiza</option>

        </select>
<label className={styles.label}>Motivo de la consulta</label>
      <textarea
        className={styles.input}
        placeholder="Especifique el motivo de la consulta"
        rows="4"
        name="reason_for_shift"
        required
      ></textarea>
    <button type="submit" className={styles.button}>
      Solicitar atención
    </button>
  </form>
</div>
): null}



{formType === "domicilio" && selectedService === "Odontología de urgencias" ? (


<div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
<h2 className={styles.title}>
Datos del paciente
</h2>
<form className={styles.form}>
<label className={styles.label}> Apellidos y nombres</label>
<input
type="text"
className={styles.input}
placeholder="Ingrese sus nombres"
/>

<label className={styles.label}>Edad</label>
<input
  type="number"
  className={styles.input}
  placeholder="Ingrese su correo electrónico"
/>

<label className={styles.label}>Género</label>
<select name="" id="" className={styles.input}>
  <option value="">Selecionar género</option>
  <option value="masculino">Masculino </option>
  <option value="femenino">Femenino</option>

</select>

<label className={styles.label}>Telefóno</label>
<input
type="tel"
className={styles.input}
placeholder="Ingrese su teléfono"
/>


<label className={styles.label}>Dirección</label>
<input
type="text"
className={styles.input}
placeholder="Ingrese su dirección"
/>


<label className={styles.label}>Referencia</label>
<input
type="text"
className={styles.input}
placeholder="Ingrese su referencia"
/>

<label className={styles.label}>Denta</label>
        <select name="" id="" className={styles.input}>
          <option value="">Selecionar dentadura</option>
          <option value="Natural">Natural </option>
          <option value="Postiza">Postiza</option>

        </select>
<label className={styles.label}>Motivo de la consulta</label>
<textarea
className={styles.input}
placeholder="Especifique el motivo de la consulta"
rows="4"
name="reason_for_shift"
required
></textarea>
<button type="submit" className={styles.button}>
Solicitar atención
</button>
</form>
</div>
): null}



{selectedService === "Topico de emfermería" ? (


<div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
<h2 className={styles.title}>
Datos del paciente
</h2>
<form className={styles.form}>
<label className={styles.label}> Apellidos y nombres</label>
<input
type="text"
className={styles.input}
placeholder="Ingrese sus nombres"
/>

<label className={styles.label}>Edad</label>
<input
  type="number"
  className={styles.input}
  placeholder="Ingrese su correo electrónico"
/>

<label className={styles.label}>Género</label>
<select name="" id="" className={styles.input}>
  <option value="">Selecionar género</option>
  <option value="masculino">Masculino </option>
  <option value="femenino">Femenino</option>

</select>
<label className={styles.label}>Telefóno</label>

<input
type="tel"
className={styles.input}
placeholder="Ingrese su teléfono"
/>


<label className={styles.label}>Dorección</label>
<input
type="text"
className={styles.input}
placeholder="Ingrese su dirección"
/>


<label className={styles.label}>Referencia</label>
<input
type="text"
className={styles.input}
placeholder="Ingrese su referencia"
/>

<label className={styles.label}>Emfermedades pre existentes</label>
<input
type="text"
className={styles.input}
placeholder="Emfermedades pre existentes"
/>
<label className={styles.label}>Observaciones adicionale</label>
<textarea
className={styles.input}
placeholder="Observaciones adicionales"
rows="4"
name="reason_for_shift"
required
></textarea>
<button type="submit" className={styles.button}>
Solicitar atención
</button>
</form>
</div>
): null}



{selectedService === "Ambulancia" ? (


<div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
<h2 className={styles.title}>
Datos del paciente
</h2>
<form className={styles.form}>
<label className={styles.label}> Apellidos y nombres</label>
<input
type="text"
className={styles.input}
placeholder="Ingrese sus nombres"
/>

<label className={styles.label}>Edad</label>
<input
  type="number"
  className={styles.input}
  placeholder="Ingrese su correo electrónico"
/>



<label className={styles.label}>Telefóno</label>
<input
type="tel"
className={styles.input}
placeholder="Ingrese su teléfono"
/>


<label className={styles.label}>Dirección de recojo</label>
<input
type="text"
className={styles.input}
placeholder="Dirección de recojo"
/>

<label className={styles.label}>Dirección de destino</label>
<input
type="text"
className={styles.input}
placeholder="Dirección de destino"
/>


<label className={styles.label}>Motivo de traslado</label>
<input
type="text"
className={styles.input}
placeholder="Motivo de traslado"
/>

<label className={styles.label}>Síntomas</label>
<input
type="text"
className={styles.input}
placeholder="Síntomas"
/>
<label className={styles.label}>Observaciones </label>
<textarea
className={styles.input}
placeholder="Observaciones"
rows="4"
required
></textarea>
<button type="submit" className={styles.button}>
Solicitar atención
</button>
</form>
</div>
): null}


{selectedService === "Centro de vacunación" ? (


<div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
<h2 className={styles.title}>
Datos del paciente
</h2>
<form className={styles.form}>
<label className={styles.label}> Apellidos y nombres</label>
<input
type="text"
className={styles.input}
placeholder="Ingrese sus nombres"
/>

<label className={styles.label}>Dni</label>
<input
  type="number"
  className={styles.input}
  placeholder="Dni"
/>



<label className={styles.label}>Fecha de nacimiento</label>
<input
type="date"
className={styles.input}
placeholder="Fecha de nacimiento"
/>


<label className={styles.label}>Telefóno</label>
<input
type="Tel"
className={styles.input}
placeholder="Telefóno"
/>

<label className={styles.label}>Vacuna que solicita</label>
<input
type="text"
className={styles.input}
placeholder="Vacuna que solicita"
/>


<label className={styles.label}>Enfermedades Pre existentes</label>
<input
type="text"
className={styles.input}
placeholder="Enfermedades Pre existentes"
/>

<label className={styles.label}>Alergias</label>
<input
type="text"
className={styles.input}
placeholder="Síntomas"
/>
<label className={styles.label}>Observaciones </label>
<textarea
className={styles.input}
placeholder="Observaciones"
rows="4"
required
></textarea>
<button type="submit" className={styles.button}>
Solicitar atención
</button>
</form>
</div>
): null}




{selectedService === "Laboratorio clínico" && formType === "establecimiento" ? (


<div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
<h2 className={styles.title}>
Datos del paciente
</h2>
<form className={styles.form}>
<label className={styles.label}> Apellidos y nombres</label>
<input
type="text"
className={styles.input}
placeholder="Ingrese sus nombres"
/>

<label className={styles.label}>Dni</label>
<input
  type="number"
  className={styles.input}
  placeholder="Dni"
/>



<label className={styles.label}>Fecha de nacimiento</label>
<input
type="date"
className={styles.input}
placeholder="Fecha de nacimiento"
/>


<label className={styles.label}>Telefóno</label>
<input
type="Tel"
className={styles.input}
placeholder="Telefóno"
/>

<label className={styles.label}>Examen que solicita</label>
<input
type="text"
className={styles.input}
placeholder="Examen que solicita"
/>


<label className={styles.label}>Enfermedades Pre existentes</label>
<input
type="text"
className={styles.input}
placeholder="Enfermedades Pre existentes"
/>

<label className={styles.label}>Alergias</label>
<input
type="text"
className={styles.input}
placeholder="Síntomas"
/>
<label className={styles.label}>Observaciones </label>
<textarea
className={styles.input}
placeholder="Observaciones"
rows="4"
required
></textarea>
<button type="submit" className={styles.button}>
Solicitar atención
</button>
</form>
</div>
): null}



{selectedService === "Laboratorio clínico" && formType === "domicilio" ? (


<div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
<h2 className={styles.title}>
Datos del paciente
</h2>
<form className={styles.form}>
<label className={styles.label}> Apellidos y nombres</label>
<input
type="text"
className={styles.input}
placeholder="Ingrese sus nombres"
/>

<label className={styles.label}>Dni</label>
<input
  type="number"
  className={styles.input}
  placeholder="Dni"
/>



<label className={styles.label}>Fecha de nacimiento</label>
<input
type="date"
className={styles.input}
placeholder="Fecha de nacimiento"
/>


<label className={styles.label}>Telefóno</label>
<input
type="Tel"
className={styles.input}
placeholder="Telefóno"
/>

<label className={styles.label}>Dirección</label>
<input
type="text"
className={styles.input}
placeholder="Dirección"
/>
<label className={styles.label}>Referencia</label>
<input
type="text"
className={styles.input}
placeholder="Referencia"
/>



<label className={styles.label}>Enfermedades Pre existentes</label>
<input
type="text"
className={styles.input}
placeholder="Enfermedades Pre existentes"
/>

<label className={styles.label}>Alergias</label>
<input
type="text"
className={styles.input}
placeholder="Síntomas"
/>
<label className={styles.label}>Observaciones </label>
<textarea
className={styles.input}
placeholder="Observaciones"
rows="4"
required
></textarea>
<button type="submit" className={styles.button}>
Solicitar atención
</button>
</form>
</div>
): null}
    </div>

  );
};

export default ServiceAditional;
