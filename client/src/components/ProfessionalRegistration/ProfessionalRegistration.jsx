// src/components/Form.js
import React, { useState,useRef, useEffect } from "react";
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
  OutlinedInput,
  ListItemText,Radio ,
  FormLabel, RadioGroup,
  IconButton, InputAdornment 


} from "@mui/material";
import { es } from "date-fns/locale"; // Puedes cambiar el idioma de fecha
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // Importar AdapterDateFns
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import {
  LoadScript,
  Autocomplete,
  useLoadScript,
} from "@react-google-maps/api";
const specialties = [
  "Cardiología", "Dermatología", "Gastroenterología", "Neurología",
  "Pediatría", "Psiquiatría", "Ginecología", "Oftalmología", "Ortopedia", "Urología", "Traumatólogo","Clinico"
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const API_KEY = "AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA"; // 🔹 Reemplaza con tu clave de Google Maps
const libraries = ["places"];
const ProfessionalRegistration = () => {
  const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
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
    specialty: [],
    phone: "",
    emergencyServices: "no",
    password: "",
    termsAccepted: false,
    termsAcceptedAt: null,
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

  // Autocompletado para la dirección

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
    e.preventDefault(); // Evita la recarga de la página
    
    setLoading(true); // Indica que la solicitud está en proceso
  
    try {
      // Envío de datos al backend
      await axios.post("http://localhost:3001/api/register-professional", formData);
  
      // Redirige a la página de éxito
      navigate("/registro/profesional-exitosa");
  
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
  
      // Verifica si el error es un 404 (email ya registrado)
      if (error.response?.status === 404) {
        alert("El email ya está registrado como profesional");
      }
  
    } finally {
      setLoading(false); // Se ejecuta siempre, éxito o error
    }
  };
   const school = [
    "Colegio médico del Perú",
    "Colegio de enfermeros del Perú",
    "Colegio de nutricionistas del Perú",
    "Colegio de obstetras del Perú",
    "Colegio odontológico del Perú",
    "Colegio médico veterinario del Perú",
    "Asociación de enfermeros técnicos del Perú",


   ]

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
      {" "}
      {/* Cambié a AdapterDateFns */}
      <form onSubmit={handleSubmit} style={{ padding: "2rem", marginTop: "5em" }}>
        <Typography variant="h4" gutterBottom>
          Registro de profesional
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
            <FormControl fullWidth required
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
              <InputLabel htmlFor="professional_college">Colegio profesional</InputLabel>
              <Select
                label="Colegio profesional"
                name="professional_college"
                value={formData.professional_college}
                onChange={handleChange}
                inputProps={{ id: "professional_college" }}
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
                {school.map((data) => (

                  <MenuItem value={data}>{data}</MenuItem>
                ))}
              
              </Select>
            </FormControl>
          </Grid>
        
     
          <Grid item xs={12} sm={3}>
            <TextField
              label="Número de colegio profesional"
              name="registration_number"
              value={formData.registration_number}
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
          {formData.professional_college === "Colegio médico del Perú"  ? (
          <>

          <Grid item xs={12} sm={3}>
            <FormControl       sx={{
              width: "100%",
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
              }}>
        <InputLabel id="specialties-select-label">Especialidades</InputLabel>
        <Select
          labelId="specialties-select-label"
          id="specialties-select"
          multiple
          name="specialty"
         value={formData.specialty} 
          onChange={handleChange}
          input={<OutlinedInput label="Especialidades" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
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
          {specialties.map((specialty) => (
            <MenuItem key={specialty} value={specialty}>
              <Checkbox checked={formData.specialty.includes(specialty)}  />
              <ListItemText primary={specialty} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Número de especialidad RNE"
              name="specialty_number_rne"
              value={formData.specialty_number_rne}
              onChange={handleChange}
              fullWidth
              required
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
          </>
          ): null}

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth required
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
  <DatePicker
    label="Fecha de nacimiento"
    value={formData.birthdate}
    onChange={handleDateChange}
    renderInput={(params) => (
      <TextField
        {...params}
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
              label="Teléfono"
              name="phone"
              type="tel"
              required
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
          {formData.professional_college === "Colegio médico del Perú" || formData.professional_college === "Colegio de enfermeros del Perú" || formData.professional_college === "Colegio odontológico del Perú"  ? (

          <Grid item xs={12}>
  <FormControl component="fieldset"
  >
    <span>¿Deseas atender consultas de urgencias de manera virtuales y a domicilio?(La solicitud te llegara por WhatsApp)</span>
    <RadioGroup
      row
      name="emergencyServices"
      value={formData.emergencyServices}
      onChange={(e) => setFormData({ ...formData, emergencyServices: e.target.value })}
    >
      <FormControlLabel value="sí" control={<Radio sx={{ '&.Mui-checked': { color: '#53676c' } }} />}  label="Sí" />
      <FormControlLabel value="no" control={<Radio sx={{ '&.Mui-checked': { color: '#53676c' } }} />} label="No" />
    </RadioGroup>
  </FormControl>
  
</Grid>
          ): null }

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.termsAccepted}
                  onChange={handleCheckboxChange}
                  required
                  sx={{ '&.Mui-checked': { color: '#53676c' } }}
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
