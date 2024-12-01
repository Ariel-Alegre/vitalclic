import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProfessionalRegistration from './pages/ProfessionalRegistration';
import Login from './pages/Login';
import PanelAdmin from './pages/PanelAdmin';
import TableProfessional from './components/PanelAdmin/TableProfessional';
import Test from './pages/Test';
import DetailsProfessional from './pages/DetailsProfessional';
import RegisterUser from './pages/RegisterUser';
import PanelProfessional from './pages/PanelProfessional';
import TableShift from './pages/TableShift';
import TableAcceptedShifts from './components/PanelProfessional/TableAcceptedShifts';










function App() {


  return (
    <div >
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/iniciar-sesión" element={<Login />} />

          <Route path="/registrar-profesional" element={<ProfessionalRegistration />} />
          <Route path="/registrar-usuario" element={<RegisterUser />} />

          <Route path="/mi-perfil" element={<DetailsProfessional />} />

          <Route path="/test" element={<Test />} />

          <Route path="/administrar" element={<PanelAdmin />} >

            <Route index element={<TableProfessional />} />

            <Route path="profesional" element={<TableProfessional />} />

          </Route>

          <Route path="/turnos" element={<PanelProfessional />}>

<Route index element={<TableShift/>} />

<Route path="disponibles" element={<TableShift />} />
<Route path="aceptados" element={<TableAcceptedShifts />} />


</Route>





        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
