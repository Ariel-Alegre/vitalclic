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
import PerfilProfessional from './components/PanelProfessional/PerfilProfessional';


import RegisterSede from './pages/RegisterSede';
import TableSede from './components/PanelAdmin/TableSede';
import PanelSede from './pages/PanelSede';
import TableInPersonShifts from './components/PanelSede/TableInPersonShifts';
import MessageSuccess from './pages/MessageSuccess';
import RegisterSedesSuccess from './pages/RegisterSedesSuccess';
import RegisterProfessionalSuccess from './pages/RegisterProfessionalSuccess';
import PerfilSede from './components/PanelSede/PerfilSede';
import RegisterUserSuccess from './pages/RegisterUserSuccess';
import TermsAndConditions from './pages/TermsAndConditions';
import RegisterEmpresa from './pages/RegisterEmpresa';









function App() {


  return (
    <div >
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/iniciar-sesión" element={<Login />} />

          <Route path="/registrar-profesional" element={<ProfessionalRegistration />} />
          <Route path="/registrar-usuario" element={<RegisterUser />} />
          <Route path="/registrar-sede" element={<RegisterSede />} />
          <Route path="/registrar-empresa" element={<RegisterEmpresa />} />


          <Route path="/mi-perfil" element={<DetailsProfessional />} />

          <Route path="/reservación-exitosa" element={<MessageSuccess />} />
          <Route path="/registro/sede-exitosa" element={<RegisterSedesSuccess />} />
          <Route path="/registro/profesional-exitosa" element={<RegisterProfessionalSuccess />} />
          <Route path="/registrado-exitosamente" element={<RegisterUserSuccess />} />
          <Route path="/terminos-condiciones" element={<TermsAndConditions />} />


          <Route path="/test" element={<Test />} />


          <Route path="/administrar" element={<PanelAdmin />} >

            <Route index element={<TableProfessional />} />

            <Route path="profesionales" element={<TableProfessional />} />
            <Route path="sedes" element={<TableSede />} />


          </Route>

          <Route path="/panel" element={<PanelProfessional />}>

            <Route index element={<TableShift />} />

            <Route path="turnos/disponibles" element={<TableShift />} />
            <Route path="turnos/aceptados" element={<TableAcceptedShifts />} />
            <Route path="perfil" element={<PerfilProfessional />} />



          </Route>



          <Route path="/panel/sede" element={<PanelSede />} >

            <Route index element={<TableInPersonShifts />} />
            <Route path="turnos" element={<TableInPersonShifts />} />


            <Route path="perfil" element={<PerfilSede />} />
            <Route path="sedes" element={<TableSede />} />


          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
