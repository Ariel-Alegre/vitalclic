import React, { useState, useEffect } from 'react';
import styles from '../../styles/Home/TimeSelector.module.css';
import { useLocation } from "react-router-dom";

const TimeSelector = ({ selectedDate,selectedTime , setSelectedTime}) => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 200);

  }, [pathname]);
  const times = Array.from({ length: 24 }, (_, i) => i);

  // Recuperar el horario seleccionado desde localStorage al montar el componente


  const handleClick = (time) => {
    setSelectedTime(time);
    localStorage.setItem("selectedTime", time); // Guarda la hora seleccionada en localStorage
    window.location.href = "#patient"
  
  };

  return (
    <div id="time">
      <br />
      <br />
      {selectedDate && (
        <>
          <div className={styles.container}>
            <h2 className={styles.title}>SELECCIONAR HORA</h2>
            <div className={styles.grid}>
              {times.map((time) => (
                <div
                  key={time}
                  className={`${styles.time} ${selectedTime === time ? styles.selected : ''}`}
                  onClick={() => handleClick(time)}
                >
                  {`${time}:00`}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TimeSelector;
