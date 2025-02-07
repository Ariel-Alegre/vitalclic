import React, { useState, useEffect } from 'react';
import Form from './Form'
import Sede from './Sede';
import DatePickerComponent from './DatePickerComponent';
import TimeSelector from './TimeSelector';
import PatientForm from './PatientForm';
import PatientFormInperson from './PatientFormInperson';


import ServiceAditional from './ServiceAditional';
import AditionalForm from './AditionalForm';
import DatePickerinPerson from './DatePickerComponentInperson';
import TimeSelectorInperson from './TimeSelectorInperson';


import axios from 'axios';



export default function Home() {
  const [professional, setProfessional] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTimeInPerson, setSelectedTimeInperson] = useState(null);

  const [specialtyInperson, setSpecialtyInperson] = useState(null);
  const [ provinceInperson, setProvinceInperson] = useState(null);
  const [departmentInperson, setDepartmentInperson] = useState(null);
  const [districtInperson, setDistrictInperson] = useState(null);
  const [selectedDateInperson, setSelectedDateInPerson] = useState(null);

   const [mode, setMode] = useState("Presencial");
 
  const [sede, setSede] = React.useState([]);

  

 const Professionals = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/professionals");
    setProfessional(res.data.data)

  } catch (error) {
    console.log(error)
  }
 } 

 const allSede = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/all-sede");
    setSede(res.data.data)

  } catch (error) {
    console.log(error)
  }
 } 
 useEffect(() => {
  Professionals()
 }, []);
 useEffect(() => {
  allSede()
 }, []);
     
  return (
    <div>
   <Form allSede = {allSede}setMode={setMode} mode={mode} provinceInperson={provinceInperson }  departmentInperson={departmentInperson} specialty={specialty} setSpecialtyInperson ={setSpecialtyInperson} setDistrictInperson={setDistrictInperson} professional={professional} specialtyInperson= {specialtyInperson} setSpecialty={setSpecialty} setDepartmentInperson={setDepartmentInperson} setProvinceInperson={setProvinceInperson} districtInperson={districtInperson}/>
  
   <Sede allSede = {allSede} sede ={sede}mode={mode}  specialtyInperson= {specialtyInperson} provinceInperson = {provinceInperson} departmentInperson={departmentInperson} districtInperson={districtInperson} />
   <DatePickerComponent mode={mode} setSelectedDate={setSelectedDate} selectedDate={selectedDate} specialty={specialty}/>
   <DatePickerinPerson allSede = {allSede} mode={mode}  sede={sede} setSelectedDateInPerson={setSelectedDateInPerson} selectedDateInperson={selectedDateInperson} specialty={specialty}/>
   <TimeSelectorInperson allSede = {allSede} selectedTimeInPerson={selectedTimeInPerson} setSelectedTimeInperson={setSelectedTimeInperson} mode={mode} selectedTime={selectedTime} setSelectedTime={setSelectedTime}selectedDate={selectedDate}/>

   <TimeSelector mode={mode} selectedTime={selectedTime} setSelectedTime={setSelectedTime}selectedDate={selectedDate}/>
   <PatientForm  mode={mode}  specialty={specialty} selectedTime={selectedTime} selectedDate={selectedDate}/>
   <PatientFormInperson  allSede={allSede} mode={mode}  setSelectedTimeInperson={setSelectedTimeInperson} setDepartmentInperson={setDepartmentInperson} setProvinceInperson={setProvinceInperson} setSpecialtyInperson={setSpecialtyInperson}/>
   <ServiceAditional/>
   
   
{/*  <AditionalForm/>  */} 
    </div>
  );
}
