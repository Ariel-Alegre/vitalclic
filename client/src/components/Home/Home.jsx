import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Form from "react-bootstrap/Form";

const locations = [
  {
    name: "NOMBRE 1",
    description:
      "Lorem ipsum dolor sit amet, adipiscing elit. Sed a fringilla.",
    image: "https://via.placeholder.com/100",
    department: "Lima",
    province: "Lima",
    district: "Miraflores",
  },
  {
    name: "NOMBRE 2",
    description:
      "Lorem ipsum dolor sit amet, adipiscing elit. Sed a fringilla.",
    image: "https://via.placeholder.com/100",
    department: "Lima",
    province: "Lima",
    district: "San Isidro",
  },
  {
    name: "NOMBRE 3",
    description:
      "Lorem ipsum dolor sit amet, adipiscing elit. Sed a fringilla.",
    image: "https://via.placeholder.com/100",
    department: "Arequipa",
    province: "Arequipa",
    district: "Arequipa",
  },
  {
    name: "NOMBRE 4",
    description:
      "Lorem ipsum dolor sit amet, adipiscing elit. Sed a fringilla.",
    image: "https://via.placeholder.com/100",
    department: "Arequipa",
    province: "Islay",
    district: "Mollendo",
  },
];

const HomeComponent = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]); // Cambiado a array vacío
  const [activeTab, setActiveTab] = useState("home");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showLocations, setShowLocations] = useState(false); // Nuevo estado para controlar la visibilidad

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  const handleDepartmentChange = (e) => {
    const departmentName = e.target.value;
    setSelectedDepartment(departmentName);
    setSelectedProvince("");
    setSelectedDistrict("");
  };

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const departments = [
    ...new Set(locations.map((location) => location.department)),
  ];

  const provinces = selectedDepartment
    ? [
        ...new Set(
          locations
            .filter((location) => location.department === selectedDepartment)
            .map((location) => location.province)
        ),
      ]
    : [];

  const districts = selectedProvince
    ? [
        ...new Set(
          locations
            .filter((location) => location.province === selectedProvince)
            .map((location) => location.district)
        ),
      ]
    : [];

  const handleSearch = async () => {

    try {
      
  
    const results = await locations.filter((location) => {
      return (
        (selectedDepartment
          ? location.department === selectedDepartment
          : true) &&
        (selectedProvince ? location.province === selectedProvince : true) &&
        (selectedDistrict ? location.district === selectedDistrict : true)
      );
    });

    setFilteredLocations(results); // Actualiza las ubicaciones filtradas
    setShowLocations(true); // Muestra las ubicaciones después de la búsqueda
  } catch (error) {
      console.error('error home:', error)
  } finally {

    const sedeElement =  await document.getElementById("sede");
    if (sedeElement) {
       await sedeElement.scrollIntoView({ behavior: "smooth" });
    }
  }
    // Hacer scroll hacia el id 'sede'
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
      <div className="home-container">
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
                      <option key={index} value={department}>
                        {department}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    className="custom-select"
                    onChange={handleProvinceChange}
                    value={selectedProvince}
                    disabled={!selectedDepartment}
                  >
                    <option value="">PROVINCIA</option>
                    {provinces.map((province, index) => (
                      <option key={index} value={province}>
                        {province}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    className="custom-select"
                    onChange={handleDistrictChange}
                    value={selectedDistrict}
                    disabled={!selectedProvince}
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
              <button
                className={!selectedDistrict ? "" : "btn-search"}
                onClick={handleSearch}
                disabled={!selectedDistrict}
              >
                BUSCAR <SearchOutlinedIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mostrar bloque de sedes solo si se ha buscado y hay resultados */}

      <div id="sede" className={!showLocations ? "" : "container-sede"}>
        {showLocations && (
          <>
            <h1>SELECCIONAR SEDE</h1>
            <div className="locations-list">
              {filteredLocations.map((location, index) => (
                <div key={index} className="location-card">
                  <img
                    src={location.image}
                    alt="Sede"
                    className="location-image"
                  />
                  <div className="location-info">
                    <h2>{location.name}</h2>
                    <p>{location.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Mostrar mensaje si no se encontraron ubicaciones */}
      {showLocations && filteredLocations.length === 0 && (
        <p>No se encontraron ubicaciones.</p>
      )}
    </div>
  );
};

export default HomeComponent;
