import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es'; // Importa la localización en español
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/Home/DatePickerComponent.css'; // Estilos personalizados
import { format, isValid, parse } from 'date-fns'; // Importa la función format, isValid y parse
import { useLocation } from "react-router-dom";

registerLocale('es', es);

const DatePickerComponentInperson = ({  allSede,selectedDateInPerson, setSelectedDateInPerson, mode }) => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 200);
  }, [pathname]);

  const handleFechaChange = (date) => {
    if (date && isValid(date)) { // Verifica si la fecha es válida
      const formattedDate = format(date, 'dd/MM/yyyy'); // Formatea la fecha en formato dd/MM/yyyy
      localStorage.setItem("selectedDateInPerson", formattedDate); // Guarda la fecha formateada en localStorage
      setSelectedDateInPerson(formattedDate); // Actualiza el estado con la fecha formateada
      window.location.href = "#timeInperson"; // Redirige a la sección de tiempo
    } else {
      console.error("Fecha inválida seleccionada");
    }
    allSede()
  };

  // Convierte la fecha seleccionada a un objeto Date si está en formato 'dd/MM/yyyy'
  const parsedDate = selectedDateInPerson ? parse(selectedDateInPerson, 'dd/MM/yyyy', new Date()) : null;
  const storedSede = JSON.parse(localStorage.getItem("selectedSede"));
  return (
    <div id="dateInperson">
      {storedSede && mode === "Presencial" ?  (
        <>
          <div className="date-picker-container">
            <h2>Seleccionar fecha</h2>
            <DatePicker
              selected={parsedDate} // Pasa el objeto Date al DatePicker
              onChange={handleFechaChange} // Usa el manejador corregido
              dateFormat="dd 'de' MMMM 'de' yyyy"
              locale="es" // Aplica la localización en español
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              inline
              className="calendar"
            />
          </div>
          <div className="hr"></div>
        </>
      ):null}
    </div>
  );
};

export default DatePickerComponentInperson;
