import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function OptionProfessional() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        px: 2, // Padding lateral para pantallas pequeñas
      }}
    >
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1976d2' }}
        >
          Elija una opción
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Seleccione una de las siguientes opciones para continuar
        </Typography>

        <Box   sx={{display: "flex", flexWrap: "wrap", gap: "2em", justifyContent: "center"}}>
            <Link to= "/administrar/profesionales">
          <Button variant="contained" color="primary" size="large">
            Profesionales
          </Button>
            </Link>


            
            <Link to= "/administrar/consultas/pendientes">

          <Button variant="contained" color="secondary" size="large">
            Consultas pendientes
          </Button>
          </Link>
          
          <Link to= "/administrar/consultas/aceptadas">

          <Button variant="contained" color="success" size="large">
            Consultas finalizadas
          </Button>
          </Link>

        </Box>
      </Box>
    </Box>
  );
}
