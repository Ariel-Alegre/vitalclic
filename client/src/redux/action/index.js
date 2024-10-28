import axios from 'axios'

// https://medico-production-651b.up.railway.app/api/register





export const RegisterUser = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/api/register', payload);

      dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });

      return response; 
    } catch (error) {
      console.error(error);

      dispatch({ type: 'REGISTER_FAILURE', payload: error });

      throw error; 
    }
  };
};


// Acción para registrar a un doctor
export const RegisterDoctor = (payload) => {
  return async (dispatch) => {
    try {
      // Realiza la solicitud POST a la API
      const response = await axios.post('http://localhost:3001/api/register-doctor', payload);
      
      // Despacha la acción de éxito con los datos recibidos
      dispatch({ type: 'REGISTERDOCTOR_SUCCESS', payload: response.data });

      return response; // Devuelve la respuesta si es necesario
    } catch (error) {
      console.error('Error al registrar doctor:', error); // Mensaje de error más descriptivo
      
      // Despacha la acción de fallo con el error
      dispatch({ type: 'REGISTERDOCTOR_FAILURE', payload: error.response ? error.response.data : error });

      throw error; // Vuelve a lanzar el error si necesitas manejarlo en otro lugar
    }
  };
};


export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            token: response.data.token,
            role: response.data.role,
            status: response.data.status,

          },
        });

        return true; // Autenticación exitosa
      } else {
        throw new Error("Error durante el inicio de sesión.");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR" });
      return false; // Autenticación fallida
    }
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

export const AllDoctors = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('http://localhost:3001/api/doctors');
      const data = res.data;

      dispatch({
        type: "ALL_DOCTORS",
        payload: data
      });
    } catch (error) {
      console.error('Error al mostrar los doctores:', error);
      // Puedes dispatchar una acción de error si es necesario.
    }
  };
};


export const UpdateDoctorStatus = (id, status) => {
  return async (dispatch) => {
      try {
          const response = await axios.put(`http://localhost:3001/api/update-doctor-status/${id}`, { status });
          dispatch({ type: 'UPDATE_DOCTOR_STATUS_SUCCESS', payload: response.data });
      } catch (error) {
          console.error('Error al actualizar el estado del médico:', error);
          dispatch({ type: 'UPDATE_DOCTOR_STATUS_FAILURE', payload: error.message });
      }
  };
};
