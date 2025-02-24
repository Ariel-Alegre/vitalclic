import React from 'react';
import { Card, CardContent, Typography, Container, Grid, Box } from '@mui/material';

const teleconsultations = [
    { id: 1, doctor: 'Dr. Ana Pérez', patient: 'Juan Gómez', date: '2024-06-14', diagnosis: 'Gripe común' },
    { id: 2, doctor: 'Dr. Carlos López', patient: 'María Torres', date: '2024-06-13', diagnosis: 'Migraña' }
];

const inPersonConsultations = [
    { id: 3, doctor: 'Dra. Sofía Martínez', patient: 'Pedro Sánchez', date: '2024-06-12', diagnosis: 'Hipertensión' }
];

export default function MedicalConsultations() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Consultas Médicas
            </Typography>
            <Box>
                <Typography variant="h5" gutterBottom>
                    🖥️ Teleconsultas
                </Typography>
                <Grid container spacing={3}>
                    {teleconsultations.map((consultation) => (
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
            </Box>

            <Box mt={4}>
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
            </Box>
        </Container>
    );
}
