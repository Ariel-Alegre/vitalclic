import React from "react";
import { Alert, Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterUserSuccess = () => {
  const navigate = useNavigate();

  const handleVerReservas = () => {
    navigate("/mis-reservas"); // Ruta para ver las reservas
  };

  const handleVolverInicio = () => {
    navigate("/iniciar-sesión"); // Ruta para volver al inicio
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
      textAlign="center"
      p={2}
    >
      <Alert severity="success" sx={{ fontSize: "18px", padding: "20px", mb: 3 }}>
        Usuario creado exitosamente! 🎉
      </Alert>
      <Stack direction="row" spacing={2}>
     
        <Button 
           sx={{
            backgroundColor: "#53676c",
            ":hover": { backgroundColor: "#3e5852" },
            margin: "auto",
            color: "white"
          }}
        variant="contained" color="secondary" onClick={handleVolverInicio}>
          Iniciar sesión
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterUserSuccess;
