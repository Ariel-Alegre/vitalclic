import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { RegisterDoctor } from "../../redux/action";

const specialities = [
  "Ginecólogo", "Clínico", "Odontólogo", "Psicólogo", 
  "Traumatólogo", "Dermatólogo", "Oftamólogo", "Neurólogo"
];

const genres = ["Femenino", "Masculino", "Prefiero no decirlo"];

function RegisterDoctors() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "", lastName: "", professional_college: "", 
    registration_number: "", specialty_number_rne: "", genre: "", 
    birthdate: "", email: "", country: "", province: "", 
    district: "", specialty: "", phone: "", password: "", 
    termsAccepted: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);
    setLoading(true);
    try {
      await dispatch(RegisterDoctor(data));
      navigate("/formulario-enviado");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const renderInputField = (label, name, type = "text", placeholder) => (
    <Form.Group as={Col} md="12" controlId={`validation-${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        type={type}
        value={data[name]}
        onChange={handleChange}
        placeholder={placeholder}
        required
      />
      <Form.Control.Feedback type="invalid">
        {`${label} es requerido.`}
      </Form.Control.Feedback>
    </Form.Group>
  );

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="form-register">
      <div className="logo-register">
        <img src={require("../../assets/Images/logo.png")} alt="Logo" />
      </div>
      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Label>Especialidad</Form.Label>
          <Form.Select name="specialty" value={data.specialty} onChange={handleChange} required>
            <option value="">Selecciona una especialidad</option>
            {specialities.map((spec, index) => (
              <option key={index} value={spec}>{spec}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            La especialidad es requerida.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6">
          <Form.Label>Género</Form.Label>
          <Form.Select name="genre" value={data.genre} onChange={handleChange} required>
            <option value="">Selecciona un género</option>
            {genres.map((gen, index) => (
              <option key={index} value={gen}>{gen}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            El género es requerido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        {renderInputField("Nombre", "name", "text", "Nombre")}
        {renderInputField("Apellido", "lastName", "text", "Apellido")}
        {renderInputField("Colegio profesional", "professional_college", "text", "Colegio profesional")}
        {renderInputField("N° de colegiatura", "registration_number", "text", "N° de colegiatura")}
        {renderInputField("N° de especialidad (RNE)", "specialty_number_rne", "text", "N° de especialidad (RNE)")}
       
        {renderInputField("Fecha de nacimiento", "birthdate", "date", "Fecha de nacimiento")}
        {renderInputField("Correo electrónico", "email", "email", "Correo electrónico")}
        {renderInputField("País", "country", "text", "País")}
        {renderInputField("Provincia", "province", "text", "Provincia")}
        {renderInputField("Distrito", "district", "text", "Distrito")}
        {renderInputField("Teléfono", "phone", "number", "Teléfono")}
        {renderInputField("Contraseña", "password", "password", "Contraseña")}
      </Row>

   

      <Form.Group className="mb-3">
        <Form.Check
          name="termsAccepted"
          checked={data.termsAccepted}
          onChange={handleChange}
          required
          label="Aceptar términos y condiciones"
          feedback="Es necesario aceptar los términos."
          feedbackType="invalid"
        />
      </Form.Group>

      <div className="d-grid gap-2">
        <button className="btn-global" type="submit">
          {loading ? <CircularProgress size={15} thickness={5} sx={{ color: "#fff" }} /> : "Enviar formulario"}
        </button>
      </div>
      <div className="a-login">
        ¿Ya tienes cuenta? <Link to="/iniciar-sesión">Iniciar sesión</Link>
      </div>
    </Form>
  );
}

export default RegisterDoctors;
