import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es'; // Importa la localización en español
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/Home/DatePickerComponent.css'; // Estilos personalizados
import { format, isValid, parse } from 'date-fns'; // Importa la función format, isValid y parse
import { useLocation } from "react-router-dom";

registerLocale('es', es);

const DatePickerComponent = ({ selectedDate, setSelectedDate, mode }) => {
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
  const specialty = localStorage.getItem("specialty");
  return (
    <div id="date">
      {specialty && mode === "Virtual" ?  (
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
              style={{
                fontSize: '18px', // Aumenta el tamaño de la fuente
              }}
              calendarContainerStyle={{
                fontSize: '18px', // Aumenta el tamaño de la fuente en el calendario
              }}
              popperModifiers={{
                offset: {
                  enabled: true,
                  offset: '0, 5px',
                },
              }}
            />
          </div>
          <div className="hr"></div>
        </>
      ): null}
    </div>
  );
};

export default DatePickerComponent;
