import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AllDoctors, UpdateDoctorStatus } from '../../redux/action'; // Asegúrate de que UpdateDoctorStatus esté importado

const StatusTable = () => {
  const dispatch = useDispatch();
  const alldoctors = useSelector(state => state.alldoctors.data);

  // Estado para manejar la edición
  const [editingItemId, setEditingItemId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    dispatch(AllDoctors());
  }, [dispatch]);

  // Función para iniciar el cambio de estado
  const startChangeStatus = (item) => {
    setEditingItemId(item.id);
    setNewStatus(item.status === 'pendiente' ? 'activo' : 'pendiente');
  };

  // Función para confirmar el cambio de estado
  const confirmChangeStatus = (id) => {
    // Actualiza el estado en la base de datos (aquí asumo que tienes una acción para eso)
    dispatch(UpdateDoctorStatus(id, newStatus));

    // También puedes actualizar el estado local si es necesario
    setEditingItemId(null);
    setNewStatus('');
    window.location.reload();

  };

  // Función para cancelar el cambio de estado
  const cancelChangeStatus = () => {
    setEditingItemId(null);
    setNewStatus('');
  };

  return (
    <div className="container mt-4">
      <h2>Tabla de Estados</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre completo</th>
            <th>Correo electrónico</th>
            <th>Teléfono</th>
            <th>Género</th>
            <th>Tipo de cuenta</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alldoctors && alldoctors.map(item => (
            <tr key={item.id}>
              <td>{item.name} {item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.genre}</td>
              <td>{item.role}</td>
              <td>{item.status}</td>
              <td>
                {editingItemId === item.id ? (
                  <>
                    <Button 
                      variant="success" 
                      onClick={() => confirmChangeStatus(item.id)}
                    >
                      Aceptar
                    </Button>
                    <Button 
                      variant="danger" 
                      onClick={cancelChangeStatus}
                      className="ml-2"
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant={item.status === 'pendiente' ? 'success' : 'warning'} 
                    onClick={() => startChangeStatus(item)}
                  >
                    Cambiar a {item.status === 'pendiente' ? 'activo' : 'pendiente'}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StatusTable;
