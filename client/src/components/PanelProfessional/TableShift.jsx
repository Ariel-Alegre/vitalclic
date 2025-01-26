import React from "react";
import styles from "../../styles/PanelAdmin/TableShift.module.css";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%", // Asegura que el modal ocupe el 100% del ancho disponible
  maxWidth: 500, // Limita el tamaño máximo a 500px
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px", // Bordes redondeados
};

const styleInfo = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%", // Asegura que el modal ocupe el 100% del ancho disponible
  maxWidth: 800, // Limita el tamaño máximo a 800px
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px", // Bordes redondeados
};

const TableProfessional = () => {
  const [open, setOpen] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);

  const [selectedShift, setSelectedShift] = React.useState(null);
  const [allShfit, setAllShfit] = React.useState([]);

  const [token, setToken] = React.useState(""); // Estado para la autenticación

  // Función para abrir el modal
  const handleOpenInfo = (shift) => {
    setSelectedShift(shift); // Establece el turno seleccionado
    setOpenInfo(true); // Abre el modal
  };
  const handleCloseInfo = () => setOpenInfo(false);

  const handleOpen = (shift) => {
    setSelectedShift(shift); // Establece el turno seleccionado

    setOpen(true); // Abre el modal
  };
  // Función para cerrar el modal
  const handleClose = () => setOpen(false);

  // Función para obtener los turnos
  const AllShift = async () => {
    const tokenFromStorage = localStorage.getItem("token");
    if (!tokenFromStorage) {
      throw new Error("Token no encontrado en localStorage");
    }
    try {
      const res = await axios.get(
        "https://vitalclic-production.up.railway.app/api/shift-reservates",
        {
          headers: {
            Authorization: tokenFromStorage,
            "Content-Type": "application/json",
          },
        }
      );
      setAllShfit(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Efecto para obtener el token y cargar los turnos
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  React.useEffect(() => {
    if (token) {
      AllShift();
    }
  }, [token]);

  // Función para actualizar el estado del turno
 const updateAccount = async (newStatus) => {
  if (!selectedShift) return;

  try {
    // Obtener el token (ajusta esto según dónde lo almacenes)
    const token = localStorage.getItem("token"); // O donde estés guardando tu token

    if (!token) {
      console.error("Token no encontrado. Por favor, inicia sesión.");
      return;
    }

    // Realiza la solicitud PUT al servidor
    const res = await axios.put(
      `https://vitalclic-production.up.railway.app/api/online-shifts/${selectedShift.id}`,
      { status: newStatus },
      {
        headers: {
          Authorization: token, // Incluye el token en los encabezados
        },
      }
    );

    // Actualiza el estado local en el frontend
    setAllShfit((prevShifts) =>
      prevShifts.map((shift) =>
        shift.id === selectedShift.id
          ? { ...shift, status: newStatus }
          : shift
      )
    );

    handleClose(); // Cierra el modal después de actualizar
  } catch (error) {
    console.error("Error al actualizar el estado del turno:", error);
  }
};


  return (
    <div className={styles.container}>
      <h1>Turnos disponibles</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Información completa</th>
            <th>Estado de turno</th>
            <th>Cambiar estado de la cuenta</th>
          </tr>
        </thead>
        <tbody>
          {allShfit.map(
            (data, index) =>
              data.status === "pendiente" ? (
                <tr key={index}>
                  <td>
                    {data.name} {data.lastName}
                  </td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{data.date}</td>
                  <td>{data.time}:00</td>

                  <td
                    className={styles.viewInformation}
                    onClick={() => handleOpenInfo(data)}
                  >
                    Ver información
                  </td>
                  <td>{data.status}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpen(data)}
                      sx={{
                        width: "45%",
                        backgroundColor: "#53676c",
                        ":hover": { backgroundColor: "#3e5852" },
                      }}
                    >
                      {data.status === "pendiente" && "Tomar turno"}
                    </Button>
                  </td>
                </tr>
              ) : null // Solo se muestran turnos con estado 'pendiente', 'activo', 'atendido' o 'cancelar'
          )}
        </tbody>
      </table>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              ¿Estás seguro de que deseas cambiar el estado del turno?
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, display: "flex", gap: "2em" }}
            >
              {/* Botón para cambiar el estado a 'activo' */}
              <Button
                variant="contained"
                onClick={() => updateAccount("activo")}
                sx={{
                  backgroundColor: "#53676c",
                  ":hover": { backgroundColor: "#53676c" },
                }}
              >
                Aceptar turno
              </Button>
              {/* Botón para cambiar el estado a 'cancelar' */}
              <Button
                variant="contained"
                onClick={() => handleClose()}
                sx={{
                  backgroundColor: "#f44336",
                  ":hover": { backgroundColor: "#f44336" },
                }}
              >
                Salir
              </Button>
              {/* Botón para cambiar el estado a 'atendido' */}
              {/*       <Button
                variant="contained"
                onClick={() => updateAccount("atendido")}
                sx={{ backgroundColor: "#FF9800" }}
              >
                Marcar como atendido
              </Button> */}
              {/* Botón para cambiar el estado a 'pendiente' */}
              {/*      <Button
                variant="contained"
                onClick={() => updateAccount("pendiente")}
                sx={{ backgroundColor: "#53676c" }}
              >
                Poner en pendiente
              </Button> */}
              {/* Botón para cancelar */}
            </Typography>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openInfo}
        onClose={handleCloseInfo}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openInfo}>
          <Box sx={styleInfo}>
            {/* Información detallada */}
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#53676c",
                mb: 2,
              }}
            >
              Información del turno
            </Typography>

            {/* Contenido del turno */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="body1" sx={{ fontSize: "18px" }}>
                <strong>Nombre: </strong>
                {selectedShift?.name} {selectedShift?.lastName}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "18px" }}>
                <strong>Correo: </strong>
                {selectedShift?.email}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "18px" }}>
                <strong>Teléfono: </strong>
                {selectedShift?.phone}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "18px" }}>
                <strong>Edad: </strong>
                {selectedShift?.age}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "18px" }}>
                <strong>Dni: </strong>
                {selectedShift?.document_number}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "18px" }}>
                <strong>Fecha: </strong>
                {selectedShift?.date}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "18px" }}>
                <strong>Hora: </strong>
                {selectedShift?.time}:00
              </Typography>

              <Typography variant="body1" sx={{ fontSize: "18px" }}>
                <strong>Motivo de la consulta: </strong>
                {selectedShift?.reason_for_shift}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "18px" }}>
                <strong>Estado: </strong>
                <span className={styles.status_bg}>{selectedShift?.status}</span>
              </Typography>
            </Box>

            {/* Botones de acción */}
            <Box
              sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCloseInfo()}
                sx={{
                  width: "45%",
                  backgroundColor: "#53676c",
                  ":hover": { backgroundColor: "#3e5852" },
                }}
              >
                Cerrar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TableProfessional;
