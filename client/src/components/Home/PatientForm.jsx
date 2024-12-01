import React, { useState } from "react";
import styles from "../../styles/Home/PatientForm.module.css"; // Importación de estilos con CSS Modules
import { useLocation } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const PatientForm = ({ selectedTime, specialty, selectedDate }) => {
  const { pathname } = useLocation();
  const [formData, setFormData] = useState({
    shifts: "Para mi",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    document_number: "",
    reason_for_shift: "",
    date: selectedDate,
    time: selectedTime,
    specialty: specialty,
  }); // Estado para manejar los datos del formulario
  const [loading, setLoading] = useState(false); // Estado de carga
  const [openAlertError, setOpenAlertError] = React.useState(false);
  const [openAlertSuccess, setOpenAlertSuccess] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [role, setRole] = React.useState("");
  const [token, setToken] = React.useState("");
 console.log(specialty)
  const handleCloseAlertError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertError(false);
  };

  const handleCloseAlertSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertSuccess(false);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  React.useEffect(() => {
    setFormData({
      date: selectedDate,
      time: selectedTime,
      specialty: specialty,
    });
  }, [specialty, selectedTime, selectedDate]);

  // Maneja cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activa el estado de carga
    setOpenAlertError(null); // Resetea el estado de error

    try {
      await axios.post("https://vitalclic-production.up.railway.app/api/online-shifts", formData);
      setTimeout(() => {
        setOpenAlertSuccess(true);
      }, 4000);

      localStorage.removeItem("selectedDate");
      localStorage.removeItem("selectedTime");
      localStorage.removeItem("specialty");
      setTimeout(() => {
        window.location.reload();
      }, 6000);
    } catch (err) {
      setOpenAlertError(true);
    } finally {
      setTimeout(() => {
        setLoading(false); // Finaliza el estado de carga
      }, 4000);
    }
  };

  const dataPersonal = async () => {
    try {
      const tokenFromStorage = localStorage.getItem("token"); // Obtener el token directamente
      if (!tokenFromStorage) {
        throw new Error("Token no encontrado en localStorage");
      }
      const response = await axios.get(`https://vitalclic-production.up.railway.app/api/datapersonal`, {
        headers: {
          Authorization: tokenFromStorage, // Usa el token aquí
          "Content-Type": "application/json",
        },
      });

      setUser(response.data);
      setRole(response.data.role);
    } catch (error) {
      console.error("Error al obtener los detalles:", error);
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  React.useEffect(() => {
    if (token) {
      dataPersonal();
    }
  }, [token]);

  // Efecto para actualizar los campos según la selección
  React.useEffect(() => {
    if (formData.shifts === "Para mi") {
      // Rellenar datos con el usuario principal
      setFormData((prev) => ({
        ...prev,
        name: user?.name || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        document_number: user?.document_number || "",

        
      }));
    } else {
      // Rellenar datos con el dependiente seleccionado
      const selectedDependent = user?.dependents?.find(
        (dep) => dep.name === formData.shifts
      );
      if (selectedDependent) {
        setFormData((prev) => ({
          ...prev,
          name: selectedDependent.name,
          lastName: selectedDependent.lastName || "",
          phone: user?.phone || "",

          email: user?.email || "",
          document_number: selectedDependent?.document_number || "",

        }));
      }
    }
  }, [formData.shifts, user, ]);


  return (
    <div id="patient">
      <br />
      <br />
      {selectedTime && (
        <>
          <div className={styles.formContainer}>
            <h2 className={styles.title}>DATOS DEL PACIENTE</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.label}>¿Para quién es el turno?</label>
              <select
              className={styles.input}
              name="shifts"
              value={formData.shifts}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar para quien es el turno</option>
                <option value="Para mi">
                Para mi
              </option>
              {user?.dependents?.map((data, index) => (
                <option key={index} value={data.name}>
                  {data.name}
                </option>
              ))}
            </select>

              <label className={styles.label}>Especialidad</label>
              <input
                type="text"
                className={styles.input}
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                disabled
                required
              />
              <label className={styles.label}>Fecha</label>
              <input
                type="text"
                className={styles.input}
                placeholder=""
                name="date"
                value={formData.date}
                onChange={handleChange}
              disabled


                required
              />
              <label className={styles.label}>Horario</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Ingrese sus nombres"
                name="time"
                onChange={handleChange}
                value={formData.time}
              disabled

                required
              />
              <label className={styles.label}>NOMBRES</label>
              <input
              type="text"
              className={styles.input}
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled

              readOnly
            />

              <label className={styles.label}>APELLIDOS</label>
              <input
              type="text"
              className={styles.input}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled

              required
            />

              <label className={styles.label}>EMAIL</label>
              <input
                type="email"
                className={styles.input}
                placeholder="Ingrese su correo electrónico"
                name="email"
                value={
                 formData.email
                }
                onChange={handleChange}
                disabled
              />

              <label className={styles.label}>TELÉFONO</label>
              <input
                type="tel"
                className={styles.input}
                placeholder="Ingrese su teléfono"
                name="phone"
                value={
                formData.phone
                }
                onChange={handleChange}
                required
              />

              {/* Mostrar campos adicionales solo si se selecciona "Para un familiar" */}
              {formData.shifts !== "Para mi" && (
                <>
                  <label className={styles.label}>Edad de {formData.shifts} </label>
                  <input
                    type="number"
                    className={styles.input}
                    placeholder="Ingrese la edad del familiar"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />

                  <label className={styles.label}>
                    Número de Documento de {formData.shifts}
                  </label>
                  <input
                    type="text"
                    name="document_number"
                    className={styles.input}
                    placeholder="Ingrese el número de documento del familiar"
                    value={formData.document_number}
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              <label className={styles.label}>Motivo del Turno</label>
              <textarea
                className={styles.input}
                placeholder="Especifique el motivo del turno"
                rows="4"
                name="reason_for_shift"
                value={formData.reason_for_shift}
                onChange={handleChange}
                required
              ></textarea>

              <button
                type="submit"
                className={styles.button}
                disabled={loading}
              >
                {loading ? "Enviando..." : "SEPARAR CITA"}
              </button>
            </form>
            <Snackbar
              open={openAlertError}
              autoHideDuration={4000}
              onClose={handleCloseAlertError}
            >
              <Alert
                onClose={handleCloseAlertError}
                severity="error"
                variant="filled"
              >
                Error en el servidor, no se envío el formulario.
              </Alert>
            </Snackbar>

            <Snackbar
              open={openAlertSuccess}
              autoHideDuration={4000}
              onClose={handleCloseAlertSuccess}
            >
              <Alert
                onClose={handleCloseAlertSuccess}
                severity="success"
                variant="filled"
              >
                Se envío el formulario.
              </Alert>
            </Snackbar>
          </div>
        </>
      )}
    </div>
  );
};

export default PatientForm;
