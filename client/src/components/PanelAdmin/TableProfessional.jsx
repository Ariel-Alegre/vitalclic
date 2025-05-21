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

const TableProfessional = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selectedProfessional, setSelectedProfessional] = React.useState(null);
  const [selectedShift, setSelectedShift] = React.useState(null);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [professionals, setProfessionals] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleOpen = (professional) => {
    setSelectedProfessional(professional);
    setOpen(true);
  };

  const handleOpenInfo = (shift) => {
    setSelectedShift(shift);
    setOpenInfo(true);
  };

  const handleCloseInfo = () => setOpenInfo(false);
  const handleClose = () => setOpen(false);

  const AllProfessional = async () => {
    try {
      const res = await axios.get("https://vitalclic-production.up.railway.app/api/professionals");
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
      await axios.put(
        `https://vitalclic-production.up.railway.app/api/update-doctor-status/${selectedProfessional.id}`,
        { status: newStatus }
      );

      setProfessionals((prevProfessionals) =>
        prevProfessionals.map((prof) =>
          prof.id === selectedProfessional.id ? { ...prof, status: newStatus } : prof
        )
      );

      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  // Filtro por nombre, apellido o email
  const filteredProfessionals = professionals.filter((prof) => {
    const fullName = `${prof.name} ${prof.lastName}`.toLowerCase();
    const email = prof.email.toLowerCase();
    const term = searchTerm.toLowerCase();
    return fullName.includes(term) || email.includes(term);
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

      <h1>Profesionales</h1>

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
            <th>País</th>
            <th>Provincia</th>
            <th>Distrito</th>
            <th>Ver toda la información</th>
            <th>Estado de la cuenta</th>
            <th>Cambiar estado de la cuenta</th>
          </tr>
        </thead>
        <tbody>
          {filteredProfessionals.map((data, index) => (
            <tr key={index}>
              <td>{data.name} {data.lastName}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{data.country}</td>
              <td>{data.province}</td>
              <td>{data.district}</td>
              <td className={styles.viewInformation} onClick={() => handleOpenInfo(data)}>Ver información</td>
              <td>{data.status}</td>
              <td>
                <button className={styles.button} onClick={() => handleOpen(data)}>
                  {data.status === "pendiente" ? "Activar la cuenta" : "Poner en pendiente"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmación */}
      <Modal open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h6">
              ¿Estás seguro de que deseas {selectedProfessional?.status === "pendiente" ? "activar" : "poner en pendiente"} la cuenta?
            </Typography>
            <Box sx={{ mt: 2, display: "flex", gap: "2em" }}>
              <Button variant="contained" onClick={updateAccount} sx={{ backgroundColor: "#53676c" }}>Sí</Button>
              <Button variant="contained" onClick={handleClose} sx={{ backgroundColor: "red" }}>No</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Modal de información */}
      <Modal open={openInfo} onClose={handleCloseInfo} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={openInfo}>
          <Box sx={styleInfo}>
            <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", color: "#53676c", mb: 2 }}>
              Información general
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography><strong>Nombre:</strong> {selectedShift?.name} {selectedShift?.lastName}</Typography>
              <Typography><strong>DNI:</strong> {selectedShift?.dni}</Typography>
              <Typography><strong>Correo:</strong> {selectedShift?.email}</Typography>
              <Typography><strong>Teléfono:</strong> {selectedShift?.phone}</Typography>
              <Typography><strong>Fecha de Nacimiento:</strong> {new Date(selectedShift?.birthdate).toLocaleDateString()}</Typography>
              <Typography><strong>Género:</strong> {selectedShift?.genre}</Typography>
              <Typography><strong>País:</strong> {selectedShift?.country}</Typography>
              <Typography><strong>Departamento:</strong> {selectedShift?.department}</Typography>
              <Typography><strong>Provincia:</strong> {selectedShift?.province}</Typography>
              <Typography><strong>Distrito:</strong> {selectedShift?.district}</Typography>
              <Typography><strong>Servicios de Emergencia:</strong> {selectedShift?.emergencyServices}</Typography>
              <Typography><strong>Colegio Profesional:</strong> {selectedShift?.professional_college}</Typography>
              <Typography><strong>Número de Registro:</strong> {selectedShift?.registration_number}</Typography>
              <Typography><strong>Especialidades:</strong> {selectedShift?.specialty?.join(", ")}</Typography>
              <Typography><strong>Número RNE:</strong> {selectedShift?.specialty_number_rne}</Typography>
              <Typography><strong>Rol:</strong> {selectedShift?.role}</Typography>
              <Typography><strong>Estado:</strong> <span className={styles.status_bg}>{selectedShift?.status}</span></Typography>
              <Typography><strong>Términos Aceptados:</strong> {selectedShift?.termsAccepted ? "Sí" : "No"}</Typography>
              <Typography><strong>Fecha de Aceptación:</strong> {new Date(selectedShift?.termsAcceptedAt).toLocaleString()}</Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TableProfessional;
