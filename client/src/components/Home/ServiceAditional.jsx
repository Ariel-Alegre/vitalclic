import React from 'react';
import styles from '../../styles/Home/ServiceAditional.module.css'; // Importando CSS Module

const ServiceAditional = () => {
  const servicios = [
    'MEDICO DE URGENCIAS',
    'ODONTOLOGÍA DE URGENCIAS',
    'TOPICO DE ENFERMERÍA',
    'LABORATORIO CLÍNICO',
    'DIAGNOSTICO POR IMÁGENES',
    'AMBULANCIA',
    'CENTRO DE VACUNACIÓN',
    'PEDIATRA DE URGENCIAS'
  ];

  return (
    <div className={styles.serviciosContainer}>
      <h2 className={styles.titulo}>SERVICIOS ADICIONALES</h2>
      <div className={styles.serviciosGrid}>
        {servicios.map((servicio, index) => (
          <div key={index} className={styles.servicioCard}>
            {servicio}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceAditional;
