import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es'; // Importa la localización en español
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/Home/DatePickerComponent.css'; // Estilos personalizados
import { format, isValid, parse } from 'date-fns'; // Importa la función format, isValid y parse
import { useLocation } from "react-router-dom";

registerLocale('es', es);

const DatePickerComponent = ({ specialty, selectedDate, setSelectedDate }) => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 200);
  }, [pathname]);

  const handleFechaChange = (date) => {
    if (date && isValid(date)) { // Verifica si la fecha es válida
      const formattedDate = format(date, 'dd/MM/yyyy'); // Formatea la fecha en formato dd/MM/yyyy
      localStorage.setItem("selectedDate", formattedDate); // Guarda la fecha formateada en localStorage
      setSelectedDate(formattedDate); // Actualiza el estado con la fecha formateada
      window.location.href = "#time"; // Redirige a la sección de tiempo
    } else {
      console.error("Fecha inválida seleccionada");
    }
  };

  // Convierte la fecha seleccionada a un objeto Date si está en formato 'dd/MM/yyyy'
  const parsedDate = selectedDate ? parse(selectedDate, 'dd/MM/yyyy', new Date()) : null;

  return (
    <div id="date">
      {specialty && (
        <>
          <div className="date-picker-container">
            <h2>SELECCIONAR FECHA</h2>
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
      )}
    </div>
  );
};

export default DatePickerComponent;
