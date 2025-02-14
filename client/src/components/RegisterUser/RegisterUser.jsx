// src/components/Form.js
import React, { useState, useRef, useEffect } from "react";

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
  IconButton, InputAdornment 
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
import { Link, useNavigate } from "react-router-dom";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  LoadScript,
  Autocomplete,
  useLoadScript,
} from "@react-google-maps/api";
registerLocale("es", es);

const API_KEY = "AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA"; // 🔹 Reemplaza con tu clave de Google Maps
const libraries = ["places"];
const RegisterUser = () => {
  const navigate =useNavigate()
  const [showPassword, setShowPassword] = useState(false);

const handleClickShowPassword = () => {
  setShowPassword(!showPassword);
};

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
    address:"",

    
    phone: "",
    password: "",
    termsAccepted: false,
    termsAcceptedAt: null,
    dependents: [], // Cada dependiente será un objeto separado
  });
    const inputRefAddress = useRef(null);
    const inputRefProvince = useRef(null);
    const inputRefDistrict = useRef(null);
    const inputRefDepartment = useRef(null);
    const autocompleteRef = useRef(null);
  
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: API_KEY,
      libraries,
    });


     useEffect(() => {
        if (isLoaded && inputRefAddress.current) {
          const autoCompleteInstance = new window.google.maps.places.Autocomplete(
            inputRefAddress.current,
            {
              types: ["address"],
              componentRestrictions: { country: "PE" },
            }
          );
    
          autoCompleteInstance.addListener("place_changed", () => {
            const place = autoCompleteInstance.getPlace();
            if (place.formatted_address) {
              setFormData((prev) => ({
                ...prev,
                address: place.formatted_address,
              }));
            }
          });
    
          return () => {
            window.google.maps.event.clearInstanceListeners(autoCompleteInstance);
          };
        }
      }, [isLoaded]);
    
      // Autocompletado para el departamento
      useEffect(() => {
        if (isLoaded && inputRefDepartment.current) {
          const autoCompleteInstance = new window.google.maps.places.Autocomplete(
            inputRefDepartment.current,
            {
              types: ["(regions)"],
              componentRestrictions: { country: "PE" },
            }
          );
    
          autoCompleteInstance.addListener("place_changed", () => {
            const place = autoCompleteInstance.getPlace();
            if (place.address_components) {
              const department = place.address_components.find((comp) =>
                comp.types.includes("administrative_area_level_1")
              )?.long_name;
    
              if (department) {
                setFormData((prev) => ({
                  ...prev,
                  department,
                }));
              }
            }
          });
    
          return () => {
            window.google.maps.event.clearInstanceListeners(autoCompleteInstance);
          };
        }
      }, [isLoaded]);
    
      // Autocompletado para la provincia
      useEffect(() => {
        if (isLoaded && inputRefProvince.current) {
          const autoCompleteInstance = new window.google.maps.places.Autocomplete(
            inputRefProvince.current,
            {
              types: ["(regions)"],
              componentRestrictions: { country: "PE" },
            }
          );
    
          autoCompleteInstance.addListener("place_changed", () => {
            const place = autoCompleteInstance.getPlace();
            if (place.address_components) {
              const province = place.address_components.find((comp) =>
                comp.types.includes("administrative_area_level_1")
              )?.long_name;
    
              if (province) {
                setFormData((prev) => ({
                  ...prev,
                  province,
                }));
              }
            }
          });
    
          return () => {
            window.google.maps.event.clearInstanceListeners(autoCompleteInstance);
          };
        }
      }, [isLoaded]);
    
      // Autocompletado para el distrito
      useEffect(() => {
        if (isLoaded && inputRefDistrict.current) {
          const autoCompleteInstance = new window.google.maps.places.Autocomplete(
            inputRefDistrict.current,
            {
              types: ["(regions)"],
              componentRestrictions: { country: "PE" },
            }
          );
    
          autoCompleteInstance.addListener("place_changed", () => {
            const place = autoCompleteInstance.getPlace();
            if (place.address_components) {
              const district = place.address_components.find((comp) =>
                comp.types.includes("sublocality_level_1")
              )?.long_name;
    
              if (district) {
                setFormData((prev) => ({
                  ...prev,
                  district,
                }));
              }
            }
          });
    
          return () => {
            window.google.maps.event.clearInstanceListeners(autoCompleteInstance);
          };
        }
      }, [isLoaded]);
    
      // Autocompletado general (país)
      const onLoad = (autocomplete) => {
        autocompleteRef.current = autocomplete;
        autocomplete.setTypes(["(regions)"]);
        autocomplete.setComponentRestrictions({ country: [] });
      };
    
      const onPlaceChanged = () => {
        if (autocompleteRef.current) {
          const place = autocompleteRef.current.getPlace();
          if (place && place.address_components) {
            const country = place.address_components.find((comp) =>
              comp.types.includes("country")
            );
            if (country) {
              setFormData((prevState) => ({
                ...prevState,
                country: country.long_name,
              }));
            }
          }
        }
      };
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
              required
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
              required
              value={formData.name}
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
            >
              <InputLabel htmlFor="genre">Género</InputLabel>
              <Select
              required
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

          <Grid item xs={12} sm={3} >
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
              
            >
              <DatePicker
                label="Fecha de nacimiento"
                value={formData.birthdate}
                
                onChange={handleDateChange}
                format="dd/MM/yyyy" // Usa 'MM' en mayúsculas para el mes
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#53676c", // Cambia el borde al pasar el mouse
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#53676c", // Cambia el borde cuando está enfocado
                        },
                        "&.Mui-error fieldset": {
                          borderColor: "#53676c !important", // Evita el borde rojo en caso de error
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#000", // Color del label por defecto
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#53676c", // Color del label cuando está enfocado
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
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
              label="Teléfono"
              name="phone"
              type="tel"
              value={formData.phone}
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
         <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
                    <Grid item xs={12} sm={3}>
                      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <TextField
                          label="País"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          autoComplete="none"
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
                      </Autocomplete>
                    </Grid>
                  </LoadScript>
        
     <Grid item xs={12} sm={3}>
               <TextField
                 label="Departamento"
                 name="department"
           inputRef={inputRefDepartment} // Utilizamos el ref para manejar el autocompletado
   
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
                    inputRef={inputRefProvince} // 🔹 Se corrigió la prop incorrecta
                    label="Provincia"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    fullWidth
                    autoComplete="off"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#53676c" },
                        "&.Mui-focused fieldset": { borderColor: "#53676c" },
                      },
                      "& .MuiInputLabel-root": { color: "#000" },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#53676c" },
                    }}
                  />
                </Grid>

       
          <Grid item xs={12} sm={3}>
                   <TextField
               inputRef={inputRefDistrict} // Utilizamos el ref para manejar el autocompletado
       
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
                inputRef={inputRefAddress} // Usamos el ref para el autocompletado
        
                      label="Dirección"
                      name="address"
                      value={formData.address}
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
    type={showPassword ? "text" : "password"}
    value={formData.password}
    onChange={handleChange}
    fullWidth
    autoComplete="off"
    required
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
        "&:hover fieldset": { borderColor: "#53676c" },
        "&.Mui-focused fieldset": { borderColor: "#53676c" },
      },
      "& .MuiInputLabel-root": { color: "#000" },
      "& .MuiInputLabel-root.Mui-focused": { color: "#53676c" },
    }}
  />
