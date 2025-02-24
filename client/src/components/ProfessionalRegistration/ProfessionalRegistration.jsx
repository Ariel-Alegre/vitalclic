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
  OutlinedInput,
  ListItemText, Radio,
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
const specialtiesMedica = [
  "Cardiología",
  "Dermatología",
  "Endocrinología",
  "Gastroenterología",
  "Genética",
  "Geriatría",
  "Ginecología y Obstetricia",
  "Hematología",
  "Inmunología y Alergia",
  "Medicina de Enfermedades Infecciosas y Tropicales",
  "Medicina Física y de Rehabilitación",
  "Medicina Interna",
  "Medicina Oncologica",
  "Nefrología",
  "Neonatología",
  "Neumología",
  "Neurología",
  "Pediatría",
  "Psiquiatría",
  "Reumatología",
  "Anestesiología / Terapia del Dolor",
  "Cirugía de Cabeza, Cuello y Maxilofacial",
  "Cirugía de Tórax y Cardiovascular",
  "Cirugía General",
  "Cirugía Oncológica",
  "Cirugía Pediátrica",
  "Cirugía Plástica",
  "Ginecología y Obstetricia",
  "Neurocirugía",
  "Oftalmología",
  "Ortopedia y Traumatología",
  "Otorrinolaringología",
  "Radiología Intervencionista",
  "Urología"
];

const specialtiesTecnologos= [
  "Terapia física y rehabilitación",
  "Terapia respiratoria",
  "Terapia de lenguaje",
  "Terapia de aprendizaje",
  "Terapia conductual",
  "Terapia ocupacional"
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
  const autocompleteRef = useRef(null);

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


  React.useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      specialty: prevFormData.professional_college === "Colegio de nutricionistas del Perú" 
        ? ["Nutrición"] 
        : prevFormData.professional_college === "Colegio de obstetras del Perú" 
        ? ["Obstetricia"] 
        : prevFormData.professional_college === "Colegio de odontólogos del Perú" 
        ? ["Odontología"] 
        : prevFormData.professional_college === "Colegio de psicólogos del Perú"  
        ? ["Psicología"] 
        : prevFormData.professional_college === "Asociación de enfermeros técnicos del Perú" 
        ? ["Enfermería"] 
     
        
        : []
    }));
  }, [formData.professional_college]);
  
   

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      console.log("PLACE OBJECT:", place); // Debug

      if (place) {
        const addressComponents = place.address_components;

        // Obtener el país
        const country = addressComponents?.find((component) =>
          component.types.includes("country")
        )?.long_name || place.name || "";

        // Obtener departamentos, provincias y distritos (si aplica)
        const departments = addressComponents?.filter((component) =>
          component.types.includes("administrative_area_level_1")
        ).map((dep) => dep.long_name) || [];

        const provinces = addressComponents?.filter((component) =>
          component.types.includes("administrative_area_level_1")
        ).map((prov) => prov.long_name) || [];

        const districts = addressComponents?.filter((component) =>
          component.types.includes("administrative_area_level_2")
        ).map((dist) => dist.long_name) || [];

        // Actualizar el estado
        setFormData((prev) => ({
          ...prev,
          country,
          departments,
          provinces,
          districts,
        }));
      } else {
        console.warn("⚠️ No se pudo obtener el lugar seleccionado.");
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
      await axios.post("https://vitalclic-production.up.railway.app/api/register-professional", formData);

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
    "Colegio de odontólogos del Perú",
    "Colegio de psicólogos del Perú",
    "Colegio médico veterinario del Perú",
    "Colegio de tecnólogos médicos del Perú",

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
          {formData.professional_college === "Colegio médico del Perú" ? (
            <>

              <Grid item xs={12} sm={3}>
                <FormControl sx={{
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
                    {specialtiesMedica.map((specialty) => (
                      <MenuItem key={specialty} value={specialty}>
                        <Checkbox checked={formData.specialty.includes(specialty)} />
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
          ) : null}


{formData.professional_college === "Colegio de tecnólogos médicos del Perú" ? (
            <>

              <Grid item xs={12} sm={3}>
                <FormControl sx={{
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
                    {specialtiesTecnologos.map((specialty) => (
                      <MenuItem key={specialty} value={specialty}>
                        <Checkbox checked={formData.specialty.includes(specialty)} />
                        <ListItemText primary={specialty} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Número de especialidad RNE (opcional)"
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
            </>
          ) : null}

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
          <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
            <Grid item xs={12} sm={3}>
              <Autocomplete
                onLoad={(autocomplete) => {
                  autocompleteRef.current = autocomplete;
                }}
                onPlaceChanged={onPlaceChanged}
              >
                <TextField
                  label="País"
                  name="country"
                  autoComplete="off"  // Desactivar autocompletado del navegador
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
              </Autocomplete>
            </Grid>
          </LoadScript>

          <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
            <Grid item xs={12} sm={3}>
              <Autocomplete onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              } onPlaceChanged={onPlaceChanged}>
                <TextField
                  label="Departamento"
                  name="department"
                  autoComplete={false}
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
              </Autocomplete>
            </Grid>
          </LoadScript>
          <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
            <Grid item xs={12} sm={3}>
              <Autocomplete onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              } onPlaceChanged={onPlaceChanged}>
                <TextField
                  label="Provincia"
                  name="province"
                  autoComplete={false}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#53676c" },
                      "&.Mui-focused fieldset": { borderColor: "#53676c" },
                    },
                    "& .MuiInputLabel-root": { color: "#000" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#53676c" },
                  }}
                />
              </Autocomplete>
            </Grid>
          </LoadScript>

          <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
            <Grid item xs={12} sm={3}>
              <Autocomplete onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              } onPlaceChanged={onPlaceChanged}>
                <TextField

                  label="Distrito"
                  name="district"
                  autoComplete={false}
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
              </Autocomplete>
            </Grid>
          </LoadScript>


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
          {formData.professional_college === "Colegio médico del Perú" || formData.professional_college === "Colegio de enfermeros del Perú" || formData.professional_college === "Colegio odontológico del Perú" ? (

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
                  <FormControlLabel value="sí" control={<Radio sx={{ '&.Mui-checked': { color: '#53676c' } }} />} label="Sí" />
                  <FormControlLabel value="no" control={<Radio sx={{ '&.Mui-checked': { color: '#53676c' } }} />} label="No" />
                </RadioGroup>
              </FormControl>

            </Grid>
          ) : null}

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
