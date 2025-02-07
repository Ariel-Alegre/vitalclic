import React from "react";
import styles from "../../styles/Home/Sede.module.css";
import { useLocation } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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

const Sede = ({ mode, sede, allSede, specialtyInperson, provinceInperson, departmentInperson}) => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [sedelId, setSedeId] = React.useState("");
  const [detailsSede, setDetailsSede] = React.useState(null);

  const handleClickOpen = (scrollType, sedeId) => {
    setOpen(true);
    setScroll(scrollType);
    setSedeId(sedeId);
  };

  const handleClose = () => setOpen(false);
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const DetailsSede = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/sede/${sedelId}`);
      setDetailsSede(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const inpersonData = JSON.parse(localStorage.getItem("inpersonData"));

    // Filtrar las sedes según country, department, y district
  const filteredSedes = sede.filter((prof) => {
    return (
      prof.province === inpersonData?.province &&
      (prof.specialty.includes(inpersonData?.specialty) || prof.specialty === inpersonData?.specialty)
    );
  });
  React.useEffect(() => {
    if (sedelId) {
      DetailsSede();
    }
  }, [sedelId]);

  const handleSelect = (sede) => {

    try {
      localStorage.setItem("selectedSede", JSON.stringify(sede));
      allSede()


    } catch (error) {
      console.log(error)
      
    } finally {
    setOpen(false);

      window.location.href = "#timeInperson"
    }
  
  };



  return (
    <div id="sede" className={styles.container_sede}>
      {specialtyInperson &&
      provinceInperson &&
      departmentInperson &&
      mode === "Presencial" ? (
        <>
          <h1>Seleccionar sede</h1>
          <div className={styles.hr}></div>
          <div className={styles.locations_list}>
            <div>
              {filteredSedes.length > 0 ? (
                filteredSedes.map((prof, index) => (
                  <div key={index} className={styles.location_card}>
                    <Avatar
                      src={prof && prof.image}
                      sx={{
                        backgroundColor: prof && prof.backgroundColor,
                        width: "100px",
                        height: "100px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    >
                      {prof && prof.image ? null : prof && prof.name[0]}
                    </Avatar>
                    <div className={styles.location_info}>
                      <h2>{prof.name}</h2>
                      <p>{prof.specialty.join(", ")}</p>

                      <p> {prof.address}</p>
                      <span
                        className={styles.link}
                        onClick={() => handleClickOpen("paper", prof.id)}
                      >
                        Ver Más información
                      </span>
                      <br />
                      <span
                        className={styles.link}
                        onClick={() => handleSelect(prof)}
                      >
                        Seleccionar
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No se encontraron resultados para la selección actual.</p>
              )}
            </div>

            <Dialog
              open={open}
              onClose={handleClose}
              scroll={scroll}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <DialogTitle id="scroll-dialog-title">
                {detailsSede && detailsSede.name}
              </DialogTitle>
              <DialogContent dividers={scroll === "paper"}>
                {detailsSede ? (
                  <div key={detailsSede.id} className={styles.profile}>
                    <Avatar
                      src={detailsSede.image}
                      sx={{
                        backgroundColor: detailsSede.backgroundColor,
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
                      {detailsSede.image ? null : detailsSede.name[0]}
                    </Avatar>
                    <h2 className={styles.name}>{detailsSede.name}</h2>
                    <p className={styles.specialty}>
                      Especialidad:{" "}
                      {detailsSede.specialty.join(", ") || "No especificada"}
                    </p>
                    <p>
                      RNE: {detailsSede.specialty_number_rne || "No disponible"}
                    </p>
                    <p>Correo: {detailsSede.email}</p>
                    <p>Teléfono: {detailsSede.phone}</p>
                    <p>Dirección: {detailsSede.address}</p>
                    <p>Provincia: {detailsSede.province}</p>
                    <p>Distrito: {detailsSede.district}</p>
                  </div>
                ) : (
                  <p>No hay información disponible.</p>
                )}
              </DialogContent>
              <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => handleSelect(detailsSede)}

                  sx={{
                    backgroundColor: "#53676c",
                    ":hover": { backgroundColor: "#69848BFF" },
                  }}
                >
                  Seleccionar
                </Button>
                <Button
                  onClick={handleClose}
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: "red",
                    ":hover": { backgroundColor: "red" },
                  }}
                >
                  Salir
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Sede;
