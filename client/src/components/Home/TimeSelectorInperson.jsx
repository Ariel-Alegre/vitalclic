import React, { useState, useEffect } from 'react';
import styles from '../../styles/Home/TimeSelector.module.css';
import { useLocation } from "react-router-dom";

const TimeSelectorInperson = ({allSede, selectedTimeInPerson , setSelectedTimeInperson, mode}) => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 200);

  }, [pathname]);
  const times = Array.from({ length: 24 }, (_, i) => i);

  // Recuperar el horario seleccionado desde localStorage al montar el componente


  const handleClick = (time) => {

    setSelectedTimeInperson(time);
    localStorage.setItem("selectedTimeInPerson", time); // Guarda la hora seleccionada en localStorage
    window.location.href = "#patientInPerson"
    allSede()

  };
  
  const selectedDateInPerson = localStorage.getItem("selectedDateInPerson");


  return (
    <div id="timeInperson">
      <br />
      <br />
      {selectedDateInPerson && mode === "PRESENCIAL" ? (
        <>
          <div className={styles.container}>
            <h2 className={styles.title}>SELECCIONAR HORA</h2>
            <div className={styles.grid}>
              {times.map((time) => (
                <div
                  key={time}
                  className={`${styles.time} ${selectedTimeInPerson === time ? styles.selected : ''}`}
                  onClick={() => handleClick(time)}
                >
                  {`${time}:00`}
                </div>
              ))}
            </div>
          </div>
        </>
      ):null}
    </div>
  );
};

export default TimeSelectorInperson;