</Grid>;

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
                  required
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                required
                  label={`Apellidos Dependiente ${index + 1}`}
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
  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
  <DatePicker
  label={`Fecha de Nacimiento Dependiente ${index + 1}`}
  value={formData.dependents[index].birthdate}
  onChange={(date) =>
    handleDependentChange(index, {
      target: { name: "birthdate", value: date },
    })
  }
  slotProps={{
    textField: {
      fullWidth: true,
      required: true,
      sx: {
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderColor: "#53676c", // Cambia el borde al pasar el mouse
          },
          "&.Mui-focused fieldset": {
            borderColor: "#53676c", // Cambia el borde cuando está enfocado
          },
          "&.Mui-error fieldset": {
            borderColor: "#53676c !important", // Evita el borde rojo en caso de error
          },
        },
        "& .MuiInputLabel-root": {
          color: "#000", // Color del label por defecto
        },
        "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled": {
          color: "#53676c", // Cambia el color cuando está enfocado o tiene un valor
        },
      },
    },
  }}
/>

  </LocalizationProvider>
</Grid>


              <Grid item xs={12} sm={3}>
                <FormControl
                required
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
            required
              control={
                <Checkbox
                  checked={formData.termsAccepted}
                  onChange={handleCheckboxChange}
                  sx={{ '&.Mui-checked': { color: '#53676c' } }}
                  required
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
