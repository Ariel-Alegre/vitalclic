import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action";

function LoginComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(null);
  const role = useSelector((state) => state.role);
  const status = useSelector((state) => state.status);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (email && password) {
        const authResult = await dispatch(login(email, password));
        setAuth(authResult);

        if (authResult) {
          navigate("/");
        } else {
          alert("Email y/o contraseña incorrecta");
        }
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión", error);
    }
  };

  return (
    <>
      <Form className="form-login" onSubmit={handleSubmit}>
          <div className="logo-login">
            <img src={require("../../assets/Images/logo.png")} alt="Logo" />
          <div>
            ¿Aún no tienes cuentas?{" "}
            <Link to="/registrarse" className="scrollto">
              Registrate
            </Link>
          </div>
          </div>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Correo electrónico"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Contraseña"
          />
        </Form.Group>
        <button type="submit" className="btn-global scrollto">
          <span>Iniciar sesión</span>{" "}
        </button>
      </Form>
    </>
  );
}

export default LoginComponent;
