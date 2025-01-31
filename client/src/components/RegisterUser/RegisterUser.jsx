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
import { registerLocale } from "react-datepicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // Importar AdapterDateFns
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import styles from "../../styles/RegisterUser/RegisterUser.module.css";
import { format, isValid, parse } from "date-fns"; // Importa la función format, isValid y parse
import { Link, useNavigate } from "react-router-dom";
registerLocale("es", es);

const adapter = new AdapterDateFns({
  locale: es,
  formats: {
    normalDate: "dd/MM/yyyy", // Formato día/mes/año
  },
});
const RegisterUser = () => {
  const navigate =useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    genre: "",
    birthdate: null,
    email: "",
    country: "",
    province: "",
    district: "",
    department:"",
    dni:"",

    phone: "",
    password: "",
    termsAccepted: false,
    termsAcceptedAt: null,
    dependents: [], // Cada dependiente será un objeto separado
  });
  
  const [loading, setLoading] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  
  // Cerrar alerta de error
  const handleCloseAlertError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertError(false);
  };
  
  // Actualizar valores principales del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Manejar cambio de términos
  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: e.target.checked,
      termsAcceptedAt: e.target.checked ? new Date() : null,
    }));
  };
  
  // Manejar cambio de fecha
  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, birthdate: date }));
  };
  
  // Función para agregar un nuevo dependiente
  const addDependent = () => {
    // Crear un nuevo dependiente vacío
    const newDependent = {
      name: "",
      lastName: "",
      birthdate: "",
      genre: "",
      dni: "",
    };
  
    // Actualizar el estado de los dependientes
    setFormData((prev) => ({
      ...prev,
      dependents: [...prev.dependents, newDependent], // Añadir el nuevo dependiente al array
    }));
  };
  
  // Función para manejar cambios en los campos de los dependientes
  const handleDependentChange = (index, e) => {
    const { name, value } = e.target;
  
    // Copiar los dependientes actuales
    const updatedDependents = [...formData.dependents];
  
    // Actualizar el campo específico del dependiente
    updatedDependents[index] = {
      ...updatedDependents[index],
      [name]: value, // Actualizar la clave específica del objeto
    };
  
    // Actualizar el estado con los nuevos dependientes
    setFormData((prev) => ({ ...prev, dependents: updatedDependents }));
  };
  
  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Validar que `dependents` sea un array y que tenga la estructura esperada
      if (!Array.isArray(formData.dependents)) {
        throw new Error("Dependents no es un array");
      }
  
      // Enviar datos al servidor
      const response = await axios.post(
        "https://vitalclic-production.up.railway.app/api/register-user",
        formData
      );
  
      console.log("Datos enviados correctamente:", formData);
      setAlertMessage("¡Dependientes registrados con éxito!");
      setOpenAlertError(true);
    } catch (error) {
      console.error("Error al enviar:", error.message);
      setAlertMessage("Hubo un error al registrar los dependientes.");
      setOpenAlertError(true);
    } finally {
      setLoading(false);
      navigate("/registrado-exitosamente")
    }
  };
  
  return (
    <div className={styles.RegisterContainer}>
      <form
        onSubmit={handleSubmit}
        style={{ padding: "2rem", marginTop: "5em" }}
      >
        <Typography variant="h4" gutterBottom>
          Registro de usuario
        </Typography>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
            <TextField
              label="DNI"
              name="dni"
              value={formData.dni}
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
            <FormControl
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
            >
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
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
            >
              <DatePicker
                label="Fecha de Nacimiento"
                value={formData.birthdate}
                onChange={handleDateChange}
                format="dd/MM/yyyy" // Configura el formato de fecha
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
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Email"
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

          {/* Botón para agregar dependientes */}
          <Grid item xs={12}>
            <Button onClick={addDependent} variant="outlined" color="primary">
              Agregar Dependiente
            </Button>
          </Grid>

          {/* Formulario para dependientes */}
          {Object.entries(formData.dependents).map((dependent, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label={`Nombre Dependiente ${index + 1}`}
                  name="name"
                  value={formData.dependents[index].name}
                  onChange={(e) => handleDependentChange(index, e)}
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
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  label={`Apellido Dependiente ${index + 1}`}
                  name="lastName"
                  value={formData.dependents[index].lastName}
                  onChange={(e) => handleDependentChange(index, e)}
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
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label={`Fecha de Nacimiento Dependiente ${index + 1}`}
                    value={formData.dependents[index].birthdate}
                    onChange={(date) =>
                      handleDependentChange(index, {
                        target: { name: "birthdate", value: date },
                      })
                    }
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
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={3}>
                <FormControl
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
                >
                  <InputLabel>Género Dependiente {index + 1}</InputLabel>
                  <Select
                    label={`Género Dependiente ${index + 1}`}
                    name="genre"
                    value={formData.dependents[index].genre}
                    onChange={(e) => handleDependentChange(index, e)}
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
                    fullWidth
                  >
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Femenino">Femenino</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  label={`Documento de identidad ${index + 1}`}
                  name="dni"
                  value={formData.dependents[index].dni}
                  onChange={(e) => handleDependentChange(index, e)}
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
                    marginBottom: "2em",
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}></Grid>
            </React.Fragment>
          ))}
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
                height: 40,
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
        </Grid>
      </form>

      <Snackbar
        open={openAlertError}
        autoHideDuration={6000}
        onClose={handleCloseAlertError}
      >
        <Alert
          onClose={handleCloseAlertError}
          severity={loading ? "info" : "error"}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterUser;
