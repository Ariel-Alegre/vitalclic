import React from "react";
import styles from "../../styles/PanelAdmin/TableProfessional.module.css";
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

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
  width: "100%",
  maxWidth: 800,
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const TableConsultation = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selectedShift, setSelectedShift] = React.useState(null);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [selectedSede, setSelectedSede] = React.useState(null);
  const [sede, setSede] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleOpenInfo = (shift) => {
    setSelectedShift(shift);
    setOpenInfo(true);
  };

  const handleOpen = (professional) => {
    setSelectedSede(professional);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleCloseInfo = () => setOpenInfo(false);

  const AllSede = async () => {
    try {
      const res = await axios.get("https://vitalclic-production.up.railway.app/api/all-shifts");
      const pendientes = res.data.data.filter((item) => item.status === "pendiente");
      setSede(pendientes);
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
      await axios.put(`https://vitalclic-production.up.railway.app/api/update-sede-status/${selectedSede.id}`, {
        status: newStatus,
      });
      setSede((prev) =>
        prev.map((prof) =>
          prof.id === selectedSede.id ? { ...prof, status: newStatus } : prof
        )
      );
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredSede = sede.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(search) ||
      item.lastName?.toLowerCase().includes(search) ||
      item.email?.toLowerCase().includes(search) ||
      item.phone?.toLowerCase().includes(search)
    );
  });

  return (
    <div className={styles.container}>
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ mb: 2, color: "#53676c", borderColor: "#53676c", ":hover": { backgroundColor: "#f0f0f0" } }}
      >
        Volver
      </Button>

      <h1>Consultas pendientes</h1>

      <div style={{ paddingBottom: "1em", display: "flex", justifyContent: "flex-end" }}>
        <input
          type="text"
          placeholder="Buscar por nombre o correo"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "0.5em",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "250px"
          }}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
          
            <th>Ver toda la información</th>
            <th>Estado</th>
          </tr>
        </thead>
        {filteredSede.map((data, index) => (
          <tbody key={index}>
            <tr>
              <td>{data.name} {data.lastName}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
             
              <td className={styles.viewInformation} onClick={() => handleOpenInfo(data)}>Ver información</td>
              <td>{data.status}</td>
            </tr>
          </tbody>
        ))}
      </table>

      {/* Modal Confirmación */}
      <Modal open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h6">
              ¿Estás seguro de que deseas {selectedSede?.status === "pendiente" ? "activar" : "poner en pendiente"} la cuenta?
            </Typography>
            <Box sx={{ mt: 2, display: "flex", gap: "2em" }}>
              <Button variant="contained" onClick={updateAccount} sx={{ backgroundColor: "#53676c" }}>Sí</Button>
              <Button variant="contained" onClick={handleClose} sx={{ backgroundColor: "red" }}>No</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Modal Información */}
      <Modal open={openInfo} onClose={handleCloseInfo} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={openInfo}>
          <Box sx={styleInfo}>
            <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", color: "#53676c", mb: 2 }}>
              Información del turno
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[ 
                ["Nombre", selectedShift?.name],
                ["Razón Social", selectedShift?.reason_social],
                ["RUC", selectedShift?.ruc],
                ["Correo", selectedShift?.email],
                ["Teléfono", selectedShift?.phone],
                ["Dirección", selectedShift?.address],
                ["País", selectedShift?.country],
                ["Departamento", selectedShift?.department],
                ["Provincia", selectedShift?.province],
                ["Distrito", selectedShift?.district],
                ["Persona de Contacto", selectedShift?.contact_person],
                ["Cargo", selectedShift?.charges],
      ["Especialidades", Array.isArray(selectedShift?.specialty) ? selectedShift.specialty.join(", ") : (selectedShift?.specialty || "No disponible")],

                ["Rol", selectedShift?.role],
                ["Estado", <span className={styles.status_bg}>{selectedShift?.status}</span>],
                ["Términos Aceptados", selectedShift?.termsAccepted ? "Sí" : "No"],
                ["Fecha de Aceptación de Términos", selectedShift?.termsAcceptedAt ? new Date(selectedShift.termsAcceptedAt).toLocaleString() : "No disponible"],
              ].map(([label, value], i) => (
                <Typography key={i} variant="body1" sx={{ fontSize: "18px" }}>
                  <strong>{label}: </strong>{value}
                </Typography>
              ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button variant="contained" onClick={handleCloseInfo} sx={{ backgroundColor: "#53676c" }}>
                Cerrar
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TableConsultation;
