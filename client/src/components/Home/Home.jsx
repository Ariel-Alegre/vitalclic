import React, { useState, useEffect } from 'react';
import Form from './Form'
import Sede from './Sede';
import DatePickerComponent from './DatePickerComponent';
import TimeSelector from './TimeSelector';
import PatientForm from './PatientForm';
import ServiceAditional from './ServiceAditional';
import AditionalForm from './AditionalForm';
import axios from 'axios';



export default function Home() {
  const [professional, setProfessional] = useState();
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = React.useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [notProfessional, setNotProfessional] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  console.log(selectedTime)
  console.log(specialty)
  console.log(selectedDate)

 const Professionals = async () => {
  try {
    const res = await axios.get("https://vitalclic-production.up.railway.app/api/professionals");
    setProfessional(res.data.data)

  } catch (error) {
    console.log(error)
  }
 } 
 useEffect(() => {
  Professionals()
 }, []);
     
  return (
    <div>
   <Form specialty={specialty} professional={professional} filteredProfessionals={filteredProfessionals} setFilteredProfessionals={setFilteredProfessionals} setNotProfessional={setNotProfessional} setSpecialty={setSpecialty}/>
   <Sede filteredProfessionals={filteredProfessionals} setSelectedProfessional={setSelectedProfessional} notProfessional={notProfessional}/>
   <DatePickerComponent selectedProfessional={selectedProfessional} setSelectedDate={setSelectedDate} selectedDate={selectedDate} specialty={specialty}/>
   <TimeSelector selectedTime={selectedTime} setSelectedTime={setSelectedTime}selectedDate={selectedDate}/>
   <PatientForm specialty={specialty} selectedTime={selectedTime} selectedDate={selectedDate}/>
   <ServiceAditional/>
   <AditionalForm/>
    </div>
  );
}
