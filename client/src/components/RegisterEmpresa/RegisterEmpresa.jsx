// src/components/Form.js
import React, { useState, useRef, useEffect} from "react";
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
  ListItemText,
} from "@mui/material";
import { es } from "date-fns/locale"; // Puedes cambiar el idioma de fecha
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // Importar AdapterDateFns
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Link, useNavigate } from "react-router-dom";
import { LoadScript, Autocomplete, useLoadScript } from "@react-google-maps/api";


const API_KEY = "AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA"; // 🔹 Reemplaza con tu clave de Google Maps
const libraries = ["places"];

const services = [
  "Tópico de enfermería",
  "Laboratorio clínico",
  "Diagnóstico por imágen",
  "Ambulancia",
  "Centro de vacunación",
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
const RegisterEmpresa = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    reason_social: "",
    name: "",
    ruc: "",
    address: "",
    email: "",
    country: "",
    province: "",
    district: "",
    phone: "",
    specialty: [],
    type_of_service: "",
    contact_person: "",
    charges: "",
    password: "",
    termsAccepted: false,
    termsAcceptedAt: null,
  });
  const autocompleteRef = useRef(null);
  const inputRefProvince = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY, // 🔴 Reemplaza con tu clave de API válida
    libraries,
  });

  useEffect(() => {
    if (isLoaded && inputRefProvince.current) {
      const autoCompleteInstance = new window.google.maps.places.Autocomplete(
        inputRefProvince.current,
        {
          types: ["(regions)"], // Solo busca regiones (provincias/estados)
          componentRestrictions: { country: "PE" }, // Restricción a Perú
        }
      );

      autoCompleteInstance.addListener("place_changed", () => {
        const place = autoCompleteInstance.getPlace();
        if (place.address_components) {
          const province = place.address_components.find((comp) =>
            comp.types.includes("administrative_area_level_1")
          )?.long_name;

          if (province) {
            setFormData({ province });
          }
        }
      });

      return () => {
        window.google.maps.event.clearInstanceListeners(autoCompleteInstance);
      };
    }
  }, [isLoaded]);
  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
    autocomplete.setTypes(["(regions)"]); // 🔹 Filtra regiones (países incluidos)
    autocomplete.setComponentRestrictions({ country: []}); // 🔹 Permite todos los países
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.address_components) {
        const country = place.address_components.find((comp) =>
          comp.types.includes("country")
        );
        if (country) {
          // Actualiza solo el campo country en formData
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
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertError(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "specialty") {
      setFormData((prev) => ({
        ...prev,
        [name]: typeof value === "string" ? value.split(",") : value, // Manejo múltiple
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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario (recargar la página)
    setLoading(true);
    if (!formData.termsAccepted) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    try {
      // Envía una solicitud POST al backend
      const response = await axios.post(
        "http://localhost:3001/api/register-sede",
        formData
      );
      console.log(response.status);
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
      setLoading(false);
      navigate("/registro/sede-exitosa");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
      {" "}
      {/* Cambié a AdapterDateFns */}
      <form
        onSubmit={handleSubmit}
        style={{ padding: "2rem", marginTop: "5em" }}
      >
        <Typography variant="h4" gutterBottom>
          Registro de empresa
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Razón social"
              name="reason_social"
              value={formData.reason_social}
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
              label="Nombre comercial"
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
              label="RUC"
              name="ruc"
              value={formData.ruc}
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
              label="Persona de contacto"
              name="contact_person"
              value={formData.contact_person}
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
            <TextField
              label="Cargo"
              name="charges"
              value={formData.charges}
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
            <FormControl
              sx={{
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
              }}
            >
              <InputLabel id="specialties-select-label">
                Servicios que brinda
              </InputLabel>
              <Select
                labelId="specialties-select-label"
                id="specialties-select"
                multiple
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                input={<OutlinedInput label="Servicios que brinda" />}
                renderValue={(selected) => selected.join(", ")}
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
                {services.map((specialty) => (
                  <MenuItem key={specialty} value={specialty}>
                    <Checkbox
                      checked={formData.specialty.includes(specialty)}
                    />
                    <ListItemText primary={specialty} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>

          <Grid item xs={12} sm={3}>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            
            <TextField
              label="País"
              name="country"
              value={formData.country}
              onChange={handleChange}
              autoComplete= 'none'
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
        autoComplete="none"
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

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.termsAccepted}
                  onChange={handleCheckboxChange}
                  sx={{ "&.Mui-checked": { color: "#53676c" } }}
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
                "Enviar información"
              )}
            </Button>
          </Grid>
          <Snackbar
            open={openAlertError}
            autoHideDuration={4000}
            onClose={handleCloseAlertError}
          >
            <Alert
              onClose={handleCloseAlertError}
              severity="error"
              variant="filled"
            >
              La sede ya está registrado. Por favor, intente con otro correo
              electrónico.
            </Alert>
          </Snackbar>
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default RegisterEmpresa;
