import React from 'react';
import { Card, CardContent, Typography, Container, Grid, Box } from '@mui/material';
import axios from "axios";
import { useLocation } from "react-router-dom";

const teleconsultations = [
    { id: 1, doctor: 'Dr. Ana Pérez', patient: 'Juan Gómez', date: '2024-06-14', diagnosis: 'Gripe común' },
    { id: 2, doctor: 'Dr. Carlos López', patient: 'María Torres', date: '2024-06-13', diagnosis: 'Migraña' }
];

const inPersonConsultations = [
    { id: 3, doctor: 'Dra. Sofía Martínez', patient: 'Pedro Sánchez', date: '2024-06-12', diagnosis: 'Hipertensión' }
];

export default function HistorialUser() {
      const { pathname } = useLocation();
    
  const [user, setUser] = React.useState(null);
    const [token, setToken] = React.useState(""); // Estado para la vista previa de imagen
   
     React.useEffect(() => {
       window.scrollTo(0, 0);
     }, [pathname]);
    React.useEffect(() => {
        const token = localStorage.getItem("token");
    
        setToken(token);
      }, []);
    const dataPersonal = async () => {
        try {
          const tokenFromStorage = localStorage.getItem("token"); // Obtener el token directamente
          if (!tokenFromStorage) {
            throw new Error("Token no encontrado en localStorage");
          }
          const response = await axios.get(
            `https://vitalclic-production.up.railway.app/api/datapersonal`,
            {
              headers: {
                Authorization: tokenFromStorage, // Usa el token aquí
                "Content-Type": "application/json",
              },
            }
          );
      
          setUser(response.data);
        } catch (error) {
          console.error("Error al obtener los detalles:", error);
        }
      };
      
        React.useEffect(() => {
          if (token) {
            dataPersonal();
          }
        }, [token]);
    return (
        <Container maxWidth="lg" sx={{ mt: 4, marginTop: "5em", marginBottom: "10em" }}>
            <Typography variant="h4" gutterBottom align="center">
                Consultas Médicas
            </Typography>
            <Box>
                <Typography variant="h5" gutterBottom>
                    🖥️ Teleconsultas
                </Typography>
                <Grid container spacing={3}>
                    {user?.OnlineShifts.map((consultation) => (
                        <Grid item xs={12} sm={6} md={4} key={consultation.id}>
                       <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {consultation.specialty}
                                    </Typography>
                                    <Typography variant="body1">
                                        Paciente: {consultation.name} {consultation.lastName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Fecha: {consultation.date} - Hora: {consultation.time}
                                    </Typography>
                                    <Typography variant="body2">
                                        Motivo: {consultation.reason_for_shift}
                                    </Typography>
                                    <Typography variant="body2">
                                        Estado: {consultation.status}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* <Box mt={4}>
                <Typography variant="h5" gutterBottom>
                    🏥 Consultas Presenciales
                </Typography>
                <Grid container spacing={3}>
                    {inPersonConsultations.map((consultation) => (
                        <Grid item xs={12} sm={6} md={4} key={consultation.id}>
                            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {consultation.doctor}
                                    </Typography>
                                    <Typography variant="body1">
                                        Paciente: {consultation.patient}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Fecha: {consultation.date}
                                    </Typography>
                                    <Typography variant="body2">
                                        Diagnóstico: {consultation.diagnosis}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box> */}
        </Container>
    );
}
