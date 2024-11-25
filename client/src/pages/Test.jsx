/* 
import React, { useState } from "react";
import styles from "../../styles/Home/Form.module.css";
import SearchIcon from "@mui/icons-material/Search";

export default function Home() {
  const [mode, setMode] = useState("PRESENCIAL");
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [selectedProvincia, setSelectedProvincia] = useState("");
  const [selectedDistrito, setSelectedDistrito] = useState("");

  const especialidades = [
    "Cardiología", "Dermatología", "Gastroenterología", "Neurología",
    "Pediatría", "Psiquiatría", "Ginecología", "Oftalmología", "Ortopedia", "Urología"
  ];

  const departamentos = [
    "Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca",
    "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad",
    "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco",
    "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"
  ];

  const provincias = {
    "Amazonas": ["Chachapoyas", "Bagua", "Bongará", "Condorcanqui", "Luya", "Rodríguez de Mendoza", "Utcubamba"],
    // Define otras provincias aquí...
  };

  const distritos = {
    "Amazonas": {
      "Chachapoyas": ["Chachapoyas", "Asunción", "Balsas", "Levanto", "Cuispes"],
      // Define otros distritos aquí...
    },
    // Define otros departamentos con sus provincias y distritos aquí...
  };

  const handleDepartamentoChange = (e) => {
    setSelectedDepartamento(e.target.value);
    setSelectedProvincia("");  // Resetea la provincia cuando se cambia el departamento
    setSelectedDistrito("");   // Resetea el distrito cuando se cambia el departamento
  };

  const handleProvinciaChange = (e) => {
    setSelectedProvincia(e.target.value);
    setSelectedDistrito("");   // Resetea el distrito cuando se cambia la provincia
  };

  const handleDistritoChange = (e) => {
    setSelectedDistrito(e.target.value);
  };

  const handlePresencialSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías enviar los datos del formulario o hacer alguna acción
    alert(`Formulario enviado: 
    Especialidad: ${mode} 
    Departamento: ${selectedDepartamento} 
    Provincia: ${selectedProvincia} 
    Distrito: ${selectedDistrito}`);
  };

  return (
    <form onSubmit={handlePresencialSubmit} className={styles.formContainer}>
      <div>
        <label>Especialidad</label>
        <select>
          {especialidades.map((especialidad, index) => (
            <option key={index} value={especialidad}>{especialidad}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Departamento</label>
        <select value={selectedDepartamento} onChange={handleDepartamentoChange}>
          <option value="">Selecciona un Departamento</option>
          {departamentos.map((departamento, index) => (
            <option key={index} value={departamento}>{departamento}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Provincia</label>
        <select
          value={selectedProvincia}
          onChange={handleProvinciaChange}
          disabled={!selectedDepartamento}
        >
          <option value="">Selecciona una Provincia</option>
          {selectedDepartamento &&
            provincias[selectedDepartamento]?.map((provincia, index) => (
              <option key={index} value={provincia}>{provincia}</option>
            ))}
        </select>
      </div>

      <div>
        <label>Distrito</label>
        <select
          value={selectedDistrito}
          onChange={handleDistritoChange}
          disabled={!selectedProvincia}
        >
          <option value="">Selecciona un Distrito</option>
          {selectedProvincia &&
            distritos[selectedDepartamento]?.[selectedProvincia]?.map((distrito, index) => (
              <option key={index} value={distrito}>{distrito}</option>
            ))}
        </select>
      </div>

      <div>
        <button type="submit">
          <SearchIcon />
          Buscar
        </button>
      </div>
    </form>
  );
}


*/