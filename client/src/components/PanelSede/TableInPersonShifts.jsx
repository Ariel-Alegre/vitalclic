import * as React from 'react';
import styles from "../../styles/PanelAdmin/TableShift.module.css";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

const TableInPersonShifts = () => {
  const [open, setOpen] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);

  const [selectedShift, setSelectedShift] = React.useState(null);
  const [allShfit, setAllShfit] = React.useState([]);
  const [scroll, setScroll] = React.useState('paper');

  const [token, setToken] = React.useState(""); // Estado para la autenticación

console.log(selectedShift)

  const handleClickOpen = (scrollType, shift) => {
    return () => {
      setOpenInfo(true);
      setScroll(scrollType);
      setSelectedShift(shift);
    };
  };
  

  const handleCloseInfo = () => setOpenInfo(false);

  const handleOpen = (shift) => {
    setSelectedShift(shift); // Establece el turno seleccionado

    setOpen(true); // Abre el modal
  };
  // Función para cerrar el modal
  const handleClose = () => setOpen(false);
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openInfo) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openInfo]);
  // Función para obtener los turnos
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
  
      setAllShfit(response.data);
    } catch (error) {
      console.error("Error al obtener los detalles:", error);
    }
  };
  // Efecto para obtener el token y cargar los turnos
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  React.useEffect(() => {
    if (token) {
      dataPersonal();
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
            <th>Especialidad</th>

            <th>Información completa</th>
            <th>Estado de turno</th>
            <th>Cambiar estado de la cuenta</th>
          </tr>
        </thead>
        <tbody>
          {allShfit.InPersonShifts && allShfit.InPersonShifts.map(
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
                  <td>{data.specialty}</td>


                  <td
                    className={styles.viewInformation}
                    onClick={ handleClickOpen('paper',data)}
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

 

      <Dialog
        open={openInfo}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Toda la información</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
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
                <strong>Especialidad: </strong>
                {selectedShift?.specialty}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "18px" }}>
                <strong>Motivo de la consulta: </strong>
                {selectedShift?.reason_for_shift}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "18px" }}>
                <strong>Estado: </strong>
                <span className={styles.status_bg}>{selectedShift?.status}</span>
              </Typography>
        </DialogContent>
        <DialogActions>
        <Button
                  onClick={() => handleCloseInfo()}
                  sx={{
                    width: "45%",
                    backgroundColor: "#53676c",
                    ":hover": { backgroundColor: "#3e5852" },
                    margin: "auto",
                    color: "white"
                  }}>Salir</Button>

        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TableInPersonShifts;
