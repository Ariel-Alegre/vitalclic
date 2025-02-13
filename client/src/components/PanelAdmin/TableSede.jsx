import React from "react";
import styles from "../../styles/PanelAdmin/TableProfessional.module.css";
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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

const TableSede = () => {
  const [open, setOpen] = React.useState(false); 
   const [selectedShift, setSelectedShift] = React.useState(null);
  console.log(selectedShift)
    const [openInfo, setOpenInfo] = React.useState(false);
    const handleOpenInfo = (shift) => {
      setSelectedShift(shift); // Establece el turno seleccionado
      setOpenInfo(true); // Abre el modal
    };
  const [selectedSede, setSelectedSede] = React.useState(null);
  const [sede, setSede] = React.useState([]);

  const handleOpen = (professional) => {
    setSelectedSede(professional); // Establece el profesional seleccionado
    setOpen(true);
  };
  const handleCloseInfo = () => setOpenInfo(false);
  
  const handleClose = () => setOpen(false);

  const AllSede = async () => {
    try {
      const res = await axios.get("https://vitalclic-production.up.railway.app/api/all-sede");
      setSede(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    AllSede();
  }, []);

  const updateAccount = async () => {
    if (!selectedSede) return;

    const newStatus = selectedSede.status === "pendiente" ? "activo" : "pendiente";

    try {
      const res = await axios.put(
        `https://vitalclic-production.up.railway.app/api/update-sede-status/${selectedSede.id}`,
        { status: newStatus }
      );

      // Actualiza la lista de profesionales con el estado modificado
      setSede((prevSede) =>
        prevSede.map((prof) =>
          prof.id === selectedSede.id ? { ...prof, status: newStatus } : prof
        )
      );
      
      handleClose();  // Cierra el modal después de actualizar
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sedes</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>País</th>
            <th>Provincia</th>
            <th>Distrito</th>
            <th>Ver toda la información</th>
            <th>Estado de la cuenta</th>
            <th>Cambiar estado de la cuenta</th>
          </tr>
        </thead>
        {sede && sede.map((data, index) => (
          <tbody key={index}>
            <tr>
              <td>{data.name} {data.lastName}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{data.country}</td>
              <td>{data.province}</td>
              <td>{data.district}</td>
                  
                  <td className={styles.viewInformation}onClick={() => handleOpenInfo(data)} >Ver información</td>
              <td>{data.status}</td>

              <td>
                <button className={styles.button} onClick={() => handleOpen(data)}>
                  {data.status === "pendiente" ? "Activar la cuenta" : "Poner en pendiente"}
                </button>
              </td>
            </tr>
          </tbody>
        ))}
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
              ¿Estás seguro de que deseas {selectedSede?.status === "pendiente" ? "activar" : "poner en pendiente"} la cuenta?
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2, display: "flex", gap: "2em" }}>
              <Button variant="contained" onClick={updateAccount} sx={{ backgroundColor: "#53676c"}}>
                Sí
              </Button>
              <Button variant="contained" onClick={handleClose} sx={{ backgroundColor: "red"}}>
                No
              </Button>
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
    {selectedShift?.name}
  </Typography>
  <Typography variant="body1" sx={{ fontSize: "18px" }}>
    <strong>Razón Social: </strong>
    {selectedShift?.reason_social}
  </Typography>
  <Typography variant="body1" sx={{ fontSize: "18px" }}>
    <strong>RUC: </strong>
    {selectedShift?.ruc}
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
    <strong>Dirección: </strong>
    {selectedShift?.address}
  </Typography>
  <Typography variant="body1" sx={{ fontSize: "18px" }}>
    <strong>País: </strong>
    {selectedShift?.country}
  </Typography>
  <Typography variant="body1" sx={{ fontSize: "18px" }}>
    <strong>Departamento: </strong>
    {selectedShift?.department}
  </Typography>
  <Typography variant="body1" sx={{ fontSize: "18px" }}>
    <strong>Provincia: </strong>
    {selectedShift?.province}
  </Typography>
  <Typography variant="body1" sx={{ fontSize: "18px" }}>
    <strong>Distrito: </strong>
    {selectedShift?.district}
  </Typography>
  <Typography variant="body1" sx={{ fontSize: "18px" }}>
    <strong>Persona de Contacto: </strong>
    {selectedShift?.contact_person}
  </Typography>
  <Typography variant="body1" sx={{ fontSize: "18px" }}>
    <strong>Cargo: </strong>
    {selectedShift?.charges}
  </Typography>
  <Typography variant="body1" sx={{ fontSize: "18px" }}>
    <strong>Especialidades: </strong>
    {selectedShift?.specialty?.join(", ")}
  </Typography>
  <Typography variant="body1" sx={{ fontSize: "18px" }}>
    <strong>Rol: </strong>
    {selectedShift?.role}
  </Typography>
  <Typography variant="body1" sx={{ fontSize: "18px" }}>
    <strong>Estado: </strong>
    <span className={styles.status_bg}>{selectedShift?.status}</span>
  </Typography>
  <Typography variant="body1" sx={{ fontSize: "18px" }}>
    <strong>Términos Aceptados: </strong>
    {selectedShift?.termsAccepted ? "Sí" : "No"}
  </Typography>
  <Typography variant="body1" sx={{ fontSize: "18px" }}>
    <strong>Fecha de Aceptación de Términos: </strong>
    {new Date(selectedShift?.termsAcceptedAt).toLocaleString()}
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

export default TableSede;
