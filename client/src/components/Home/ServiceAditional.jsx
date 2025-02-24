import React, { useState } from 'react';
import styles from '../../styles/Home/ServiceAditional.module.css'; // Importando CSS Module
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const ServiceAditional = () => {
  const servicios = [
    'Médico de urgencias',
    'Pediatra de urgencias',
    'Odontólogo de urgencias',
    'Tópico de enfermería',
    'Laboratorio clínico',
    'Diagnóstico por imágen',
    'Ambulancia',
    'Centro de vacunación',
  ];

  const [emergencyDoctorTeleconsulta, setEmergencyDoctorTeleconsulta] = useState({
    name_complete: '',
    age: '',
    gender: '',
    phone: '',
    reason: ''
  });
  const [emergencyDoctorPresencial, setEmergencyDoctorPresencial] = useState({
    name_complete: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    reference: '',

    reason: ''
  });




  const [emergencyDentistryTeleconsulta, setEmergencyDentistryTeleconsulta] = useState({
    name_complete: '',
    age: '',
    gender: '',
    phone: '',
    teeth: '',

    reason: ''
  });


  const [emergencyDentistryPresencial, setEmergencyDentistryPresencial] = useState({
    name_complete: '',
    age: '',
    gender: '',
    phone: '',
    teeth: '',
    address: '',
    reference: '',

    reason: ''
  });


  const [nursingTheme, setNursingTheme] = useState({
    name_complete: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    reference: '',
    pre_existing_diseases: "",
    reason: ''
  });


  const [clinicalLaboratoryEstablecimiento, setClinicalLaboratoryEstablecimiento] = useState({
    name_complete: '',
    dni: '',
    date: '',
    phone: '',
    exam_you_request: '',
    pre_existing_diseases: '',
    allergies: '',
    reason: ''
  });

  const [clinicalLaboratoryDomicilio, setClinicalLaboratoryDomicilio] = useState({
    name_complete: '',
    dni: '',
    date: '',
    phone: '',
    address: '',
    reference: '',

    pre_existing_diseases: '',
    allergies: '',
    reason: ''
  });

  const [diagnosticImaging, setDiagnosticImaging] = useState({
    name_complete: '',
    dni: '',
    date: '',
    phone: '',
    exam_you_request: '',

    pre_existing_diseases: '',
    allergies: '',
    reason: ''
  });



  const [ambulancia, setAmbulancia] = useState({
    name_complete: '',
    age: '',
    phone: '',
    pick_up_address: '',
    destination_address: '',
    reason_for_transfer: '',
    symptoms: '',
    reason: ''
  });

  const [vaccinationCenter, setVaccinationCenter] = useState({
    name_complete: '',
    dni: '',
    date: '',
    phone: '',
    vaccine_you_request: '',
    pre_existing_diseases: '',
    allergies: '',
    reason: ''
  });

  const [emergencyPediatricianTeleconsulta, setEmergencyPediatricianTeleconsulta] = useState({
    name_complete: '',
    age: '',
    gender: '',
    phone: '',

    reason: ''
  });


  const [emergencyPediatricianDomicilio, setEmergencyPediatricianDomicilio] = useState({
    name_complete: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    reference: '',
    reason: ''
  });




  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formType, setFormType] = useState(null); // 'teleconsulta' o 'domicilio'
  const handleServiceClick = (servicio) => {
    if (servicio === "Tópico de enfermería" || servicio === "Ambulancia" || servicio === "Centro de vacunación" || servicio === "Diagnóstico por imágen") {
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


  const handleChangeEmergencyDoctorTeleconsulta = (event) => {
    const { name, value } = event.target;
    setEmergencyDoctorTeleconsulta({
      ...emergencyDoctorTeleconsulta,  // Conservar los valores anteriores
      [name]: value  // Actualizar el valor del campo correspondiente
    });
  };



  const handleSubmitEmergencyDoctorTeleconsulta = (event) => {
    event.preventDefault();

    // Generar el mensaje que se enviará por WhatsApp
    const message = `
      *Servicio:*  ${selectedService} - ${formType}

      *Datos del paciente:*
      *Apellidos y Nombres:* ${emergencyDoctorTeleconsulta.name_complete}
      *Edad:* ${emergencyDoctorTeleconsulta.age}
      *Género:* ${emergencyDoctorTeleconsulta.gender}
      *Teléfono:* ${emergencyDoctorTeleconsulta.phone}
      *Motivo de la consulta:* ${emergencyDoctorTeleconsulta.reason}
    `;

    // Número de teléfono al que deseas enviar el mensaje (en formato internacional)
    const phoneNumber = '+541161361408'; // Cambia este número por el número destino

    // URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
  };







  const handleChangeEmergencyDoctorPresencial = (event) => {
    const { name, value } = event.target;
    setEmergencyDoctorPresencial({
      ...emergencyDoctorPresencial,  // Conservar los valores anteriores
      [name]: value  // Actualizar el valor del campo correspondiente
    });
  };



  const handleSubmitEmergencyDoctorPresencial = (event) => {
    event.preventDefault();

    // Generar el mensaje que se enviará por WhatsApp
    const message = `
      *Servicio:*  ${selectedService} - ${formType}

      *Datos del paciente:*
      *Apellidos y Nombres:* ${emergencyDoctorPresencial.name_complete}
      *Edad:* ${emergencyDoctorPresencial.age}
      *Género:* ${emergencyDoctorPresencial.gender}
      *Teléfono:* ${emergencyDoctorPresencial.phone}
      *Dirección:* ${emergencyDoctorPresencial.address}
      *Referencias:* ${emergencyDoctorPresencial.reference}
      *Motivo de la consulta:* ${emergencyDoctorPresencial.reason}
    `;

    // Número de teléfono al que deseas enviar el mensaje (en formato internacional)
    const phoneNumber = '+541161361408'; // Cambia este número por el número destino

    // URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');

  }





  const handleChangeEmergencyDentistryTeleconsulta = (event) => {
    const { name, value } = event.target;
    setEmergencyDentistryTeleconsulta({
      ...emergencyDentistryTeleconsulta,  // Conservar los valores anteriores
      [name]: value  // Actualizar el valor del campo correspondiente
    });
  };


  const handleSubmitEmergencyDentistryTeleconsulta = (event) => {
    event.preventDefault();

    // Generar el mensaje que se enviará por WhatsApp
    const message = `
      *Servicio:*  ${selectedService} - ${formType}

      *Datos del paciente:*
      *Apellidos y Nombres:* ${emergencyDentistryTeleconsulta.name_complete}
      *Edad:* ${emergencyDentistryTeleconsulta.age}
      *Género:* ${emergencyDentistryTeleconsulta.gender}
      *Teléfono:* ${emergencyDentistryTeleconsulta.phone}
      *Dentadura:* ${emergencyDentistryTeleconsulta.teeth}
      *Motivo de la consulta:* ${emergencyDentistryTeleconsulta.reason}
    `;

    // Número de teléfono al que deseas enviar el mensaje (en formato internacional)
    const phoneNumber = '+541161361408'; // Cambia este número por el número destino

    // URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');

  }




  const handleChangeEmergencyDentistryPresencial = (event) => {
    const { name, value } = event.target;
    setEmergencyDentistryPresencial({
      ...emergencyDentistryPresencial,  // Conservar los valores anteriores
      [name]: value  // Actualizar el valor del campo correspondiente
    });
  };


  const handleSubmitEmergencyDentistryPresencial = (event) => {
    event.preventDefault();

    // Generar el mensaje que se enviará por WhatsApp
    const message = `
      *Servicio:*  ${selectedService} - ${formType}

      *Datos del paciente:*
      *Apellidos y Nombres:* ${emergencyDentistryPresencial.name_complete}
      *Edad:* ${emergencyDentistryPresencial.age}
      *Género:* ${emergencyDentistryPresencial.gender}
      *Dirección:*${emergencyDentistryPresencial.address}
      *Teléfono:* ${emergencyDentistryPresencial.phone}
      *Dentadura:* ${emergencyDentistryPresencial.teeth}
      *Motivo de la consulta:* ${emergencyDentistryPresencial.reason}
    `;

    // Número de teléfono al que deseas enviar el mensaje (en formato internacional)
    const phoneNumber = '+541161361408'; // Cambia este número por el número destino

    // URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');

  }


  const handleChangeNursingTheme = (event) => {
    const { name, value } = event.target;
    setNursingTheme({
      ...nursingTheme,  // Conservar los valores anteriores
      [name]: value  // Actualizar el valor del campo correspondiente
    });
  };


  const handleSubmitNursingTheme = (event) => {
    event.preventDefault();

    // Generar el mensaje que se enviará por WhatsApp
    const message = `
      *Servicio:*  ${selectedService} ${formType ? "-" : ""} ${formType ? formType : ""}

      *Datos del paciente:*
      *Apellidos y Nombres:* ${nursingTheme.name_complete}
      *Edad:* ${nursingTheme.age}
      *Género:* ${nursingTheme.gender}
      *Dirección:*${nursingTheme.address}
      *Teléfono:* ${nursingTheme.phone}
      *Referencia:* ${nursingTheme.reference}
      *Emfermedades pre existentes:* ${nursingTheme.pre_existing_diseases}

      
      *Motivo de la consulta:* ${nursingTheme.reason}
    `;

    // Número de teléfono al que deseas enviar el mensaje (en formato internacional)
    const phoneNumber = '+541161361408'; // Cambia este número por el número destino

    // URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');

  }

  const handleChangeClinicalLaboratoryEstablecimiento = (event) => {
    const { name, value } = event.target;
    setClinicalLaboratoryEstablecimiento({
      ...clinicalLaboratoryEstablecimiento,  // Conservar los valores anteriores
      [name]: value  // Actualizar el valor del campo correspondiente
    });
  };


  const handleSubmitClinicalLaboratoryEstablecimiento = (event) => {
    event.preventDefault();

    // Generar el mensaje que se enviará por WhatsApp
    const message = `
      *Servicio:*  ${selectedService} ${formType ? "-" : ""} ${formType ? formType : ""}

      *Datos del paciente:*
      *Apellidos y Nombres:* ${clinicalLaboratoryEstablecimiento.name_complete}
      *DNI:* ${clinicalLaboratoryEstablecimiento.dni}

      *Fecha de nacimiento:* ${clinicalLaboratoryEstablecimiento.date}
      *Teléfono:* ${clinicalLaboratoryEstablecimiento.phone}
      *Examen que solicita:* ${clinicalLaboratoryEstablecimiento.exam_you_request}
      *Enfermedades Pre existentes:* ${clinicalLaboratoryEstablecimiento.pre_existing_diseases}
      *Alergias:* ${clinicalLaboratoryEstablecimiento.allergies}

      *Motivo de la consulta:* ${clinicalLaboratoryEstablecimiento.reason}
    `;

    // Número de teléfono al que deseas enviar el mensaje (en formato internacional)
    const phoneNumber = '+541161361408'; // Cambia este número por el número destino

    // URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');

  }


  const handleChangeClinicalLaboratoryDomicilio = (event) => {
    const { name, value } = event.target;
    setClinicalLaboratoryDomicilio({
      ...clinicalLaboratoryDomicilio,  // Conservar los valores anteriores
      [name]: value  // Actualizar el valor del campo correspondiente
    });
  };


  const handleSubmitClinicalLaboratoryDomicilio = (event) => {
    event.preventDefault();

    // Generar el mensaje que se enviará por WhatsApp
    const message = `
      *Servicio:*  ${selectedService} ${formType ? "-" : ""} ${formType ? formType : ""}

      *Datos del paciente:*
      *Apellidos y Nombres:* ${clinicalLaboratoryDomicilio.name_complete}
      *DNI:* ${clinicalLaboratoryDomicilio.dni}
      *Fecha de nacimiento:* ${clinicalLaboratoryDomicilio.date}
      *Teléfono:* ${clinicalLaboratoryDomicilio.phone}
      *Dirección:* ${clinicalLaboratoryDomicilio.address}
      *Referencia:* ${clinicalLaboratoryDomicilio.reference}
      *Enfermedades Pre existentes:* ${clinicalLaboratoryDomicilio.pre_existing_diseases}
      *Alergias:* ${clinicalLaboratoryDomicilio.allergies}

      *Motivo de la consulta:* ${clinicalLaboratoryDomicilio.reason}
    `;

    // Número de teléfono al que deseas enviar el mensaje (en formato internacional)
    const phoneNumber = '+541161361408'; // Cambia este número por el número destino

    // URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');

  }



  const handleChangeDiagnosticImaging = (event) => {
    const { name, value } = event.target;
    setDiagnosticImaging({
      ...diagnosticImaging,  // Conservar los valores anteriores
      [name]: value  // Actualizar el valor del campo correspondiente
    });
  };


  const handleSubmitDiagnosticImaging = (event) => {
    event.preventDefault();

    // Generar el mensaje que se enviará por WhatsApp
    const message = `
      *Servicio:*  ${selectedService} ${formType ? "-" : ""} ${formType ? formType : ""}

      *Datos del paciente:*
      *Apellidos y Nombres:* ${diagnosticImaging.name_complete}
      *DNI:* ${diagnosticImaging.dni}
      *Fecha de nacimiento:* ${diagnosticImaging.date}
      *Teléfono:* ${diagnosticImaging.phone}
      *Examen que solicita:* ${diagnosticImaging.exam_you_request}
      *Enfermedades Pre existentes:* ${diagnosticImaging.pre_existing_diseases}
      *Alergias:* ${diagnosticImaging.allergies}

      *Observaciones:* ${diagnosticImaging.reason}
    `;

    // Número de teléfono al que deseas enviar el mensaje (en formato internacional)
    const phoneNumber = '+541161361408'; // Cambia este número por el número destino

    // URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');

  };








  const handleChangeAmbulancia = (event) => {
    const { name, value } = event.target;
    setAmbulancia({
      ...ambulancia,  // Conservar los valores anteriores
      [name]: value  // Actualizar el valor del campo correspondiente
    });
  };


  const handleSubmitAmbulancia = (event) => {
    event.preventDefault();

    // Generar el mensaje que se enviará por WhatsApp
    const message = `
      *Servicio:*  ${selectedService} ${formType ? "-" : ""} ${formType ? formType : ""}

      *Datos del paciente:*
      *Apellidos y Nombres:* ${ambulancia.name_complete}
      *Edad:* ${ambulancia.age}
      *Teléfono:* ${ambulancia.phone}
      *Dirección de recojo:* ${ambulancia.pick_up_address}
      *Dirección de destino:* ${ambulancia.destination_address}
      *Motivo de traslado:* ${ambulancia.reason_for_transfer}
      *Síntomas:* ${ambulancia.symptoms}

      *Observaciones:* ${ambulancia.reason}
    `;

    // Número de teléfono al que deseas enviar el mensaje (en formato internacional)
    const phoneNumber = '+541161361408'; // Cambia este número por el número destino

    // URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');

  }

  const handleChangeVaccinationCenter = (event) => {
    const { name, value } = event.target;
    setVaccinationCenter({
      ...vaccinationCenter,  // Conservar los valores anteriores
      [name]: value  // Actualizar el valor del campo correspondiente
    });
  };


  const handleSubmitVaccinationCenter = (event) => {
    event.preventDefault();

    // Generar el mensaje que se enviará por WhatsApp
    const message = `
      *Servicio:*  ${selectedService} ${formType ? "-" : ""} ${formType ? formType : ""}

      *Datos del paciente:*
      *Apellidos y Nombres:* ${vaccinationCenter.name_complete}
      *DNI:* ${vaccinationCenter.dni}
      *Fecha de nacimiento:* ${vaccinationCenter.date}
      *Telefóno:* ${vaccinationCenter.phone}
      *Vacuna que solicita:* ${vaccinationCenter.vaccine_you_request}
      *Enfermedades Pre existentes:* ${vaccinationCenter.pre_existing_diseases}
      *Alergias:* ${vaccinationCenter.allergies}

      *Observaciones:* ${vaccinationCenter.reason}
    `;

    // Número de teléfono al que deseas enviar el mensaje (en formato internacional)
    const phoneNumber = '+541161361408'; // Cambia este número por el número destino

    // URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');

  }



  const handleChangeEmergencyPediatricianTleconsulta = (event) => {
    const { name, value } = event.target;
    setEmergencyPediatricianTeleconsulta({
      ...emergencyPediatricianTeleconsulta,  // Conservar los valores anteriores
      [name]: value  // Actualizar el valor del campo correspondiente
    });
  };


  const handleSubmitEmergencyPediatricianTleconsulta = (event) => {
    event.preventDefault();

    // Generar el mensaje que se enviará por WhatsApp
    const message = `
      *Servicio:*  ${selectedService} ${formType ? "-" : ""} ${formType ? formType : ""}

      *Datos del paciente:*
      *Apellidos y Nombres:* ${emergencyPediatricianTeleconsulta.name_complete}
      *Edad:* ${emergencyPediatricianTeleconsulta.age}
      *Genéro:* ${emergencyPediatricianTeleconsulta.gender}
      *Telefóno:* ${emergencyPediatricianTeleconsulta.phone}

      *Observaciones:* ${emergencyPediatricianTeleconsulta.reason}
    `;

    // Número de teléfono al que deseas enviar el mensaje (en formato internacional)
    const phoneNumber = '+541161361408'; // Cambia este número por el número destino

    // URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');

  };








  const handleChangeEmergencyPediatricianDomicilio = (event) => {
    const { name, value } = event.target;
    setEmergencyPediatricianDomicilio({
      ...emergencyPediatricianDomicilio,  // Conservar los valores anteriores
      [name]: value  // Actualizar el valor del campo correspondiente
    });
  };


  const handleSubmitEmergencyPediatricianDomicilio = (event) => {
    event.preventDefault();

    // Generar el mensaje que se enviará por WhatsApp
    const message = `
      *Servicio:*  ${selectedService} ${formType ? "-" : ""} ${formType ? formType : ""}

      *Datos del paciente:*
      *Apellidos y Nombres:* ${emergencyPediatricianDomicilio.name_complete}
      *Edad:* ${emergencyPediatricianDomicilio.age}
      *Genéro:* ${emergencyPediatricianDomicilio.gender}
      *Telefóno:* ${emergencyPediatricianDomicilio.phone}
      *Dirección:* ${emergencyPediatricianDomicilio.address}
      *Referencia:* ${emergencyPediatricianDomicilio.reference}


      *Observaciones:* ${emergencyPediatricianDomicilio.reason}
    `;

    // Número de teléfono al que deseas enviar el mensaje (en formato internacional)
    const phoneNumber = '+541161361408'; // Cambia este número por el número destino

    // URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');

  }

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
            maxWidth: "100%",
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            position: 'relative', // Necesario para posicionar la X
          }}
        >
          {/* Icono de cierre en la esquina superior derecha */}
          <IconButton
            onClick={closeModal}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: '#000',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography id="modal-title" variant="h6" component="h2">
            {`Seleccionaste: ${selectedService}`}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            ¿Cómo deseas continuar?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: "1em", mt: 3, flexWrap: "wrap" }}>
            {selectedService === "Laboratorio clínico" ? (
              <Button
                variant="contained"
                onClick={() => handleOptionClick('establecimiento')}
                sx={{
                  backgroundColor: '#4a5b57',
                  ':hover': { backgroundColor: '#4a5b57' },
                }}
              >
                {`Laboratorio en Establecimiento`}
              </Button>
            ) : (
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
            )}
            <Button
              variant="contained"
              onClick={() => handleOptionClick('domicilio')}
              sx={{
                backgroundColor: '#4a5b57',
                ':hover': { backgroundColor: '#4a5b57' },
              }}
            >
              {`${selectedService === "Odontólogo de urgencias" ? "Odontólogo" : selectedService === "Médico de urgencias" ? "Médico" : selectedService === "Tópico de enfermería" ? "enfermero" : selectedService === "Laboratorio clínico" ? "laboratorio" : selectedService === "Pediatra de urgencias" ? "pediatra" : selectedService} a domicilio`}
            </Button>
          </Box>
        </Box>
      </Modal>

      {formType === "teleconsulta" && selectedService === "Médico de urgencias" ? (


        <div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
          <h2 className={styles.title}>
            Datos del paciente
          </h2>
          <form className={styles.form} onSubmit={handleSubmitEmergencyDoctorTeleconsulta}>
            <label className={styles.label}> Apellidos y Nombres</label>
            <input
              type="text"
              name='name_complete'
              className={styles.input}
              placeholder="Ingrese sus nombres"
              required
            />

            <label className={styles.label}>Edad</label>
            <input
              type="number"
              name='age'
              required
              className={styles.input}
              placeholder="Edad"
              onChange={handleChangeEmergencyDoctorTeleconsulta}
            />

            <label className={styles.label}>Género</label>
            <select name='gender' className={styles.input}
              onChange={handleChangeEmergencyDoctorTeleconsulta}
              required
            >
              <option value="">Selecionar género</option>
              <option value="masculino">Masculino </option>
              <option value="femenino">Femenino</option>
              <option value="prefiero no contestar">Prefiero no contestar</option>

            </select>

            <label className={styles.label}>Telefóno</label>
            <input
              type="tel"
              name='phone'
              className={styles.input}
              required
              placeholder="Ingrese su telefóno"
              onChange={handleChangeEmergencyDoctorTeleconsulta}
            />
            <label className={styles.label}>Motivo de la consulta</label>
            <textarea
              className={styles.input}
              placeholder="Especifique el motivo de la consulta"
              rows="4"
              name="reason"
              required
              onChange={handleChangeEmergencyDoctorTeleconsulta}
            ></textarea>
            <button type="submit" className={styles.button}>
              Solicitar atención
            </button>
          </form>
        </div>
      ) : null}



      {formType === "domicilio" && selectedService === "Médico de urgencias" ? (


        <div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
          <h2 className={styles.title}>
            Datos del paciente
          </h2>
          <form className={styles.form} onSubmit={handleSubmitEmergencyDoctorPresencial}>
            <label className={styles.label}> Apellidos y nombres</label>
            <input
              type="text"
              name='name_complete'
              className={styles.input}
              placeholder="Ingrese sus nombres"
              required
            />

            <label className={styles.label}>Edad</label>
            <input
              type="number"
              className={styles.input}
              placeholder="Edad"
              required
              name='age'
              onChange={handleChangeEmergencyDoctorPresencial}
            />

            <label className={styles.label}>Género</label>
            <select name="gender" id="" className={styles.input}
              onChange={handleChangeEmergencyDoctorPresencial}
              required
            >
              <option value="">Selecionar género</option>
              <option value="masculino">Masculino </option>
              <option value="femenino">Femenino</option>
              <option value="prefiero no contestar">Prefiero no contestar</option>

            </select>

            <label className={styles.label}>Telefóno</label>
            <input
              type="tel"
              className={styles.input}
              placeholder="Ingrese su teléfono"
              onChange={handleChangeEmergencyDoctorPresencial}
              name='phone'
              required
            />


            <label className={styles.label}>Dirección</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ingrese su dirección"
              onChange={handleChangeEmergencyDoctorPresencial}
              name='address'
              required
            />


            <label className={styles.label}>Referencias</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ingrese su referencia"
              onChange={handleChangeEmergencyDoctorPresencial}
              name='reference'
              required
            />
            <label className={styles.label}>Motivo de consulta</label>
            <textarea
              className={styles.input}
              placeholder="Especifique el motivo de la consulta"
              rows="4"
              name="reason"
              required
              onChange={handleChangeEmergencyDoctorPresencial}

            ></textarea>
            <button type="submit" className={styles.button}>
              Solicitar atención
            </button>
          </form>
        </div>
      ) : null}

      {formType === "teleconsulta" && selectedService === "Pediatra de urgencias" ? (


        <div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
          <h2 className={styles.title}>
            DATOS DEL PACIENTE
          </h2>
          <form className={styles.form} onSubmit={handleSubmitEmergencyPediatricianTleconsulta}>
            <label className={styles.label}> Apellidos y nombres</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ingrese sus nombres"
              onChange={handleChangeEmergencyPediatricianTleconsulta}
              name='name_complete'
              required
            />

            <label className={styles.label}>Edad</label>
            <input
              type="number"
              className={styles.input}
              placeholder="Edad"
              onChange={handleChangeEmergencyPediatricianTleconsulta}
              name='age'
              required
            />

            <label className={styles.label}>Género</label>
            <select name="gender" className={styles.input}
              onChange={handleChangeEmergencyPediatricianTleconsulta}
              required
            >
              <option value="">Selecionar género</option>
              <option value="masculino">Masculino </option>
              <option value="femenino">Femenino</option>
              <option value="prefiero no contestar">Prefiero no contestar</option>

            </select>

            <label className={styles.label}>Telefóno</label>
            <input
              type="tel"
              className={styles.input}
              placeholder="Ingrese su teléfono"
              onChange={handleChangeEmergencyPediatricianTleconsulta}
              name='phone'
              required
            />
            <label className={styles.label}>Motivo de la consulta</label>
            <textarea
              className={styles.input}
              placeholder="Especifique el motivo de la consulta"
              rows="4"
              name="reason"
              onChange={handleChangeEmergencyPediatricianTleconsulta}
              required
            ></textarea>
            <button type="submit" className={styles.button}>
              Solicitar atención
            </button>
          </form>
        </div>
      ) : null}



      {formType === "domicilio" && selectedService === "Pediatra de urgencias" ? (


        <div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
          <h2 className={styles.title}>
            Datos del paciente
          </h2>
          <form className={styles.form} onSubmit={handleSubmitEmergencyPediatricianDomicilio}>
            <label className={styles.label}> Apellido y nombres</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ingrese sus nombres"
              onChange={handleChangeEmergencyPediatricianDomicilio}
              name='name_complete'
              required
            />

            <label className={styles.label}>Edad</label>
            <input
              type="number"
              className={styles.input}
              placeholder="Ingrese su correo electrónico"
              onChange={handleChangeEmergencyPediatricianDomicilio}
              name='age'
              required
            />

            <label className={styles.label}>Género</label>

            <select id="" className={styles.input}
              onChange={handleChangeEmergencyPediatricianDomicilio}
              name='gender'
              required

            >
              <option value="">Selecionar género</option>
              <option value="masculino">Masculino </option>
              <option value="femenino">Femenino</option>
              <option value="prefiero no contestar">Prefiero no contestar</option>

            </select>

            <label className={styles.label}>Telefóno</label>
            <input
              type="tel"
              className={styles.input}
              placeholder="Ingrese su teléfono"
              onChange={handleChangeEmergencyPediatricianDomicilio}
              name='phone'
              required
            />


            <label className={styles.label}>Dirección</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ingrese su dirección"
              onChange={handleChangeEmergencyPediatricianDomicilio}
              name='address'
              required
            />


            <label className={styles.label}>Referencia</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ingrese su referencia"
              onChange={handleChangeEmergencyPediatricianDomicilio}
              name='reference'
              required

            />
            <label className={styles.label}>Motivo de la consulta</label>
            <textarea
              className={styles.input}
              placeholder="Especifique el motivo de la consulta"
              rows="4"
              name="reason"
              onChange={handleChangeEmergencyPediatricianDomicilio}
              required
            ></textarea>
            <button type="submit" className={styles.button}>
              Solicitar atención
            </button>
          </form>
        </div>
      ) : null}













      {formType === "teleconsulta" && selectedService === "Odontólogo de urgencias" ? (


        <div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
          <h2 className={styles.title}>
            Datos del paciente
          </h2>
          <form className={styles.form} onSubmit={handleSubmitEmergencyDentistryTeleconsulta}>
            <label className={styles.label}> Apellidos y nombres</label>
            <input
              type="text"
              name='name_complete'
              className={styles.input}
              placeholder="Ingrese sus nombres"
              required
              onChange={handleChangeEmergencyDentistryTeleconsulta}
            />

            <label className={styles.label}>Edad</label>
            <input
              name='age'
              onChange={handleChangeEmergencyDentistryTeleconsulta}
              required

              type="number"
              className={styles.input}
              placeholder="Edad"
            />

            <label className={styles.label}>Género</label>
            <select name="gender" id="" className={styles.input}
              onChange={handleChangeEmergencyDentistryTeleconsulta}
              required

            >
              <option value="">Selecionar género</option>
              <option value="Masculino">Masculino </option>
              <option value="Femenino">Femenino</option>
              <option value="prefiero no contestar">Prefiero no contestar</option>

            </select>

            <label className={styles.label}>Telefóno</label>
            <input
              type="tel"
              name="phone"
              onChange={handleChangeEmergencyDentistryTeleconsulta}
              required

              className={styles.input}
              placeholder="Ingrese su teléfono"
            />

            <label className={styles.label}>Dentadura</label>
            <select name="Teeth"
              onChange={handleChangeEmergencyDentistryTeleconsulta}
              required

              id="" className={styles.input}>
              <option value="">Selecionar dentadura</option>
              <option value="Natural">Natural </option>
              <option value="Postiza">Postiza</option>

            </select>
            <label className={styles.label}>Motivo de la consulta</label>
            <textarea
              className={styles.input}
              placeholder="Especifique el motivo de la consulta"
              rows="4"
              onChange={handleChangeEmergencyDentistryTeleconsulta}
              name="reason"
              required
            ></textarea>
            <button type="submit" className={styles.button}>
              Solicitar atención
            </button>
          </form>
        </div>
      ) : null}



      {formType === "domicilio" && selectedService === "Odontólogo de urgencias" ? (


        <div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
          <h2 className={styles.title}>
            Datos del paciente
          </h2>
          <form className={styles.form} onSubmit={handleSubmitEmergencyDentistryPresencial}>
            <label className={styles.label}> Apellidos y nombres</label>
            <input
              type="text"
              name='name_complete'
              className={styles.input}
              placeholder="Ingrese sus nombres"
              onChange={handleChangeEmergencyDentistryPresencial}
              required

            />

            <label className={styles.label}>Edad</label>
            <input
              type="number"
              className={styles.input}
              placeholder="Edad"
              name='age'
              onChange={handleChangeEmergencyDentistryPresencial}
              required

            />

            <label className={styles.label}>Género</label>
            <select name="gender" className={styles.input}
              onChange={handleChangeEmergencyDentistryPresencial}
              required

            >
              <option value="">Selecionar género</option>
              <option value="masculino">Masculino </option>
              <option value="femenino">Femenino</option>
              <option value="prefiero no contestar">Prefiero no contestar</option>

            </select>

            <label className={styles.label}>Telefóno</label>
            <input
              onChange={handleChangeEmergencyDentistryPresencial}
              name='phone'
              type="tel"
              className={styles.input}
              placeholder="Ingrese su teléfono"
              required

            />


            <label className={styles.label}>Dirección</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ingrese su dirección"
              onChange={handleChangeEmergencyDentistryPresencial}
              name='address'
              required

            />


            <label className={styles.label}>Referencia</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ingrese su referencia"
              onChange={handleChangeEmergencyDentistryPresencial}
              name='reference'

              required

            />

            <label className={styles.label}>Dentadura</label>
            <select name="teeth" id="" className={styles.input}
              onChange={handleChangeEmergencyDentistryPresencial}
              required

            >
              <option value="">Selecionar dentadura</option>
              <option value="Natural">Natural </option>
              <option value="Postiza">Postiza</option>

            </select>
            <label className={styles.label}>Motivo de la consulta</label>
            <textarea
              className={styles.input}
              placeholder="Especifique el motivo de la consulta"
              rows="4"
              name="reason"
              required
              onChange={handleChangeEmergencyDentistryPresencial}

            ></textarea>
            <button type="submit" className={styles.button}>
              Solicitar atención
            </button>
          </form>
        </div>
      ) : null}



      {selectedService === "Diagnóstico por imágen" ? (


        <div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
          <h2 className={styles.title}>
            Datos del paciente
          </h2>
          <form className={styles.form} onSubmit={handleSubmitDiagnosticImaging}>
            <label className={styles.label}> Apellidos y nombres</label>
            <input
              type="text"
              className={styles.input}
              name='name_complete'
              placeholder="Ingrese sus nombres"
              onChange={handleChangeDiagnosticImaging}
              required
            />

            <label className={styles.label}>DNI</label>
            <input
              type="number"
              className={styles.input}
              placeholder="DNI"
              name='dni'
              onChange={handleChangeDiagnosticImaging}
              required
            />



            <label className={styles.label}>Fecha de nacimiento</label>
            <input
              type="date"
              className={styles.input}
              placeholder="Fecha de nacimiento"
              onChange={handleChangeDiagnosticImaging}
              name='date'
              required
            />


            <label className={styles.label}>Telefóno</label>
            <input
              type="Tel"
              className={styles.input}
              placeholder="Telefóno"
              onChange={handleChangeDiagnosticImaging}
              name='phone'
              required
            />

            <label className={styles.label}>Examen que solicita</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Examen que solicita"
              onChange={handleChangeDiagnosticImaging}
              name='exam_you_request'
              required
            />


            <label className={styles.label}>Enfermedades Pre existentes</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Enfermedades Pre existentes"
              name='pre_existing_diseases'
              onChange={handleChangeDiagnosticImaging}

              required
            />

            <label className={styles.label}>Alergias</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Síntomas"
              onChange={handleChangeDiagnosticImaging}
              name='allergies'
              required
            />
            <label className={styles.label}>Observaciones </label>
            <textarea
              className={styles.input}
              placeholder="Observaciones"
              rows="4"
              onChange={handleChangeDiagnosticImaging}
              name='reason'
              required
            ></textarea>
            <button type="submit" className={styles.button}>
              Solicitar atención
            </button>
          </form>
        </div>
      ) : null}



      {selectedService === "Tópico de enfermería" ? (


        <div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
          <h2 className={styles.title}>
            Datos del paciente
          </h2>
          <form className={styles.form} onSubmit={handleSubmitNursingTheme}>
            <label className={styles.label}> Apellidos y nombres</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ingrese sus nombres"
              name='name_complete'
              onChange={handleChangeNursingTheme}
              required

            />

            <label className={styles.label}>Edad</label>
            <input
              type="number"
              className={styles.input}
              placeholder="Edad"
              onChange={handleChangeNursingTheme}
              name='age'
              required

            />

            <label className={styles.label}>Género</label>
            <select name="gender" id="" className={styles.input}
              onChange={handleChangeNursingTheme}
              required

            >
              <option value="">Selecionar género</option>
              <option value="masculino">Masculino </option>
              <option value="femenino">Femenino</option>
              <option value="prefiero no contestar">Prefiero no contestar</option>


            </select>
            <label className={styles.label}>Telefóno</label>

            <input
              type="tel"
              className={styles.input}
              placeholder="Ingrese su teléfono"
              onChange={handleChangeNursingTheme}
              name='phone'
              required

            />


            <label className={styles.label}>Dirección</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ingrese su dirección"
              onChange={handleChangeNursingTheme}
              name='address'
              required

            />


            <label className={styles.label}>Referencia</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ingrese su referencia"
              onChange={handleChangeNursingTheme}
              name='reference'
              required

            />

            <label className={styles.label}>Emfermedades pre existentes</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Emfermedades pre existentes"
              onChange={handleChangeNursingTheme}
              name='pre_existing_diseases'
              required

            />
            <label className={styles.label}>Observaciones adicionale</label>
            <textarea
              className={styles.input}
              placeholder="Observaciones adicionales"
              rows="4"
              name="reason"
              required
              onChange={handleChangeNursingTheme}

            ></textarea>
            <button type="submit" className={styles.button}>
              Solicitar atención
            </button>
          </form>
        </div>
      ) : null}



      {selectedService === "Ambulancia" ? (


        <div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
          <h2 className={styles.title}>
            Datos del paciente
          </h2>
          <form className={styles.form} onSubmit={handleSubmitAmbulancia}>
            <label className={styles.label}> Apellidos y nombres</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ingrese sus nombres"
              onChange={handleChangeAmbulancia}
              name='name_complete'
              required
            />

            <label className={styles.label}>Edad</label>
            <input
              type="number"
              className={styles.input}
              placeholder="Edad"
              onChange={handleChangeAmbulancia}
              name='age'
              required
            />



            <label className={styles.label}>Telefóno</label>
            <input
              type="tel"
              className={styles.input}
              placeholder="Ingrese su teléfono"
              onChange={handleChangeAmbulancia}
              name='phone'
              required
            />


            <label className={styles.label}>Dirección de recojo</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Dirección de recojo"
              onChange={handleChangeAmbulancia}
              name='pick_up_address'
              required
            />

            <label className={styles.label}>Dirección de destino</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Dirección de destino"
              onChange={handleChangeAmbulancia}
              name='destination_address'
              required
            />


            <label className={styles.label}>Motivo de traslado</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Motivo de traslado"
              onChange={handleChangeAmbulancia}
              name='reason_for_transfer'
              required
            />

            <label className={styles.label}>Síntomas</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Síntomas"
              onChange={handleChangeAmbulancia}
              name='symptoms'
              required
            />
            <label className={styles.label}>Observaciones </label>
            <textarea
              className={styles.input}
              placeholder="Observaciones"
              rows="4"
              onChange={handleChangeAmbulancia}
              name='reason'
              required
            ></textarea>
            <button type="submit" className={styles.button}>
              Solicitar atención
            </button>
          </form>
        </div>
      ) : null}


      {selectedService === "Centro de vacunación" ? (


        <div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
          <h2 className={styles.title}>
            Datos del paciente
          </h2>
          <form className={styles.form} onSubmit={handleSubmitVaccinationCenter}>
            <label className={styles.label}> Apellidos y nombres</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ingrese sus nombres"
              onChange={handleChangeVaccinationCenter}
              name='name_complete'
              required

            />

            <label className={styles.label}>DNI</label>
            <input
              type="number"
              className={styles.input}
              placeholder="DNI"
              onChange={handleChangeVaccinationCenter}
              name='dni'
              required
            />



            <label className={styles.label}>Fecha de nacimiento</label>
            <input
              type="date"
              className={styles.input}
              placeholder="Fecha de nacimiento"
              onChange={handleChangeVaccinationCenter}
              name='date'
              required
            />


            <label className={styles.label}>Telefóno</label>
            <input
              type="Tel"
              className={styles.input}
              placeholder="Telefóno"
              onChange={handleChangeVaccinationCenter}
              name='phone'
              required
            />

            <label className={styles.label}>Vacuna que solicita</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Vacuna que solicita"
              onChange={handleChangeVaccinationCenter}
              name='vaccine_you_request'
              required
            />


            <label className={styles.label}>Enfermedades Pre existentes</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Enfermedades Pre existentes"
              onChange={handleChangeVaccinationCenter}
              name='pre_existing_diseases'
              required
            />

            <label className={styles.label}>Alergias</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Síntomas"
              onChange={handleChangeVaccinationCenter}
              name='allergies'
              required
            />
            <label className={styles.label}>Observaciones </label>
            <textarea
              className={styles.input}
              placeholder="Observaciones"
              rows="4"
              onChange={handleChangeVaccinationCenter}
              name='reason'
              required
            ></textarea>
            <button type="submit" className={styles.button}>
              Solicitar atención
            </button>
          </form>
        </div>
      ) : null}




      {selectedService === "Laboratorio clínico" && formType === "establecimiento" ? (


        <div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
          <h2 className={styles.title}>
            Datos del paciente
          </h2>
          <form className={styles.form} onSubmit={handleSubmitClinicalLaboratoryEstablecimiento}>
            <label className={styles.label}> Apellidos y nombres</label>
            <input
              type="text"
              className={styles.input}
              name='name_complete'
              placeholder="Ingrese sus nombres"
              onChange={handleChangeClinicalLaboratoryEstablecimiento}
              required
            />

            <label className={styles.label}>DNI</label>
            <input
              type="number"
              className={styles.input}
              placeholder="DNI"
              name='dni'
              onChange={handleChangeClinicalLaboratoryEstablecimiento}
              required
            />



            <label className={styles.label}>Fecha de nacimiento</label>
            <input
              type="date"
              className={styles.input}
              placeholder="Fecha de nacimiento"
              onChange={handleChangeClinicalLaboratoryEstablecimiento}
              name='date'
              required
            />


            <label className={styles.label}>Telefóno</label>
            <input
              type="Tel"
              className={styles.input}
              placeholder="Telefóno"
              onChange={handleChangeClinicalLaboratoryEstablecimiento}
              name='phone'
              required
            />

            <label className={styles.label}>Examen que solicita</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Examen que solicita"
              onChange={handleChangeClinicalLaboratoryEstablecimiento}
              name='exam_you_request'
              required
            />


            <label className={styles.label}>Enfermedades Pre existentes</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Enfermedades Pre existentes"
              name='pre_existing_diseases'
              onChange={handleChangeClinicalLaboratoryEstablecimiento}

              required
            />

            <label className={styles.label}>Alergias</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Síntomas"
              onChange={handleChangeClinicalLaboratoryEstablecimiento}
              name='allergies'
              required
            />
            <label className={styles.label}>Observaciones </label>
            <textarea
              className={styles.input}
              placeholder="Observaciones"
              rows="4"
              onChange={handleChangeClinicalLaboratoryEstablecimiento}
              name='reason'
              required
            ></textarea>
            <button type="submit" className={styles.button}>
              Solicitar atención
            </button>
          </form>
        </div>
      ) : null}



      {selectedService === "Laboratorio clínico" && formType === "domicilio" ? (


        <div id="formAditional" className={styles.formContainer} style={{ marginTop: '20px' }}>
          <h2 className={styles.title}>
            Datos del paciente
          </h2>
          <form className={styles.form} onSubmit={handleSubmitClinicalLaboratoryDomicilio}>
            <label className={styles.label}> Apellidos y nombres</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ingrese sus nombres"
              onChange={handleChangeClinicalLaboratoryDomicilio}
              required
              name='name_complete'
            />

            <label className={styles.label}>DNI</label>
            <input
              type="number"
              className={styles.input}
              placeholder="DNI"
              onChange={handleChangeClinicalLaboratoryDomicilio}
              name='dni'
              required
            />



            <label className={styles.label}>Fecha de nacimiento</label>
            <input
              type="date"
              className={styles.input}
              placeholder="Fecha de nacimiento"
              onChange={handleChangeClinicalLaboratoryDomicilio}
              name='date'
              required
            />


            <label className={styles.label}>Telefóno</label>
            <input
              type="Tel"
              className={styles.input}
              placeholder="Telefóno"
              onChange={handleChangeClinicalLaboratoryDomicilio}
              name='phone'
              required
            />

            <label className={styles.label}>Dirección</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Dirección"
              onChange={handleChangeClinicalLaboratoryDomicilio}
              name='address'
              required
            />
            <label className={styles.label}>Referencia</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Referencia"
              onChange={handleChangeClinicalLaboratoryDomicilio}
              name='reference'
              required
            />



            <label className={styles.label}>Enfermedades Pre existentes</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Enfermedades Pre existentes"
              onChange={handleChangeClinicalLaboratoryDomicilio}
              name='pre_existing_diseases'
              required
            />

            <label className={styles.label}>Alergias</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Síntomas"
              onChange={handleChangeClinicalLaboratoryDomicilio}
              name='allergies'
              required
            />
            <label className={styles.label}>Observaciones </label>
            <textarea
              className={styles.input}
              placeholder="Observaciones"
              rows="4"
              onChange={handleChangeClinicalLaboratoryDomicilio}
              name='reason'
              required
            ></textarea>
            <button type="submit" className={styles.button}>
              Solicitar atención
            </button>
          </form>
        </div>
      ) : null}
    </div>

  );
};

export default ServiceAditional;
