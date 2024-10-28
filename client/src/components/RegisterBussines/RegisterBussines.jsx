import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function RegisterBussines() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({
    social_reason: "",
    comercial_name: "",
    ruc: "",
    address: "",
    phone: "",
    type_of_service: "",
    contact_person: "",
    email: "",
    position: "",
    country: "",
    province: "",
    district: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    // Si hay validación adicional
    try {
      console.log(data);
      // Despacha la acción si es necesario
      // dispatch(RegisterDoctor(data));
      // Navegar a otra página si es necesario
      // navigate("/ruta-deseada");
    } catch (error) {
      alert("Usuario ya existe");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
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
          <Form.Label>Razón Social</Form.Label>
          <Form.Control
            name="social_reason"
            value={data.social_reason}
            onChange={handleChange}
            placeholder="Razón Social"
            type="text"
            required
          />
          <Form.Control.Feedback type="invalid">
            La razón social es requerida.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Nombre comercial</Form.Label>
          <Form.Control
            name="comercial_name"
            value={data.comercial_name}
            onChange={handleChange}
            placeholder="Nombre comercial"
            type="text"
            required
          />
          <Form.Control.Feedback type="invalid">
            El nombre comercial es requerido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>RUC</Form.Label>
          <Form.Control
            name="ruc"
            value={data.ruc}
            onChange={handleChange}
            placeholder="RUC"
            type="text"
            required
          />
          <Form.Control.Feedback type="invalid">
            El RUC es requerido.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom04">
          <Form.Label>Cargo</Form.Label>
          <Form.Control
            name="position"
            value={data.position}
            onChange={handleChange}
            placeholder="Cargo"
            type="text"
            required
          />
          <Form.Control.Feedback type="invalid">
            El cargo es requerido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom07">
          <Form.Label>Tipo de servicio</Form.Label>
          <Form.Control
            name="type_of_service"
            value={data.type_of_service}
            onChange={handleChange}
            type="text"
            placeholder="Tipo de servicio"
            required
          />
          <Form.Control.Feedback type="invalid">
            El tipo de servicio es requerido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom07">
          <Form.Label>Persona de contacto</Form.Label>
          <Form.Control
            name="contact_person"
            value={data.contact_person}
            onChange={handleChange}
            type="text"
            placeholder="Persona de contacto"
            required
          />
          <Form.Control.Feedback type="invalid">
            La persona de contacto es requerida.
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
            type="text"
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
          required
          label="Aceptar términos y condiciones"
          feedback="Aceptar los términos y condiciones es requerido."
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

export default RegisterBussines;
