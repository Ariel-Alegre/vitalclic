import React, { useState } from "react";
import styles from "../../styles/Home/Form.module.css";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Form({ allSede,setMode, mode ,setSpecialty, specialtyInperson, districtInperson, provinceInperson, departmentInperson, setSpecialtyInperson, setProvinceInperson, setDepartmentInperson, setDistrictInperson}) {
  const navigate = useNavigate()  
  
  const [token, setToken] = React.useState("");
    const [role, setRole] = React.useState("");
      const [user, setUser] = React.useState(null);
    
    console.log(role)
    const dataPersonal = async () => {
      try {
        const tokenFromStorage = localStorage.getItem("token"); // Obtener el token directamente
        if (!tokenFromStorage) {
          throw new Error("Token no encontrado en localStorage");
        }
        const response = await axios.get(
          `https://vitalclic-production.up.railway.app/api/datapersonal`,
          {
            headers: {
              Authorization: tokenFromStorage, // Usa el token aquí
              "Content-Type": "application/json",
            },
          }
        );
  
        setUser(response.data);
        setRole(response.data.role);
      } catch (error) {
        console.error("Error al obtener los detalles:", error);
      } finally {
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
  const especialidades = [
    "Cardiología", "Dermatología", "Gastroenterología", "Neurología",
    "Pediatría", "Psiquiatría", "Ginecología", "Oftalmología", "Ortopedia", "Urología", "Traumatólogo","Clinico"
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

  React.useEffect(() => {
    if (mode === "Presencial") {
     localStorage.removeItem("specialty"); // Guarda la fecha formateada en localStorage
     localStorage.removeItem("selectedDate"); // Guarda la fecha formateada en localStorage
     localStorage.removeItem("selectedTime"); // Guarda la fecha formateada en localStorage
     setSpecialty(null)
    }

    if (mode === "Virtual") {
      localStorage.removeItem("inpersonData"); // Guarda la fecha formateada en localStorage
      setSpecialtyInperson(null)
      setProvinceInperson(null)
      setDepartmentInperson(null)
      setDistrictInperson(null)
      setDistrictInperson(null)

      
      localStorage.removeItem("selectedSede"); // Guarda la fecha formateada en localStorage
      localStorage.removeItem("selectedDateInPerson"); // Guarda la fecha formateada en localStorage
      localStorage.removeItem("selectedTimeInPerson"); // Guarda la fecha formateada en localStorage



    }
  }, [mode]);


  const handleVirtualSubmit = (e) => {
    e.preventDefault();

    try {

      if(token) {

        // Obtenemos la especialidad seleccionada
        const selectedSpecialty = e.target[0].value; // El valor del primer select
        
        setSpecialty(selectedSpecialty)
        // Filtramos los profesionales por la especialidad seleccionada
        
        localStorage.setItem("specialty", selectedSpecialty); // Guarda la fecha formateada en localStorage
        
        window.location.href = "#date"
      } else {
        navigate("/iniciar-sesión")
      }
        
    
    } catch (error) {
      console.log(error);
    }
  };
  


  const handlePresencialSubmit = (e) => {
    e.preventDefault();
  
    try {
      if(token) {

               // Crear un objeto con las variables
      const inpersonData = {
        specialty: specialtyInperson ,
        province: provinceInperson ,
        department: departmentInperson ,
        district: districtInperson ,
      };



  
      if (specialtyInperson && provinceInperson && departmentInperson ) {
     localStorage.setItem("inpersonData", JSON.stringify(inpersonData));
    
     window.location.href = "#sede";
   } else {
    alert("Completar los campos")
   }
  }  else {
    navigate("/iniciar-sesión")
  }
    } catch (error) {
      console.log(error);
    } finally {
      allSede()
    }
  };
  


 
  const handleSpecialtyChange = (e) => {
    setSpecialtyInperson(e.target.value);
  };

  const handleDistritoChange = (e) => {
    setDistrictInperson(e.target.value);
  };


  const handleDepartamentoChange = (e) => {
    const departamentoSeleccionado = e.target.value;
    setDepartmentInperson(departamentoSeleccionado);
    setProvinceInperson(''); // Resetea la provincia al cambiar el departamento
    setDistrictInperson(''); // Resetea el distrito al cambiar el departamento
  };
  const handleProvinciaChange = (e) => {
    const provinciaSeleccionada = e.target.value;
    setProvinceInperson(provinciaSeleccionada);
    setDistrictInperson(''); // Resetea el distrito al cambiar la provincia
  };
  
  return (
    <div id="form">
  <div className={styles.homeContainer}>
    <div className={styles.logo}>
      <img src={require("../../assets/Images/logo.png")} alt="Logo" />
    </div>
    <div>
      
    </div>
    <div className={styles.SearchForm_container}>
      <h2>Encuentra tu especialista y agenda una cita</h2>
      <div className={styles.modeToggle}>
        <button
          className={`${styles.button} ${mode === "Presencial" ? styles.active : ""}`}
          onClick={() => setMode("Presencial")}
        >
          Presencial
        </button>
        <button
          className={`${styles.button} ${mode === "Virtual" ? styles.active : ""}`}
          onClick={() => setMode("Virtual")}
        >
          Virtual
        </button>
      </div>

      {/* Formulario para PRESENCIAL */}
      {mode === "Presencial" && (
        <form onSubmit={handlePresencialSubmit} className={styles.form}>
          <select className={styles.select} onChange={handleSpecialtyChange}  value={specialtyInperson}>
            <option>Especialidad</option>
            {especialidades.map((especialidad, index) => (
              <option key={index} value={especialidad}>
                {especialidad}
              </option>
            ))}
          </select>
          <select
            className={styles.select}
            value={departmentInperson}
            onChange={handleDepartamentoChange}
          >
            <option>Departamento</option>
            {departamentos.map((departamento, index) => (
              <option key={index} value={departamento}>
                {departamento}
              </option>
            ))}
          </select>
          <select
            className={styles.select}
            value={provinceInperson}
            onChange={handleProvinciaChange}
            disabled={!departmentInperson}
          >
            <option>Provincia</option>
            {departmentInperson && provincias[departmentInperson] ? (
              provincias[departmentInperson].map((provincia, index) => (
                <option key={index} value={provincia}>
                  {provincia}
                </option>
              ))
            ) : (
              <option disabled>No disponible</option>
            )}
          </select>
      <select
      className={styles.select}
        value={districtInperson}
        onChange={handleDistritoChange}
        disabled={!provinceInperson}
      >
        <option value="">Seleccione un distrito</option>
        {provinceInperson &&
          distritos[departmentInperson]?.[provinceInperson]?.map(
            (distrito) => (
              <option key={distrito} value={distrito}>
                {distrito}
              </option>
            )
          )}
      </select>

          <button type="submit" className={styles.searchButton}>
            Buscar{" "}
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
          </button>
        </form>
      )}

      {/* Formulario para VIRTUAL */}
      {mode === "Virtual" && (
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
            Buscar {" "}
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
