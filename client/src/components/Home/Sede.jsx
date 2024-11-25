import React from "react";
import styles from "../../styles/Home/Sede.module.css";
import { useLocation } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Avatar from "@mui/material/Avatar";
import axios from 'axios';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "500px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};
const Sede = ({ filteredProfessionals, setSelectedProfessional, notProfessional }) => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [open, setOpen] = React.useState(false);
  const [professionalId, setProfessionalId] = React.useState("");
  const [detailsProfessional, setDetailsProfessional] = React.useState(null);

  const handleOpen = (professionalId) => {
    setProfessionalId(professionalId)
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  
   const DetailsProfessional = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/professional/${professionalId}`);
      setDetailsProfessional(res.data.data)
    } catch (error) {
      console.log(error)
    }
   }
  
   React.useEffect(() => {
    if (professionalId) {
      DetailsProfessional();
    }
  }, [professionalId]);
  
  const handleSelect = (professional) => {
    setSelectedProfessional(professional);
  
    localStorage.setItem("selectedProfessional", JSON.stringify(professional));
  
  };
  
  
  return (
    <div id="sede" className={styles.container_sede}>

        {Array.isArray(filteredProfessionals) && filteredProfessionals.length > 0 ? (
      <>
        <h1>SELECCIONAR SEDE</h1>
        <div className={styles.hr}></div>
        <div className={styles.locations_list}>
            <div>
              {filteredProfessionals.map((prof, index) => (
                <div key={index} className={styles.location_card}>
            
                  <Avatar
                    src={prof && prof.image}
                    sx={{
                      backgroundColor: prof && prof.backgroundColor,
                      width: "100px",
                      height: "100px",
                      borderRadius: "10px",
                      objectFit: "cover"
                    }}
                  >
                    {prof && prof.image ? null : prof && prof.name[0]}
                  </Avatar>
                  <div className={styles.location_info}>
                    <h2>
                      Dr(a) {prof.name} {prof.lastName}
                    </h2>
                    <p>{prof.specialty}</p>

                    <p>RNE: {prof.specialty_number_rne}</p>

                    <span className={styles.link} onClick={() => handleOpen(prof.id)}>
                      Ver Más información
                    </span>
                    <br />
                    <span className={styles.link}
                     onClick={() => handleSelect(prof)}
                    >Seleccionar</span>
                  </div>
                </div>
              ))}
            </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
              <div key={detailsProfessional && detailsProfessional.id} className={styles.profile}>
          <Avatar
            src={detailsProfessional && detailsProfessional.image}
            sx={{
              backgroundColor: detailsProfessional && detailsProfessional.backgroundColor,
              width: "200px",
              height: "200px",
              marginBottom: "15px",
              border: "4px solid #f0f0f0",
              transition: "borderColor 0.3s",
              borderRadius: "10px",
              objectFit: "cover",
              margin: "auto",
            }}
          >
            {detailsProfessional && detailsProfessional.image ? null : detailsProfessional &&  detailsProfessional.name[0]}
          </Avatar>
          <h2 className={styles.name}>
            { detailsProfessional && detailsProfessional.name} {detailsProfessional && detailsProfessional.lastName}
          </h2>
          <p className={styles.specialty}>{detailsProfessional && detailsProfessional.specialty}</p>
          <p>RNE: {detailsProfessional && detailsProfessional.specialty_number_rne}</p>
          <p>Correo: {detailsProfessional && detailsProfessional.email}</p>
          <p>Teléfono: {detailsProfessional && detailsProfessional.phone}</p>
          <p>Provincia: {detailsProfessional && detailsProfessional.province}</p>
          <p>Distrito: {detailsProfessional && detailsProfessional.district}</p>
   
        </div>
              </Box>
            </Fade>
          </Modal>
        </div>
      </>
     ) : (
      
notProfessional && (

  <>
      <h1>SELECCIONAR SEDE</h1>
        <div>No se encontro el resultado</div>
      </>
) 
      )}
    </div>
  );
};

export default Sede;
