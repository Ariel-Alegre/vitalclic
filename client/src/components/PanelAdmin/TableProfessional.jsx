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

const TableProfessional = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedProfessional, setSelectedProfessional] = React.useState(null);
  const [professionals, setProfessionals] = React.useState([]);
console.log(professionals)
  const handleOpen = (professional) => {
    setSelectedProfessional(professional); // Establece el profesional seleccionado
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false);

  const AllProfessional = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/professionals");
      setProfessionals(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    AllProfessional();
  }, []);

  const updateAccount = async () => {
    if (!selectedProfessional) return;

    const newStatus = selectedProfessional.status === "pendiente" ? "activo" : "pendiente";

    try {
      const res = await axios.put(
        `http://localhost:3001/api/update-doctor-status/${selectedProfessional.id}`,
        { status: newStatus }
      );

      // Actualiza la lista de profesionales con el estado modificado
      setProfessionals((prevProfessionals) =>
        prevProfessionals.map((prof) =>
          prof.id === selectedProfessional.id ? { ...prof, status: newStatus } : prof
        )
      );
      
      handleClose();  // Cierra el modal después de actualizar
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Tabla con Modal de Confirmación</h1>

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
        {professionals.map((data, index) => (
          <tbody key={index}>
            <tr>
              <td>{data.name} {data.lastName}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{data.country}</td>
              <td>{data.province}</td>
              <td>{data.district}</td>
              <td className={styles.viewInformation}>Ver información</td>
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
              ¿Estás seguro de que deseas {selectedProfessional?.status === "pendiente" ? "activar" : "poner en pendiente"} la cuenta?
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2, display: "flex", gap: "2em" }}>
              <Button variant="contained" onClick={updateAccount}>
                Sí
              </Button>
              <Button variant="contained" onClick={handleClose}>
                No
              </Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TableProfessional;
