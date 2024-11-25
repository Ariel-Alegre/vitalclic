import React, { useState } from "react";
import styles from "../../styles/Home/Form.module.css";
import SearchIcon from "@mui/icons-material/Search";

export default function Form({ setSpecialty}) {
  const [mode, setMode] = useState("PRESENCIAL");
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [selectedProvincia, setSelectedProvincia] = useState("");
  const [selectedDistrito, setSelectedDistrito] = useState("");
  const especialidades = [
    "Cardiología", "Dermatología", "Gastroenterología", "Neurología",
    "Pediatría", "Psiquiatría", "Ginecología", "Oftalmología", "Ortopedia", "Urología", "Traumatólogoo","Clinico"
  ];

  const departamentos = [
    "Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca",
    "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad",
    "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco",
    "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"
  ];

  const provincias = {
    "Amazonas": ["Chachapoyas", "Bagua", "Bongará", "Condorcanqui", "Luya", "Rodríguez de Mendoza", "Utcubamba"],
    "Áncash": ["Huaraz", "Aija", "Antonio Raymondi", "Asunción", "Bolognesi", "Carhuaz", "Carlos Fermín Fitzcarrald", "Casma", "Corongo", "Huari", "Huarmey", "Huaylas", "Mariscal Luzuriaga", "Ocros", "Pallasca", "Pomabamba", "Recuay", "Santa", "Sihuas", "Yungay"],
    "Apurímac": ["Abancay", "Andahuaylas", "Antabamba", "Aymaraes", "Cotabambas", "Chincheros", "Grau"],
    "Arequipa": ["Arequipa", "Camana", "Caraveli", "Castilla", "Caylloma", "Condesuyos", "Islay", "La Unión"],
    "Ayacucho": ["Huamanga", "Cangallo", "Huanca Sancos", "Huanta", "La Mar", "Lucanas", "Parinacochas", "Páucar del Sara Sara", "Sucre", "Víctor Fajardo", "Vilcas Huamán"],
    "Cajamarca": ["Cajamarca", "Cajabamba", "Celendín", "Chota", "Contumazá", "Cutervo", "Hualgayoc", "Jaén", "San Ignacio", "San Marcos", "San Miguel", "San Pablo", "Santa Cruz"],
    "Cusco": ["Cusco", "Acomayo", "Anta", "Calca", "Canas", "Canchis", "Chumbivilcas", "Espinar", "La Convención", "Paruro", "Paucartambo", "Quispicanchi", "Urubamba"],
    "Huancavelica": ["Huancavelica", "Acobamba", "Angaraes", "Castrovirreyna", "Churcampa", "Huaytará", "Tayacaja"],
    "Huánuco": ["Huánuco", "Ambo", "Dos de Mayo", "Huacaybamba", "Huamalíes", "Leoncio Prado", "Marañón", "Pachitea", "Puerto Inca", "Lauricocha", "Yarowilca"],
    "Ica": ["Ica", "Chincha", "Nazca", "Palpa", "Pisco"],
    "Junín": ["Huancayo", "Chanchamayo", "Concepción", "Jauja", "Junín", "Satipo", "Tarma", "Yauli", "Chupaca"],
    "La Libertad": ["Trujillo", "Ascope", "Bolívar", "Chepén", "Julcán", "Otuzco", "Pacasmayo", "Pataz", "Sánchez Carrión", "Santiago de Chuco", "Gran Chimú", "Virú"],
    "Lambayeque": ["Chiclayo", "Ferreñafe", "Lambayeque"],
    "Lima": ["Lima", "Barranca", "Cajatambo", "Canta", "Cañete", "Huaral", "Huarochirí", "Huaura", "Oyón", "Yauyos"],
    "Loreto": ["Maynas", "Alto Amazonas", "Datem del Marañón", "Loreto", "Mariscal Ramón Castilla", "Putumayo", "Requena", "Ucayali"],
    "Madre de Dios": ["Tambopata", "Manu", "Tahuamanu"],
    "Moquegua": ["Mariscal Nieto", "General Sánchez Cerro", "Ilo"],
    "Pasco": ["Pasco", "Daniel Alcides Carrión", "Oxapampa"],
    "Piura": ["Piura", "Ayabaca", "Huancabamba", "Morropón", "Paita", "Sechura", "Sullana", "Talara"],
    "Puno": ["Puno", "Azángaro", "Carabaya", "Chucuito", "El Collao", "Huancané", "Lampa", "Melgar", "Moho", "San Antonio de Putina", "San Román", "Sandia", "Yunguyo"],
    "San Martín": ["Moyobamba", "Bellavista", "El Dorado", "Huallaga", "Lamas", "Mariscal Cáceres", "Picota", "Rioja", "San Martín", "Tocache"],
    "Tacna": ["Tacna", "Candarave", "Jorge Basadre", "Tarata"],
    "Tumbes": ["Tumbes", "Contralmirante Villar", "Zarumilla"],
    "Ucayali": ["Coronel Portillo", "Atalaya", "Padre Abad", "Purús"]
  };
  

  const distritos = {
    "Amazonas": {
      "Chachapoyas": ["Chachapoyas", "Asunción", "Balsas", "Levanto", "Cuispes"],
      "Bagua": ["Bagua", "Aramango", "Copallín", "El Parco", "Imaza"],
      "Bongará": ["Jumbilla", "Chirimoto", "Cocabamba", "Huampami"],
      "Condorcanqui": ["Nieva", "El Cenepa", "Santiago", "San Pablo"],
      "Luya": ["Luya", "Cocabamba", "Chirimoto", "Longuita", "Pomacocha"],
      "Rodríguez de Mendoza": ["Rodríguez de Mendoza", "Chuquibamba", "Limón", "Caspisapa"],
      "Utcubamba": ["Bagua Grande", "Cajaruro", "Jazán", "Sacanche", "La Peca"]
    },
    "Áncash": {
      "Huaraz": ["Huaraz", "Independencia", "Olleros", "Pira", "Recuay"],
      "Aija": ["Aija", "Coris", "Suingue", "Chingas"],
      "Antonio Raymondi": ["Jangas", "Pampas", "San Luis", "Yungay"],
      "Asunción": ["Asunción", "Santa Rosa", "Chavín de Huántar"],
      "Bolognesi": ["Chiquián", "La Primavera", "San Luis de Chavín"],
      "Carhuaz": ["Carhuaz", "Mancos", "Shilla", "Yungar"],
      "Carlos Fermín Fitzcarrald": ["San Nicolás", "Ticllos", "Huasta"],
      "Casma": ["Casma", "Yaután", "Comandante Noel", "Culebras"],
      "Corongo": ["Corongo", "Aco", "Andamarca", "Pampas", "Caurín"],
      "Huari": ["Huari", "San Marcos", "San Pedro", "Cajacay", "María Parado de Bellido"],
      "Huarmey": ["Huarmey", "Culebras", "Lima", "Jirca"],
      "Huaylas": ["Caraz", "Huallanca", "Chavín de Huántar", "Santa Cruz"],
      "Mariscal Luzuriaga": ["Carhuaz", "Santa Cruz"],
      "Ocros": ["Ocros", "Huaylas", "Ayapoto"],
      "Pallasca": ["Bolognesi", "Pampa de los Naranjos", "Cajacay"],
      "Pomabamba": ["Pomabamba", "Conchucos"],
      "Recuay": ["Recuay", "Casma", "Independencia"],
      "Santa": ["Santa", "Chimbote", "Samanco"],
      "Sihuas": ["Sihuas", "Catahuasi", "Cahuapaza"],
      "Yungay": ["Yungay", "Caraz", "Santa Cruz"]
    },
    "Lima": {
      "Lima": ["Miraflores", "San Isidro", "Surco", "San Borja", "Magdalena"],
      "Barranca": ["Barranca", "Pativilca", "Supe", "Paramonga"],
      "Cajatambo": ["Cajatambo", "Miraflores", "Gorgor", "Pacaraos"],
      "Canta": ["Canta", "Huamantanga", "Yauyos", "Churín"],
      "Cañete": ["Cañete", "San Vicente", "Imperial", "Asia", "Calango"],
      "Huaral": ["Huaral", "Chancay", "Aucallama", "Ihuarí"],
      "Huarochirí": ["Matucana", "San Mateo", "Chosica", "San Pedro de Casta"],
      "Huaura": ["Huaura", "Vegueta", "Santa María", "Churín"],
      "Oyón": ["Oyón", "Santa Rosa", "Caujul"],
      "Yauyos": ["Yauyos", "Ayauca", "Azángaro", "Tantará"]
    },
    "Cusco": {
      "Cusco": ["San Jerónimo", "San Sebastián", "Wanchaq", "Santiago", "Ccorca"],
      "Urubamba": ["Yucay", "Urubamba", "Machupicchu", "Ollantaytambo"],
      "Acomayo": ["Acomayo", "Acos", "Pomacanchi", "Rondocancha"],
      "Anta": ["Anta", "Huarocondo", "Mollepata"],
      "Calca": ["Calca", "Urubamba", "Pisac", "Yucay"],
      "Canas": ["Canas", "Tinta", "Yauri", "Checca"],
      "Canchis": ["Sicuani", "Checacupe", "Paucarpata"],
      "Chumbivilcas": ["Chumbivilcas", "Colquemarca", "Vasco"],
      "Espinar": ["Espinar", "Coporaque", "Condoroma", "Pallpata"],
      "La Convención": ["Santa Teresa", "La Convención", "Vilcabamba", "Quillabamba"],
      "Paruro": ["Paruro", "Huarocondo", "Llaucano"],
      "Paucartambo": ["Paucartambo", "Kosñipata"],
      "Quispicanchi": ["Quiquijana", "Ccatca", "San Salvador"],
      "Urubamba": ["Yucay", "Urubamba", "Machupicchu", "Ollantaytambo"]
    },
    "Ica": {
      "Ica": ["Ica", "Chincha", "Nazca", "Palpa", "Pisco"],
      "Chincha": ["Chincha", "El Carmen", "Sunampe"],
      "Nazca": ["Nazca", "El Ingenio", "Vista Alegre"],
      "Palpa": ["Palpa", "Tambo de Mora"],
      "Pisco": ["Pisco", "San Andrés", "Paracas"]
    },
    // Agrega el resto de provincias y distritos aquí.
  };
  




  const handleVirtualSubmit = (e) => {
    e.preventDefault();

    try {
      // Obtenemos la especialidad seleccionada
      const selectedSpecialty = e.target[0].value; // El valor del primer select

      if (!selectedSpecialty) {
        console.log("Por favor, seleccione una especialidad");
        return;
      }
      setSpecialty(selectedSpecialty)
      // Filtramos los profesionales por la especialidad seleccionada
   
      localStorage.setItem("specialty", selectedSpecialty); // Guarda la fecha formateada en localStorage
        
        window.location.href = "#date"
    
    } catch (error) {
      console.log(error);
    }
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
  const handleDepartamentoChange = (e) => {
    const departamentoSeleccionado = e.target.value;
    setSelectedDepartamento(departamentoSeleccionado);
    setSelectedProvincia(''); // Resetea la provincia al cambiar el departamento
    setSelectedDistrito(''); // Resetea el distrito al cambiar el departamento
  };
  
  const handleProvinciaChange = (e) => {
    const provinciaSeleccionada = e.target.value;
    setSelectedProvincia(provinciaSeleccionada);
    setSelectedDistrito(''); // Resetea el distrito al cambiar la provincia
  };
  
  return (
    <div id="form">
  <div className={styles.homeContainer}>
    <div className={styles.logo}>
      <img src={require("../../assets/Images/logo.png")} alt="Logo" />
    </div>
    <div className={styles.SearchForm_container}>
      <h2>Encuentra tu especialista y agenda cita</h2>
      <div className={styles.modeToggle}>
        <button
          className={`${styles.button} ${mode === "PRESENCIAL" ? styles.active : ""}`}
          onClick={() => setMode("PRESENCIAL")}
        >
          PRESENCIAL
        </button>
        <button
          className={`${styles.button} ${mode === "VIRTUAL" ? styles.active : ""}`}
          onClick={() => setMode("VIRTUAL")}
        >
          VIRTUAL
        </button>
      </div>

      {/* Formulario para PRESENCIAL */}
      {mode === "PRESENCIAL" && (
        <form onSubmit={handlePresencialSubmit} className={styles.form}>
          <select className={styles.select}>
            <option>ESPECIALIDAD</option>
            {especialidades.map((especialidad, index) => (
              <option key={index} value={especialidad}>
                {especialidad}
              </option>
            ))}
          </select>
          <select
            className={styles.select}
            value={selectedDepartamento}
            onChange={handleDepartamentoChange}
          >
            <option>DEPARTAMENTO</option>
            {departamentos.map((departamento, index) => (
              <option key={index} value={departamento}>
                {departamento}
              </option>
            ))}
          </select>
          <select
            className={styles.select}
            value={selectedProvincia}
            onChange={handleProvinciaChange}
            disabled={!selectedDepartamento}
          >
            <option>PROVINCIA</option>
            {selectedDepartamento && provincias[selectedDepartamento] ? (
              provincias[selectedDepartamento].map((provincia, index) => (
                <option key={index} value={provincia}>
                  {provincia}
                </option>
              ))
            ) : (
              <option disabled>No disponible</option>
            )}
          </select>
          <select className={styles.select}
          value={selectedDistrito}
          onChange={handleDistritoChange}
          disabled={!selectedProvincia}>
  <option>DISTRITO</option>
  {selectedDepartamento && selectedProvincia && distritos[selectedDepartamento] && distritos[selectedDepartamento][selectedProvincia] ? (
    distritos[selectedDepartamento][selectedProvincia].map((distrito, index) => (
      <option key={index} value={distrito}>
        {distrito}
      </option>
    ))
  ) : (
    <option disabled>No disponible</option>
  )}
</select>

          <button type="submit" className={styles.searchButton}>
            BUSCAR{" "}
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
          </button>
        </form>
      )}

      {/* Formulario para VIRTUAL */}
      {mode === "VIRTUAL" && (
        <form onSubmit={handleVirtualSubmit} className={styles.form}>
          <select className={styles.select}>
            <option value="">Seleccionar especialidad</option>
            {especialidades.map((especialidad, index) => (
              <option key={index} value={especialidad}>
                {especialidad}
              </option>
            ))}
          </select>
          <button type="submit" className={styles.searchButton}>
            BUSCAR{" "}
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
          </button>
        </form>
      )}
 
    </div>
  </div>
</div>

  );
}
