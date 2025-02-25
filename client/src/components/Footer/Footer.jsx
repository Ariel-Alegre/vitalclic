import React from 'react';
import styles from './Footer.module.css';
import axios from "axios";

import {Link} from "react-router-dom"
const Footer = () => {
  const [user, setUser] = React.useState("");

    const [token, setToken] = React.useState("");
    const [role, setRole] = React.useState("");

  console.log(user)
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
      setRole(response.data.role);
    } catch (error) {
      console.error("Error al obtener los detalles:", error);
    } finally {
    }
  };
    React.useEffect(() => {
      const token = localStorage.getItem("token");
  
      setToken(token);
    }, []);
  React.useEffect(() => {
    if (token) {
      dataPersonal();
    }
  }, [token]);
  return (
    <footer className={styles.footer}>
      <hr />
      <br />
      <div className={styles.footer_container}>
      
        
      {token && role === "personal" ? (
  <div>
    <h3>PARA PACIENTES</h3>
        <div className={styles.footer_links}>
          {/* <Link to="/faq" className={styles.footer_link}>Preguntas Frecuentes</Link> */}
          <Link to="/#" className={styles.footer_link}>Términos y Condiciones</Link>
          <Link to="/#" className={styles.footer_link}>Preguntas frecuentes</Link>
          <Link to="/#" className={styles.footer_link}>Privacidad y cookies</Link>

          <Link to="/#" className={styles.footer_link_mobile}>Políticas de privacidad</Link>
          <Link to="/#" className={styles.footer_link_mobile}>Contáctanos</Link>
          <Link to="/#" className={styles.footer_link_mobile}>Ayuda en línea</Link>

          
        </div>
        </div>

      ) : null}

{token && role === "profesional" ? (
<div>
<h3>PARA PROFESIONALES</h3>
<div className={styles.footer_links}>
  {/* <Link to="/faq" className={styles.footer_link}>Preguntas Frecuentes</Link> */}
  <Link to="/#" className={styles.footer_link}>Términos y Condiciones</Link>
          <Link to="/#" className={styles.footer_link}>Preguntas frecuentes</Link>
          <Link to="/#" className={styles.footer_link}>Privacidad y cookies</Link>

          <Link to="/#" className={styles.footer_link_mobile}>Políticas de privacidad</Link>
          <Link to="/#" className={styles.footer_link_mobile}>Contáctanos</Link>
          <Link to="/#" className={styles.footer_link_mobile}>Ayuda en línea</Link>

</div>
  
</div>
) : null}

{token && role === "sede" ? (
    <div>
    <h3>PARA EMPRESAS</h3>
<div className={styles.footer_links}>
  {/* <Link to="/faq" className={styles.footer_link}>Preguntas Frecuentes</Link> */}
  <Link to="/#" className={styles.footer_link}>Términos y Condiciones</Link>
          <Link to="/#" className={styles.footer_link}>Preguntas frecuentes</Link>
          <Link to="/#" className={styles.footer_link}>Privacidad y cookies</Link>

          <Link to="/#" className={styles.footer_link_mobile}>Políticas de privacidad</Link>
          <Link to="/#" className={styles.footer_link_mobile}>Contáctanos</Link>
          <Link to="/#" className={styles.footer_link_mobile}>Ayuda en línea</Link>

  
</div>
</div>

) : null}

        <div className={styles.book_reclam}>
          <Link to="/libro-de-quejas">
          <img src="https://images.deliveryhero.io/image/pedidosya/care/complaint_book_1.png?width=99&dpi=2" alt="Libro de reclamaciones" />
          </Link>
        </div>

        <div className={styles.container_logos}>
           
             
              </div>
              <div className={styles.footer_text}>
         
              <p>
                    Web creada por <a href="https://www.elaritech.com/" target="_blank" rel="noopener noreferrer"><strong>elaritech.com</strong></a>
                  </p>
          <p>
            © {new Date().getFullYear()} Tu Mesa en Una. Todos los derechos
            reservados.
          </p>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
