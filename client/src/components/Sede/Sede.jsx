import React, { useState } from 'react';

const locations = [
  {
    name: "NOMBRE 1",
    description: "Lorem ipsum dolor sit amet, adipiscing elit. Sed a fringilla.",
    image: "https://via.placeholder.com/100",
    department: "Lima",
    province: "Lima",
    district: "Miraflores",
  },
  {
    name: "NOMBRE 2",
    description: "Lorem ipsum dolor sit amet, adipiscing elit. Sed a fringilla.",
    image: "https://via.placeholder.com/100",
    department: "Lima",
    province: "Lima",
    district: "San Isidro",
  },
  {
    name: "NOMBRE 3",
    description: "Lorem ipsum dolor sit amet, adipiscing elit. Sed a fringilla.",
    image: "https://via.placeholder.com/100",
    department: "Arequipa",
    province: "Arequipa",
    district: "Arequipa",
  },
  {
    name: "NOMBRE 4",
    description: "Lorem ipsum dolor sit amet, adipiscing elit. Sed a fringilla.",
    image: "https://via.placeholder.com/100",
    department: "Arequipa",
    province: "Islay",
    district: "Mollendo",
  },
];

const Sede = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(locations); // Inicializa con todas las ubicaciones

  // Función para obtener departamentos únicos
  const departments = [...new Set(locations.map(location => location.department))];

  // Función para obtener provincias únicas según el departamento seleccionado
  const provinces = selectedDepartment ? [...new Set(locations.filter(location => location.department === selectedDepartment).map(location => location.province))] : [];

  // Función para obtener distritos únicos según la provincia seleccionada
  const districts = selectedProvince ? [...new Set(locations.filter(location => location.province === selectedProvince).map(location => location.district))] : [];

  // Función para filtrar ubicaciones según los selectores
  const handleSearch = () => {
    const results = locations.filter(location => {
      return (
        (selectedDepartment ? location.department === selectedDepartment : true) &&
        (selectedProvince ? location.province === selectedProvince : true) &&
        (selectedDistrict ? location.district === selectedDistrict : true)
      );
    });
    setFilteredLocations(results);
  };

  return (
    <div className="container">
      <h1>SELECCIONAR SEDE</h1>
      <div className="filters">
        <select onChange={(e) => setSelectedDepartment(e.target.value)} value={selectedDepartment}>
          <option value="">Seleccionar Departamento</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>{dept}</option>
          ))}
        </select>

        <select onChange={(e) => setSelectedProvince(e.target.value)} value={selectedProvince} disabled={!selectedDepartment}>
          <option value="">Seleccionar Provincia</option>
          {provinces.map((prov, index) => (
            <option key={index} value={prov}>{prov}</option>
          ))}
        </select>

        <select onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict} disabled={!selectedProvince}>
          <option value="">Seleccionar Distrito</option>
          {districts.map((dist, index) => (
            <option key={index} value={dist}>{dist}</option>
          ))}
        </select>
        
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div className="locations-list">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location, index) => (
            <div key={index} className="location-card">
              <img src={location.image} alt="Sede" className="location-image" />
              <div className="location-info">
                <h2>{location.name}</h2>
                <p>{location.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron ubicaciones.</p>
        )}
      </div>
    </div>
  );
};

export default Sede;
