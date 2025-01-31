// src/components/Form.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { es } from "date-fns/locale"; // Puedes cambiar el idioma de fecha
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // Importar AdapterDateFns
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Link, useNavigate } from "react-router-dom";

const ProfessionalRegistration = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    professional_college: "",
    registration_number: "",
    specialty_number_rne: "",
    genre: "",
    birthdate: null,
    email: "",
    country: "",
    province: "",
    district: "",
    specialty: "",
    phone: "",
    password: "",
    termsAccepted: false,
    termsAcceptedAt: null,
  });
  const [loading, setLoading] = useState(false);
  const [openAlertError, setOpenAlertError] = React.useState(false);

 

  const handleCloseAlertError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlertError(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "specialty") {
      // Actualizar el array de especialidades
      setFormData((prev) => ({
        ...prev,
        [name]: typeof value === "string" ? value.split(",") : value,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: e.target.checked,
      termsAcceptedAt: e.target.checked ? new Date() : null,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, birthdate: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario (recargar la página)
  setLoading(true)
    if (!formData.termsAccepted) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }
  
  
    try {
      // Envía una solicitud POST al backend
      const response = await axios.post("https://vitalclic-production.up.railway.app/api/register-professional", formData);
        console.log(response.status)
      // Maneja la respuesta si la solicitud fue exitosa
      if (response.status === 200) {
        console.log("Usuario registrado correctamente:", response.data);
        alert("Usuario registrado correctamente.");
        // Puedes redirigir al usuario a otra página si es necesario
      } else {
        // Si el servidor responde con un error, puedes mostrar un mensaje
    setOpenAlertError(true);

      }
    } catch (error) {
      // Manejo de errores en caso de que falle la solicitud
    setOpenAlertError(true);

      console.error("Error al enviar el formulario:", error);
    } finally {
  setLoading(false)
  navigate("/registro/profesional-exitosa")

    }
  };
  

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
      {" "}
      {/* Cambié a AdapterDateFns */}
      <form onSubmit={handleSubmit} style={{ padding: "2rem", marginTop: "5em" }}>
        <Typography variant="h4" gutterBottom>
          Registro de Profesional
        </Typography>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
            <TextField
              label="DNI"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde al pasar el mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde cuando el campo está enfocado
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000", // Color del label por defecto
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#53676c", // Cambia el color del label cuando está enfocado
                },
              }}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Nombres"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde al pasar el mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde cuando el campo está enfocado
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000", // Color del label por defecto
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#53676c", // Cambia el color del label cuando está enfocado
                },
              }}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Apellidos"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde al pasar el mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde cuando el campo está enfocado
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000", // Color del label por defecto
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#53676c", // Cambia el color del label cuando está enfocado
                },
              }}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Colegio profesional"
              name="professional_college"
              value={formData.professional_college}
              onChange={handleChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde al pasar el mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde cuando el campo está enfocado
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000", // Color del label por defecto
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#53676c", // Cambia el color del label cuando está enfocado
                },
              }}
              autoComplete="off"
            />
          </Grid>
     
          <Grid item xs={12} sm={3}>
            <TextField
              label="Número de colegio profesional"
              name="registration_number"
              value={formData.registration_number}
              onChange={handleChange}
              fullWidth
              autoComplete="off"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde al pasar el mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde cuando el campo está enfocado
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000", // Color del label por defecto
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#53676c", // Cambia el color del label cuando está enfocado
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Especialidad"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              fullWidth
              autoComplete="off"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde al pasar el mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde cuando el campo está enfocado
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000", // Color del label por defecto
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#53676c", // Cambia el color del label cuando está enfocado
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Número de especialidad RNE"
              name="specialty_number_rne"
              value={formData.specialty_number_rne}
              onChange={handleChange}
              fullWidth
              autoComplete={false}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde al pasar el mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde cuando el campo está enfocado
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000", // Color del label por defecto
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#53676c", // Cambia el color del label cuando está enfocado
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel htmlFor="genre">Género</InputLabel>
              <Select
                label="Género"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                inputProps={{ id: "genre" }}
                autoComplete="off"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#000", // Color del borde por defecto
                    },
                    "&:hover fieldset": {
                      borderColor: "#53676c", // Color del borde al pasar el mouse
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#53676c", // Color del borde cuando está enfocado
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#000", // Color del label por defecto
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#53676c", // Cambia el color del label cuando está enfocado
                  },
                }}
              >
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Femenino">Femenino</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <DatePicker
              label="Fecha de nacimiento"
              value={formData.birthdate}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#53676c", // Cambia el color del borde al pasar el mouse
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#53676c", // Cambia el color del borde cuando el campo está enfocado
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#000", // Color del label por defecto
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#53676c", // Cambia el color del label cuando está enfocado
                    },
                  }}
                  autoComplete="off"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Correo electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              autoComplete="off"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde al pasar el mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde cuando el campo está enfocado
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000", // Color del label por defecto
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#53676c", // Cambia el color del label cuando está enfocado
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="País"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde al pasar el mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde cuando el campo está enfocado
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000", // Color del label por defecto
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#53676c", // Cambia el color del label cuando está enfocado
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Departamento"
              name="department"
              value={formData.department}
              onChange={handleChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde al pasar el mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde cuando el campo está enfocado
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000", // Color del label por defecto
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#53676c", // Cambia el color del label cuando está enfocado
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Provincia"
              name="province"
              value={formData.province}
              onChange={handleChange}
              fullWidth
              autoComplete="off"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde al pasar el mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde cuando el campo está enfocado
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000", // Color del label por defecto
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#53676c", // Cambia el color del label cuando está enfocado
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Provincia"
              name="province"
              value={formData.province}
              onChange={handleChange}
              fullWidth
              autoComplete="off"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde al pasar el mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde cuando el campo está enfocado
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000", // Color del label por defecto
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#53676c", // Cambia el color del label cuando está enfocado
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Distrito"
              name="district"
              value={formData.district}
              onChange={handleChange}
              fullWidth
              autoComplete="off"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde al pasar el mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde cuando el campo está enfocado
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000", // Color del label por defecto
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#53676c", // Cambia el color del label cuando está enfocado
                },
              }}
            />
          </Grid>
        
          <Grid item xs={12} sm={3}>
            <TextField
              label="Teléfono"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              autoComplete="off"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde al pasar el mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde cuando el campo está enfocado
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000", // Color del label por defecto
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#53676c", // Cambia el color del label cuando está enfocado
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              autoComplete="off"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde al pasar el mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#53676c", // Cambia el color del borde cuando el campo está enfocado
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000", // Color del label por defecto
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#53676c", // Cambia el color del label cuando está enfocado
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.termsAccepted}
                  onChange={handleCheckboxChange}
                />
              }
              label="Acepto los términos y condiciones"
            />
                                     <Link to="/terminos-condiciones">términos y condiciones</Link>
            
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: 800,
                height:40,
                backgroundColor: "#53676c",
                ":hover": { backgroundColor: "#8ca7a6" },
              }}
            >

{loading ? (
                  <CircularProgress
                    size={25}
                    thickness={5}
                    sx={{ color: "#fff" }}
                  />
                ) : (
                  "Registrarse"
                )}
            </Button>
          </Grid>
          <Snackbar
          
          open={openAlertError} autoHideDuration={4000} onClose={handleCloseAlertError}>
        <Alert
          onClose={handleCloseAlertError}
          severity="error"
          variant="filled"
        >
            El profesional ya está registrado. Por favor, intente con otro correo electrónico.
        </Alert>
      </Snackbar>


        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default ProfessionalRegistration;
