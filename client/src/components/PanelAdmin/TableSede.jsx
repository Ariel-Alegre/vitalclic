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

const TableSede = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedSede, setSelectedSede] = React.useState(null);
  const [sede, setSede] = React.useState([]);

  const handleOpen = (professional) => {
    setSelectedSede(professional); // Establece el profesional seleccionado
    setOpen(true);
  };
  
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
    </div>
  );
};

export default TableSede;
