import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { RegisterDoctor } from "../../redux/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function RegisterDoctors() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({
    name: "",
    lastName: "",
    professional_college: "",
    registration_number: "",
    specialty_number_rne: "",
    genre: "",
    birthdate: "",
    email: "",
    country: "",
    province: "",
    district: "",
    specialty: "",
    phone: "",
    password: "",
    termsAccepted: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    try {
  
        await dispatch(RegisterDoctor(data));
    
    } catch (error) {
      alert("Usuario ya existe o ha ocurrido un error.");
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <Form
      className="form-register"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <div className="logo-register">
        <img src={require("../../assets/Images/logo.png")} alt="Logo" />
      </div>
       <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Nombre"
            type="text"
            required
          />
          <Form.Control.Feedback type="invalid">
            El nombre es requerido.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            placeholder="Apellido"
            type="text"
            required
          />
          <Form.Control.Feedback type="invalid">
            El apellido es requerido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Colegio profesional</Form.Label>
          <Form.Control
            name="professional_college"
            value={data.professional_college}
            onChange={handleChange}
            placeholder="Colegio profesional"
            type="text"
            required
          />
          <Form.Control.Feedback type="invalid">
            El colegio profesional es requerido.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom04">
          <Form.Label>N° de colegiatura</Form.Label>
          <Form.Control
            name="registration_number"
            value={data.registration_number}
            onChange={handleChange}
            placeholder="N° de colegiatura"
            type="text"
            required
          />
          <Form.Control.Feedback type="invalid">
            El N° de colegiatura es requerido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom05">
          <Form.Label>Especialidad</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="specialty"
            value={data.specialty}
            onChange={handleChange}
            required
          >
            <option value="">Especialidad</option>
            <option value="2">Ginecólogo</option>
            <option value="3">Clínico</option>
            <option value="4">Odontólogo</option>
            <option value="5">Psicólogo</option>
            <option value="6">Traumatólogo</option>
            <option value="7">Dermatólogo</option>
            <option value="8">Oftamólogo</option>
            <option value="9">Neurólogo</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            La especialidad es requerida.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom06">
          <Form.Label>N° de especialidad (RNE)</Form.Label>
          <Form.Control
            name="specialty_number_rne"
            value={data.specialty_number_rne}
            onChange={handleChange}
            placeholder="N° de especialidad (RNE)"
            type="number"
            required
          />
          <Form.Control.Feedback type="invalid">
            El N° de especialidad (RNE) es requerido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Label>Género</Form.Label>
        <Form.Group as={Col} md="12" controlId="validationCustom05">
          <Form.Select
            aria-label="Default select example"
            name="genre"
            value={data.genre}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar género</option>
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
            <option value="Prefiero no decirlo">Prefiero no decirlo</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            El género es requerido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom06">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control
            type="date"
            name="birthdate"
            value={data.birthdate}
            onChange={handleChange}
            placeholder="Fecha de nacimiento"
            required
          />
          <Form.Control.Feedback type="invalid">
            La fecha de nacimiento es requerida.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom07">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            name="email"
            value={data.email}
            onChange={handleChange}
            type="email"
            placeholder="Correo electrónico"
            required
          />
          <Form.Control.Feedback type="invalid">
            El correo es requerido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom08">
          <Form.Label>País</Form.Label>
          <Form.Control
            name="country"
            value={data.country}
            onChange={handleChange}
            type="text"
            placeholder="País"
            required
          />
          <Form.Control.Feedback type="invalid">
            El país es requerido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom09">
          <Form.Label>Provincia</Form.Label>
          <Form.Control
            name="province"
            value={data.province}
            onChange={handleChange}
            type="text"
            placeholder="Provincia"
            required
          />
          <Form.Control.Feedback type="invalid">
            La provincia es requerida.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom10">
          <Form.Label>Distrito</Form.Label>
          <Form.Control
            name="district"
            value={data.district}
            onChange={handleChange}
            type="text"
            placeholder="Distrito"
            required
          />
          <Form.Control.Feedback type="invalid">
            El distrito es requerido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom11">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            name="phone"
            value={data.phone}
            onChange={handleChange}
            type="number"
            placeholder="Teléfono"
            required
          />
          <Form.Control.Feedback type="invalid">
            El teléfono es requerido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom12">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            name="password"
            value={data.password}
            onChange={handleChange}
            type="password"
            placeholder="Contraseña"
            required
          />
          <Form.Control.Feedback type="invalid">
            La contraseña es requerida.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
      <Form.Check
  name="termsAccepted"
  checked={data.termsAccepted}
  onChange={handleChange}
  required
  label="Aceptar términos y condiciones"
  feedback="Aceptar términos y condiciones es requerido."
  feedbackType="invalid"
  
/>

      </Form.Group>
      <div className="d-grid gap-2">
        <button className="btn-global" type="submit">
          Registrarme
        </button>
      </div>
      <div className="a-login">
        ¿Ya tienes cuenta?{" "}
        <Link to="/iniciar-sesión" className="scrollto">
          Iniciar sesión
        </Link>
      </div>
    </Form>
  );
}

export default RegisterDoctors;