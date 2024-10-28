import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sede from './pages/Sede';
import Test from './pages/Test';
import RegisterDoctor from './pages/RegisterDoctors';

import Login from './pages/Login';
import RegisterBussines from './pages/RegisterBussines';
import Admin from './pages/Admin';
import StatusTable from './components/Admin/TableDoctor';








function App() {


  return (
    <div >
      <BrowserRouter>
        <Routes>
 
          <Route path="/" element={<Home />} />
          <Route path="/registrarse-profesional" element={<RegisterDoctor />} />
          <Route path="/registrarse-empresa" element={<RegisterBussines />} />

          <Route path='/iniciar-sesión' element={<Login/>}/>

          <Route path='/administrar' element={<Admin/>}>
          <Route index element={<StatusTable/>}/>
          <Route path='petición-registro' element={<StatusTable/>}/>


          </Route>

          
          <Route path="/test" element={<Test />} />


        


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
