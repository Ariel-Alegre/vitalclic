/* 

import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Grid } from '@mui/material';
import styles from '../../styles/Home/ServiceAditional.module.css';

const ServiceAditional = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const servicios = [
    'MEDICO DE URGENCIAS',
    'ODONTOLOGÍA DE URGENCIAS',
    'TOPICO DE ENFERMERÍA',
    'LABORATORIO CLÍNICO',
    'DIAGNOSTICO POR IMÁGENES',
    'AMBULANCIA',
    'CENTRO DE VACUNACIÓN',
    'PEDIATRA DE URGENCIAS',
  ];

  const handleServiceClick = (servicio) => {
    setSelectedService(servicio);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedService(null);
  };

  return (
    <div className={styles.serviciosContainer}>
      <h2 className={styles.titulo}>SERVICIOS ADICIONALES</h2>
      <Grid container spacing={2}>
        {servicios.map((servicio, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              onClick={() => handleServiceClick(servicio)}
            >
              {servicio}
            </Button>
          </Grid>
        ))}
      </Grid>

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
            width: 400,
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
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => {
                alert(`Teleconsulta seleccionada para ${selectedService}`);
                closeModal();
              }}
            >
              Teleconsulta
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={() => {
                alert(`Médico a domicilio seleccionado para ${selectedService}`);
                closeModal();
              }}
            >
              Médico a domicilio
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ServiceAditional;

*/