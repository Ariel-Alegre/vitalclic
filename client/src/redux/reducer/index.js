const initialState = {
  token: localStorage.getItem('token'),
  role: null,
  status: null,
  loginUser: {},
  loginError: null,
  alldoctors: [],
  allUsers: [],
  registrationSuccess: false,
  registrationError: null,
  datapersonal: [],
  restaurantdetails: [],
  allOrders: [],
  oneOrder: [],
  allCart: [],
  emailSent: false,
  error: null,
  message: '',
  paymentData: null,
  orderDetails: [],
  detailsReservation: [],


}


export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        registrationSuccess: true,
        registrationError: null,
      };
    case 'REGISTER_FAILURE':
      return {
        ...state,
        registrationSuccess: false,
        registrationError: action.payload,
      };

      case 'REGISTERDOCTOR_SUCCESS':
        return {
          ...state,
    
        };
      
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        status: action.payload.status,

      };



    case 'LOGIN_ERROR':
      return {
        ...state,
        loginError: true,
      };

    case 'LOGOUT':
      return {
        ...state,
        token: localStorage.removeItem("token"),
        role: null,
        status: null
      };


    case 'DATA_PERSONAL':
      return {
        ...state,
        datapersonal: action.payload,
        role: action.payload.role
      };

    case 'ALL_DOCTORS':
      return {
        ...state,
        alldoctors: action.payload
      };


  case 'UPDATE_DOCTOR_STATUS_SUCCESS':
    return {
      ...state
    }

    default: return { ...state }
  }
}






