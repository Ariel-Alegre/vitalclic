import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";

/* const departments = [
  {
    name: "Amazonas",
    provinces: [
      {
        name: "Chachapoyas",
        districts: [
          "Chachapoyas",
          "Asuncion",
          "Balsas",
          "Chiliquin",
          "Granada",
          "La Jalca",
          "Leimebamba",
          "Luya",
          "Molinopampa",
          "San Carlos",
          "San Isidro",
          "San Juan de Bagua",
          "Tingo",
        ],
      },
      {
        name: "Bagua",
        districts: [
          "Bagua",
          "Copallin",
          "El Parco",
          "La Peca",
          "Jamalca",
          "Cuispes",
        ],
      },
      {
        name: "Condorcanqui",
        districts: ["Niamazú", "El Cenepa", "Condorcanqui", "Chiriaco"],
      },
      {
        name: "Luya",
        districts: [
          "Luya",
          "Cocabamba",
          "Cochamal",
          "Jumbilla",
          "Longuita",
          "San Cristóbal",
          "Tingo",
          "Santo Tomás",
        ],
      },
      {
        name: "Rodríguez de Mendoza",
        districts: [
          "Rodríguez de Mendoza",
          "Chirimoto",
          "Longar",
          "Mariscal Castilla",
        ],
      },
      {
        name: "Utcubamba",
        districts: ["Bagua Grande", "Cajaruro", "Chiclayo", "Condorcanqui"],
      },
    ],
  },
  {
    name: "Áncash",
    provinces: [
      {
        name: "Huaraz",
        districts: [
          "Huaraz",
          "Cascapara",
          "Chavin de Huantar",
          "Huanchay",
          "Tarica",
        ],
      },
      {
        name: "Aija",
        districts: ["Aija", "Santiago de Aija", "La Merced", "Occre"],
      },
      {
        name: "Antonio Raymondi",
        districts: ["Antonio Raymondi", "San Luis", "Paltay"],
      },
      {
        name: "Asunción",
        districts: ["Asunción", "Jangas", "San Nicolás", "San Pablo"],
      },
      {
        name: "Bolognesi",
        districts: ["Bolognesi", "Chiquián", "La Primavera"],
      },
      {
        name: "Carhuaz",
        districts: ["Carhuaz", "Shilla", "Mato", "Pariacoto"],
      },
      {
        name: "Carlos Fermín Fitzcarrald",
        districts: ["Carlos Fermín Fitzcarrald", "Yungay", "Mancos", "Anta"],
      },
      {
        name: "Casma",
        districts: ["Casma", "Cerro de Pasco", "Yauyos"],
      },
      {
        name: "Huari",
        districts: ["Huari", "Cochabamba", "San Marcos", "Ragash"],
      },
      {
        name: "Huaylas",
        districts: ["Huaylas", "Caraz", "Huasta", "Mato"],
      },
      {
        name: "Pasco",
        districts: ["Pasco", "Pachitea"],
      },
      {
        name: "Sihuas",
        districts: ["Sihuas", "Quiches"],
      },
      {
        name: "Yungay",
        districts: ["Yungay", "Mancos", "Anta"],
      },
    ],
  },
  {
    name: "Apurímac",
    provinces: [
      {
        name: "Abancay",
        districts: [
          "Abancay",
          "Andahuaylas",
          "Chacoche",
          "Curahuasi",
          "Pampachiri",
        ],
      },
      {
        name: "Andahuaylas",
        districts: ["Andahuaylas", "Chacoche", "Huancarama", "Huamanguilla"],
      },
      {
        name: "Antabamba",
        districts: ["Antabamba", "El Oro", "Sabaino"],
      },
      {
        name: "Cotabambas",
        districts: ["Cotabambas", "Coyllurqui", "Tahuaycani"],
      },
      {
        name: "Chincheros",
        districts: ["Chincheros", "Cachora", "Huanipaca"],
      },
    ],
  },
  {
    name: "Arequipa",
    provinces: [
      {
        name: "Arequipa",
        districts: [
          "Arequipa",
          "Cayma",
          "Cerro Colorado",
          "Characato",
          "La Joya",
          "Miraflores",
          "Paucarpata",
          "San Juan de Dios",
          "San Lázaro",
        ],
      },
      {
        name: "Camana",
        districts: ["Camana", "Jose Maria Quimper", "Nuevas Cañadas"],
      },
      {
        name: "Caravelí",
        districts: ["Caraveli", "Chala", "Jaqui", "Lomas", "Quicacha"],
      },
      {
        name: "Castilla",
        districts: ["Castilla", "Ayo", "Nivin", "Ocoña"],
      },
      {
        name: "Caylloma",
        districts: ["Caylloma", "Chivay", "Maca", "Puno"],
      },
      {
        name: "Islay",
        districts: ["Islay", "Mollendo", "Arequipa"],
      },
      {
        name: "La Unión",
        districts: ["La Union", "Cahuacho", "Mariano Melgar"],
      },
    ],
  },
  {
    name: "Ayacucho",
    provinces: [
      {
        name: "Huamanga",
        districts: ["Ayacucho", "Acocro", "Andres Avelino Caceres"],
      },
      {
        name: "Cangallo",
        districts: ["Cangallo", "Chuschi", "Pucara"],
      },
      {
        name: "Huanta",
        districts: ["Huanta", "Huamanguilla", "Luricocha"],
      },
      {
        name: "La Mar",
        districts: ["La Mar", "San Miguel", "San Juan"],
      },
      {
        name: "Lucanas",
        districts: ["Lucanas", "Llamellin", "Laramate"],
      },
      {
        name: "Parinacochas",
        districts: ["Parinacochas", "Coracora"],
      },
      {
        name: "Páucar del Sara Sara",
        districts: ["Paucar del Sara Sara", "Sara Sara"],
      },
      {
        name: "Sucre",
        districts: ["Sucre", "San Juan", "San Pablo"],
      },
      {
        name: "Vilcas Huamán",
        districts: ["Vilcas Huamán", "Machu Picchu"],
      },
    ],
  },
  {
    name: "Cajamarca",
    provinces: [
      {
        name: "Cajamarca",
        districts: ["Cajamarca", "Baños del Inca", "Los Baños"],
      },
      {
        name: "Cajabamba",
        districts: ["Cajabamba", "Cujillo", "Pampa de los Leones"],
      },
      {
        name: "Celendín",
        districts: ["Celendín", "Chumuch", "Huamachuco"],
      },
      {
        name: "Chota",
        districts: ["Chota", "Llama", "Querocoto"],
      },
      {
        name: "Contumazá",
        districts: ["Contumazá", "Chocán"],
      },
      {
        name: "Cutervo",
        districts: ["Cutervo", "Santa Cruz"],
      },
      {
        name: "Hualgayoc",
        districts: ["Hualgayoc", "Chota"],
      },
      {
        name: "Jaén",
        districts: ["Jaén", "Bellavista", "Chontali"],
      },
      {
        name: "San Marcos",
        districts: ["San Marcos", "San Pedro", "San Pablo"],
      },
      {
        name: "San Miguel",
        districts: ["San Miguel", "Bambamarca", "Santiago de Chilcas"],
      },
      {
        name: "San Pablo",
        districts: ["San Pablo", "Olleros"],
      },
      {
        name: "Santa Cruz",
        districts: ["Santa Cruz", "San Fernando"],
      },
    ],
  },
  {
    name: "Callao",
    provinces: [
      {
        name: "Callao",
        districts: ["Callao", "La Perla", "La Punta"],
      },
    ],
  },
  {
    name: "Cusco",
    provinces: [
      {
        name: "Cusco",
        districts: ["Cusco", "San Sebastián", "Santiago"],
      },
      {
        name: "Acomayo",
        districts: ["Acomayo", "Accha"],
      },
      {
        name: "Anta",
        districts: ["Anta", "Zapata"],
      },
      {
        name: "Calca",
        districts: ["Calca", "Yucay"],
      },
      {
        name: "Canchis",
        districts: ["Canchis", "Sicuani"],
      },
      {
        name: "Chumbivilcas",
        districts: ["Chumbivilcas", "Ccapacmarca"],
      },
      {
        name: "Espinar",
        districts: ["Espinar", "Condoroma"],
      },
      {
        name: "La Convención",
        districts: ["La Convención", "Kimbiri"],
      },
      {
        name: "Paruro",
        districts: ["Paruro", "Paccaritambo"],
      },
      {
        name: "Paucartambo",
        districts: ["Paucartambo", "Chincero"],
      },
      {
        name: "Quispicanchi",
        districts: ["Quispicanchi", "Oropesa"],
      },
      {
        name: "Urubamba",
        districts: ["Urubamba", "Yucay"],
      },
    ],
  },
  {
    name: "Huancavelica",
    provinces: [
      {
        name: "Huancavelica",
        districts: ["Huancavelica", "Acobamba", "Angaraes"],
      },
      {
        name: "Castrovirreyna",
        districts: ["Castrovirreyna", "Chupamarca"],
      },
      {
        name: "Huaytará",
        districts: ["Huaytará", "Pachamarca"],
      },
      {
        name: "Tayacaja",
        districts: ["Tayacaja", "Pampas"],
      },
    ],
  },
  {
    name: "Huánuco",
    provinces: [
      {
        name: "Huánuco",
        districts: ["Huánuco", "Ambo", "Chinchao"],
      },
      {
        name: "Dos de Mayo",
        districts: ["Dos de Mayo", "San Miguel"],
      },
      {
        name: "Huaraz",
        districts: ["Huaraz", "Jacas"],
      },
      {
        name: "Lauricocha",
        districts: ["Lauricocha", "San Miguel"],
      },
      {
        name: "Leoncio Prado",
        districts: ["Leoncio Prado", "Rupa-Rupa"],
      },
      {
        name: "Pachitea",
        districts: ["Pachitea", "Pachachaca"],
      },
      {
        name: "Puerto Inca",
        districts: ["Puerto Inca", "Jocong"],
      },
      {
        name: "Tingo María",
        districts: ["Tingo María", "La Morada"],
      },
    ],
  },
  {
    name: "Ica",
    provinces: [
      {
        name: "Ica",
        districts: ["Ica", "La Tinguiña", "Los Molinos"],
      },
      {
        name: "Chincha",
        districts: ["Chincha", "Chincha Alta", "Chincha Baja"],
      },
      {
        name: "Nasca",
        districts: ["Nasca", "Pueblo Libre"],
      },
      {
        name: "Palpa",
        districts: ["Palpa", "Santa Cruz"],
      },
      {
        name: "Pisco",
        districts: ["Pisco", "San Andrés", "San Clemente"],
      },
    ],
  },
  {
    name: "Junín",
    provinces: [
      {
        name: "Huancayo",
        districts: ["Huancayo", "El Tambo", "Pampa Inalámbrica"],
      },
      {
        name: "Concepción",
        districts: ["Concepción", "Cochas", "Chanchamayo"],
      },
      {
        name: "Jauja",
        districts: ["Jauja", "Acolla", "Canayre"],
      },
      {
        name: "Junín",
        districts: ["Junín", "Huancayo", "San Luis"],
      },
      {
        name: "Pasco",
        districts: ["Pasco", "Pichanaki"],
      },
      {
        name: "Tarma",
        districts: ["Tarma", "La Union"],
      },
      {
        name: "Yauli",
        districts: ["Yauli", "San Pedro de Huancayo"],
      },
    ],
  },
  {
    name: "La Libertad",
    provinces: [
      {
        name: "Trujillo",
        districts: ["Trujillo", "La Esperanza", "El Porvenir"],
      },
      {
        name: "Bolívar",
        districts: ["Bolívar", "Bajo Eten"],
      },
      {
        name: "Chepén",
        districts: ["Chepén", "Pueblo Nuevo"],
      },
      {
        name: "Gran Chimú",
        districts: ["Gran Chimú", "Cascas"],
      },
      {
        name: "Julcán",
        districts: ["Julcán", "Huamachuco"],
      },
      {
        name: "Otuzco",
        districts: ["Otuzco", "Santiago de Chuco"],
      },
      {
        name: "Pacasmayo",
        districts: ["Pacasmayo", "San Pedro"],
      },
      {
        name: "Pataz",
        districts: ["Pataz", "Tocmoche"],
      },
      {
        name: "Santiago de Chuco",
        districts: ["Santiago de Chuco", "Marmot"],
      },
      {
        name: "Virú",
        districts: ["Virú", "Chao"],
      },
    ],
  },
  {
    name: "Lambayeque",
    provinces: [
      {
        name: "Chiclayo",
        districts: ["Chiclayo", "La Victoria", "Reque"],
      },
      {
        name: "Chiclayo",
        districts: ["Chiclayo", "Tucume", "Lambayeque"],
      },
      {
        name: "Ferreñafe",
        districts: ["Ferreñafe", "Eten"],
      },
      {
        name: "Lambayeque",
        districts: ["Lambayeque", "Monsefu"],
      },
    ],
  },
  {
    name: "Lima",
    provinces: [
      {
        name: "Lima",
        districts: [
          "Lima",
          "Miraflores",
          "San Isidro",
          "San Borja",
          "San Miguel",
        ],
      },
      {
        name: "Canta",
        districts: ["Canta", "Huamantanga"],
      },
      {
        name: "Huaral",
        districts: ["Huaral", "Acos"],
      },
      {
        name: "Huarochirí",
        districts: ["Huarochirí", "San Mateo"],
      },
      {
        name: "Jauja",
        districts: ["Jauja", "Cochas"],
      },
      {
        name: "Lima",
        districts: ["Lima", "Chancay"],
      },
      {
        name: "Yauyos",
        districts: ["Yauyos", "Cochas"],
      },
    ],
  },
  {
    name: "Loreto",
    provinces: [
      {
        name: "Iquitos",
        districts: ["Iquitos", "Alto Nanay", "Morona"],
      },
      {
        name: "Alto Amazonas",
        districts: ["Alto Amazonas", "Yurimaguas", "Teniente Manuel Clavero"],
      },
      {
        name: "Loreto",
        districts: ["Loreto", "San Pablo", "Laguna"],
      },
      {
        name: "Mariscal Ramón Castilla",
        districts: ["Mariscal Ramón Castilla", "Santa Rosa"],
      },
      {
        name: "Requena",
        districts: ["Requena", "Pichana", "Yaquerana"],
      },
      {
        name: "Ucayali",
        districts: ["Ucayali", "Tigre"],
      },
    ],
  },
  {
    name: "Madre de Dios",
    provinces: [
      {
        name: "Tambopata",
        districts: ["Tambopata", "Puerto Maldonado"],
      },
      {
        name: "Manu",
        districts: ["Manu", "Pillcopata"],
      },
      {
        name: "Tahuamanu",
        districts: ["Tahuamanu", "Iñapari"],
      },
    ],
  },
  {
    name: "Moquegua",
    provinces: [
      {
        name: "Moquegua",
        districts: ["Moquegua", "Torata"],
      },
      {
        name: "Ilo",
        districts: ["Ilo", "El Algarrobal"],
      },
      {
        name: "Mariscal Nieto",
        districts: ["Mariscal Nieto", "San Antonio"],
      },
    ],
  },
  {
    name: "Pasco",
    provinces: [
      {
        name: "Pasco",
        districts: ["Pasco", "Chaupimarca"],
      },
      {
        name: "Daniel Alcides Carrión",
        districts: ["Daniel Alcides Carrión", "Yanahuanca"],
      },
      {
        name: "Oxapampa",
        districts: ["Oxapampa", "Villa Rica"],
      },
    ],
  },
  {
    name: "Piura",
    provinces: [
      {
        name: "Piura",
        districts: ["Piura", "Castilla", "La Unión"],
      },
      {
        name: "Ayabaca",
        districts: ["Ayabaca", "Frías"],
      },
      {
        name: "Huancabamba",
        districts: ["Huancabamba", "Canchaque"],
      },
      {
        name: "Paita",
        districts: ["Paita", "Vichayal"],
      },
      {
        name: "Sullana",
        districts: ["Sullana", "Bellavista"],
      },
      {
        name: "Talara",
        districts: ["Talara", "El Alto"],
      },
    ],
  },
  {
    name: "Puno",
    provinces: [
      {
        name: "Puno",
        districts: ["Puno", "Pichacani"],
      },
      {
        name: "El Collao",
        districts: ["El Collao", "Ilave"],
      },
      {
        name: "Huancané",
        districts: ["Huancané", "Inambari"],
      },
      {
        name: "Lampa",
        districts: ["Lampa", "Santa Lucia"],
      },
      {
        name: "Melgar",
        districts: ["Melgar", "Ayaviri"],
      },
      {
        name: "San Román",
        districts: ["San Román", "Juliaca"],
      },
      {
        name: "Sandia",
        districts: ["Sandia", "Cuyocuyo"],
      },
      {
        name: "Yunguyo",
        districts: ["Yunguyo", "Copacabana"],
      },
    ],
  },
  {
    name: "San Martín",
    provinces: [
      {
        name: "San Martín",
        districts: ["San Martín", "Tarapoto"],
      },
      {
        name: "Bellavista",
        districts: ["Bellavista", "San Pablo"],
      },
      {
        name: "El Dorado",
        districts: ["El Dorado", "San José de Sisa"],
      },
      {
        name: "Huallaga",
        districts: ["Huallaga", "San Vicente"],
      },
      {
        name: "Lamas",
        districts: ["Lamas", "San Roque"],
      },
      {
        name: "Mariscal Cáceres",
        districts: ["Mariscal Cáceres", "Pillar"],
      },
      {
        name: "Picota",
        districts: ["Picota", "San Juan"],
      },
      {
        name: "Rioja",
        districts: ["Rioja", "Yuracyacu"],
      },
    ],
  },
  {
    name: "Tacna",
    provinces: [
      {
        name: "Tacna",
        districts: ["Tacna", "Cerro Blanco"],
      },
      {
        name: "Jorge Basadre",
        districts: ["Jorge Basadre", "Ilabaya"],
      },
      {
        name: "Tarata",
        districts: ["Tarata", "Locumba"],
      },
    ],
  },
  {
    name: "Tumbes",
    provinces: [
      {
        name: "Tumbes",
        districts: ["Tumbes", "Zorritos"],
      },
      {
        name: "Contralmirante Villar",
        districts: ["Contralmirante Villar", "La Matanza"],
      },
      {
        name: "Tumbes",
        districts: ["Tumbes", "San Jacinto"],
      },
    ],
  },
  {
    name: "Ucayali",
    provinces: [
      {
        name: "Pucallpa",
        districts: ["Pucallpa", "Yarinacocha"],
      },
      {
        name: "Atalaya",
        districts: ["Atalaya", "Sepahua"],
      },
      {
        name: "Coronel Portillo",
        districts: ["Coronel Portillo", "Calleria"],
      },
      {
        name: "Padre Abad",
        districts: ["Padre Abad", "Iparia"],
      },
      {
        name: "Purús",
        districts: ["Purús", "Purús"],
      },
    ],
  },
]; */
const departments = [
  {
    name: "Amazonas",
    provinces: [
      {
        name: "Chachapoyas",
        districts: [
          "Chachapoyas",
          "Asuncion",
          "Balsas",
          "Chiliquin",
          "Granada",
          "La Jalca",
          "Leimebamba",
          "Luya",
          "Molinopampa",
          "San Carlos",
          "San Isidro",
          "San Juan de Bagua",
          "Tingo",
        ],
      },
      {
        name: "Bagua",
        districts: [
          "Bagua",
          "Copallin",
          "El Parco",
          "La Peca",
          "Jamalca",
          "Cuispes",
        ],
      },
      {
        name: "Condorcanqui",
        districts: ["Niamazú", "El Cenepa", "Condorcanqui", "Chiriaco"],
      },
      {
        name: "Luya",
        districts: [
          "Luya",
          "Cocabamba",
          "Cochamal",
          "Jumbilla",
          "Longuita",
          "San Cristóbal",
          "Tingo",
          "Santo Tomás",
        ],
      },
      {
        name: "Rodríguez de Mendoza",
        districts: [
          "Rodríguez de Mendoza",
          "Chirimoto",
          "Longar",
          "Mariscal Castilla",
        ],
      },
      {
        name: "Utcubamba",
        districts: ["Bagua Grande", "Cajaruro", "Chiclayo", "Condorcanqui"],
      },
    ],
  },
  
     
];
function TabsComponent({
  locations,
  setSelectedProvince,
  selectedProvince,
  selectedDistrict,
  setSelectedDistrict,
  handleSearch,
}) {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  const handleDepartmentChange = (e) => {
    const departmentName = e.target.value;
    setSelectedDepartment(departmentName);
    const selectedDept = departments.find(
      (department) => department.name === departmentName
    );
    setProvinces(selectedDept ? selectedDept.provinces : []);
    setSelectedProvince(""); // Resetea la provincia seleccionada
    setDistricts([]); // Resetea los distritos
  };

  const handleProvinceChange = (e) => {
    const provinceName = e.target.value;
    setSelectedProvince(provinceName);
    const selectedProvince = provinces.find(
      (province) => province.name === provinceName
    );
    setDistricts(selectedProvince ? selectedProvince.districts : []);
    setSelectedDistrict(""); // Resetea el distrito seleccionado
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const specialties = [
    "Cardiología",
    "Neurología",
    "Oncología",
    "Pediatría",
    "Ginecología",
    "Traumatología",
    "Dermatología",
    "Psiquiatría",
    "Urología",
    "Endocrinología",
    "Oftalmología",
    "Neumología",
    "Gastroenterología",
    "Cirugía General",
    "Reumatología",
    "Nefrología",
    "Otorrinolaringología",
    "Hematología",
    "Radiología",
    "Medicina Interna",
  ];

  return (
    <div>
      <div className="logo-form">
        <img src={require("../../assets/Images/logo.png")} alt="Logo" />
      </div>
      <div className="tab-container">
        <div className="title-form">
          <span>Encuentra tu especialista y agenda cita</span>
        </div>
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "home" ? "active" : ""}`}
            onClick={() => handleTabClick("home")}
          >
            PRESENCIAL
          </button>
          <button
            className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => handleTabClick("profile")}
          >
            VIRTUAL
          </button>
        </div>

        {/* Contenido de las pestañas */}
        <div className="tab-content">
          {activeTab === "home" && (
            <div className="select">
              <Form.Select
                className="custom-select"
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                value={selectedSpecialty}
              >
                <option value="">Selecciona una especialidad</option>
                {specialties.map((specialty, index) => (
                  <option key={index} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                className="custom-select"
                onChange={handleDepartmentChange}
                value={selectedDepartment}
              >
                <option value="">DEPARTAMENTO</option>
                {departments.map((department, index) => (
                  <option key={index} value={department.name}>
                    {department.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                className="custom-select"
                onChange={handleProvinceChange}
                value={selectedProvince}
                disabled={!selectedDepartment} // Desactiva si no hay departamento seleccionado
              >
                <option value="">PROVINCIA</option>
                {provinces.map((province, index) => (
                  <option key={index} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                className="custom-select"
                onChange={handleDistrictChange}
                value={selectedDistrict}
                disabled={!selectedProvince} // Desactiva si no hay provincia seleccionada
              >
                <option value="">DISTRITO</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </Form.Select>
            </div>
          )}
          {activeTab === "profile" && <div>Tab content for Profile</div>}
        </div>
        <div>
          <button className="btn-search" onClick={handleSearch}>
            BUSCAR <SearchOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TabsComponent;
