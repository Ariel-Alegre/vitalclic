import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AllDoctors, UpdateDoctorStatus } from '../../redux/action'; // Asegúrate de que UpdateDoctorStatus esté importado
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const StatusTable = () => {
  const dispatch = useDispatch();
  const alldoctors = useSelector(state => state.alldoctors.data);
  console.log(alldoctors  )
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const confirmChangeStatus = async (id) => {
    try {
      
      await  dispatch(UpdateDoctorStatus(id, newStatus));
      setEditingItemId(null);
      setNewStatus('');
    } catch (error) {
      console.log(error)
      
    } finally {
      window.location.reload();

    }



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
            <th>Formulario completo</th>

            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alldoctors && alldoctors.map(item => (
            <>
            <tr key={item.id}>
              <td>{item.name} {item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.genre}</td>
              <td>{item.role}</td>
              <td >
                <span in onClick={handleOpen} style={{textDecoration: "underline", cursor: "pointer"}}>
                  Ver Formulario
                </span>
                </td>

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
              <Modal
              aria-labelledby="spring-modal-title"
              aria-describedby="spring-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  TransitionComponent: Fade,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <Typography id="spring-modal-title" variant="h6" component="h2">
                    Formulario completo
                  </Typography>
                  <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                  <ul>
                    <li>
                      <strong>Nombre:</strong> {item.name} {item.lastName}
                    </li>
                    <li>
                      <strong>Género:</strong> {item.genre} 
                    </li>
                    <li>
                      <strong>Fecha de nacimiento:</strong> {item.birthdate} 
                    </li>
                    <li>
                      <strong>Tipo de cuenta:</strong> {item.role} 
                    </li>
                    <li>
                      <strong>Colegio profesional:</strong> {item.professional_college} 
                    </li>
                    <li>
                      <strong>Especialidad:</strong> {item.specialty} 
                    </li>
                    <li>
                      <strong>N° de colegiatura:</strong> {item.registration_number} 
                    </li>

                    <li>
                      <strong>N° de especialidad (RNE):</strong> {item.specialty_number_rne} 
                    </li>

                    
                    <li>
                      <strong>País:</strong> {item.country} 
                    </li>
                    <li>
                      <strong>Provincia:</strong> {item.province} 
                    </li>
                    <li>
                      <strong>Distrito:</strong> {item.district} 
                    </li>
                    
                    </ul>
                  </Typography>
                </Box>
              </Fade>
            </Modal>
            </>

          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StatusTable;
