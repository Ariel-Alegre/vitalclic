import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // Importa tanto el proveedor como el login

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorGoogle, setErrorGoogle] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('https://vitalclic-production.up.railway.app/api/login', formData);
      localStorage.setItem('token', response.data.token);

      navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError("El usuario está en pendiente");
      } else if (err.response && err.response.status === 404) {
        setError("Usuario no encontrado");
      } else {
        setError("Ocurrió un error inesperado");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleLoginSuccess = async (response) => {
    try {
      // Llamamos a la acción redux para manejar el login
      const data = await axios.post('https://en-una-production.up.railway.app/api/auth/google', {
        token: response.credential, // Token JWT de Google
      });

      if (data) {
        console.log("Login exitoso:", data);
        navigate("/");
      } else {
        setErrorGoogle("Error al autenticar el usuario");
      }
    } catch (error) {
      setErrorGoogle("Error al autenticar el usuario");
      console.error("Login failed:", error);
    }
  };

  const handleLoginError = (error) => {
    setErrorGoogle("Error en la autenticación");
    console.error(error);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Box
        component="img"
        src={require("../../assets/Images/logo.png")}
        alt="Logo"
        sx={{
          width: 200,
          mx: 'auto',
          mb: 2,
          backgroundColor: "#53676c",
          p: 2,
          marginTop: "3em",
          borderRadius: "5px",
        }}
      />
      <Typography variant="h5" align="center" gutterBottom>
        Iniciar Sesión
      </Typography>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <TextField
        label="Correo Electrónico"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#53676c",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#53676c",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#000",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#53676c",
          },
        }}
      />
      <TextField
        label="Contraseña"
        name="password"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange}
        required
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#53676c",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#53676c",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#000",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#53676c",
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading}
        sx={{ backgroundColor: "#53676c", ":hover": { backgroundColor: "#69848BFF" } }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Ingresar'}
      </Button>

      <div >

<GoogleOAuthProvider clientId="962025699097-20o18d8bj0tf8gj0qj3q96acrmvtr720.apps.googleusercontent.com" >
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={handleLoginError}
      styles={{width: "100%"}}
      />
</GoogleOAuthProvider>
      </div>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        ¿No tienes una cuenta?{' '}
        <Link to="/registrar-usuario" style={{ color: '#53676c', textDecoration: 'none', fontWeight: 'bold' }}>
          Regístrate aquí
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
