import React from "react";
import { Alert, Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterBisnessSuccess = () => {
  const navigate = useNavigate();

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
      <Alert severity="info" sx={{ fontSize: "18px", padding: "20px", mb: 3 }}>
        Espere a que verifiquemos su solicitud para poder prestar sus servicios. Esto
        puede tardar entre 24 y 48 horas. ⏳
      </Alert>
      <Stack direction="row" spacing={2}>
        <Button
          sx={{
            backgroundColor: "#53676c",
            ":hover": { backgroundColor: "#3e5852" },
            margin: "auto",
            color: "white",
          }}
          variant="contained"
          color="primary"
          onClick={handleVolverInicio}
        >
          Volver al inicio
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterBisnessSuccess;
