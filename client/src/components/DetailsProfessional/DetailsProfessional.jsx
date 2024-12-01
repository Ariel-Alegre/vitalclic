import React from "react";
import { Box, Typography, Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const HealthProfessionalInfo = () => {
  const [professional, setProfessional] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [image, setImage] = React.useState(null); // Estado para la nueva imagen
  const [imagePreview, setImagePreview] = React.useState(""); // Estado para la vista previa de imagen
  const [token, setToken] = React.useState(""); // Estado para la vista previa de imagen

  const handleOpen = () => {
    setFormData({
      name: professional?.name || "",
      lastName: professional?.lastName || "",
      email: professional?.email || "",
      phone: professional?.phone || "",
    }); // Inicializar el formulario con los datos actuales
    setImagePreview(professional?.image || ""); // Vista previa inicial
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    const token = localStorage.getItem("token");

    setToken(token);
  }, []);
  React.useEffect(() => {
    if (token) {
      dataPersonal();
    }
  }, [token]);
  

  const dataPersonal = async () => {
    try {
      const tokenFromStorage = localStorage.getItem("token"); // Obtener el token directamente
      if (!tokenFromStorage) {
        throw new Error("Token no encontrado en localStorage");
      }
      const response = await axios.get(
        `https://vitalclic-production.up.railway.app/api/datapersonal`,
        {
          headers: {
            Authorization: tokenFromStorage, // Usa el token aquí
            "Content-Type": "application/json",
          },
        }
      );
  
      setProfessional(response.data);
    } catch (error) {
      console.error("Error al obtener los detalles:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const updateProfessional = async () => {
    setLoading(true);
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });
    if (image) formDataToSend.append("image", image);
  
    try {
      const response = await axios.put(
        `https://vitalclic-production.up.railway.app/api/professional/${professional.id}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
     
      
      // Actualiza el estado local inmediatamente
      setProfessional((prev) => ({
        ...prev,
        ...response.data.data, // Usa los datos devueltos por el servidor
      }));
    } catch (error) {
      console.error("Error al actualizar la información:", error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Guarda el archivo para el envío
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Genera la vista previa
      };
      reader.readAsDataURL(file);
    }
  };

  // Aquí no agregamos condiciones de carga o error
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Box display="flex" justifyContent="center" mb={3}>
            <img
              src={professional?.image || "https://via.placeholder.com/300x200"}
              alt="foto"
              style={{ maxWidth: 300, height: 200, borderRadius: "8px" }}
            />
          </Box>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            {professional?.name} {professional?.lastName}
          </Typography>

          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            align="center"
            color="text.secondary"
          >
            {professional?.specialty}
          </Typography>

          <Typography variant="body1" color="text.secondary" align="center">
            <strong>Teléfono:</strong> {professional?.phone}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            <strong>Correo electrónico:</strong> {professional?.email}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            <strong>Género:</strong> {professional?.genre}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            <strong>Provincia:</strong> {professional?.province}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            <strong>Distrito:</strong> {professional?.district}
          </Typography>
          {professional?.professional_college && (

            <Typography variant="body1" color="text.secondary" align="center">
            <strong>Número de matrícula:</strong>{" "}
            {professional?.professional_college}
          </Typography>
          )}
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              sx={{
                backgroundColor: "#53676c",
                ":hover": { backgroundColor: "#8ca7a6" },
              }}
              variant="contained"
              color="primary"
              onClick={handleOpen}
            >
              Actualizar información
            </Button>
          </Box>
        </Paper>
      </Grid>
      {/* Modal para actualizar */}
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Actualizar Información
            </Typography>
            <Box component="form" noValidate sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Nombre"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                margin="normal"
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
              <TextField
                fullWidth
                label="Apellido"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                margin="normal"
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
              <TextField
                fullWidth
                label="Correo electrónico"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                margin="normal"
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
              <TextField
                fullWidth
                label="Teléfono"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                margin="normal"
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
              <Box
                mt={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <img
                  src={imagePreview || "https://via.placeholder.com/300x200"}
                  alt="Vista previa"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                />
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<PhotoCamera />}
                  sx={{
                    backgroundColor: "#53676c",
                    ":hover": { backgroundColor: "#53676c" },
                    marginBottom: "2em",
                  }}
                >
                  Subir Imagen
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>
              </Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={updateProfessional}
                sx={{
                  backgroundColor: "#53676c",
                  ":hover": { backgroundColor: "#8ca7a6" },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Guardar cambios"
                )}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default HealthProfessionalInfo;
