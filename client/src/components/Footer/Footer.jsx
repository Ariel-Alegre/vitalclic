import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Sección de enlaces para diferentes tipos de usuarios */}
      <div className={styles.footerLinks}>
        <div className={styles.footerColumn}>
          <h3>PARA PACIENTES</h3>
          <ul>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Quiénes somos</a></li>
            <li><a href="#">Privacidad y cookies</a></li>
            <li><a href="#">Políticas de privacidad</a></li>
            <li><a href="#">Contacto</a></li>
            <li><a href="#">Ayuda en línea</a></li>
          </ul>
        </div>
      
        <div className={styles.footerColumn}>
          <h3>PARA PROFESIONALES</h3>
          <ul>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Información general</a></li>
            <li><a href="#">Servicios que se brindan</a></li>
            <li><a href="#">Privacidad y cookies</a></li>
            <li><a href="#">Políticas de privacidad</a></li>
            <li><a href="#">Ayuda en línea</a></li>
          </ul>
        </div>
        
        <div className={styles.footerColumn}>
          <h3>PARA EMPRESAS</h3>
          <ul>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Información general</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Servicios que se brindan</a></li>
            <li><a href="#">Privacidad y cookies</a></li>
            <li><a href="#">Políticas de privacidad</a></li>
            <li><a href="#">Ayuda en línea</a></li>
          </ul>
        </div>
      </div>

      {/* Sección del Libro de Reclamos */}
      <div className={styles.reclamosSection}>
        <div className={styles.reclamosContent}>
          <h3>LIBRO DE RECLAMOS</h3>
          <div className={styles.logoSection}>
          <img
            src="https://images.deliveryhero.io/image/pedidosya/care/complaint_book_1.png?width=99&dpi=2" // Reemplaza con la ruta de tu logo
            alt="elaritech logo"
            className={styles.logo}
          />
        </div>
        </div>
      </div>

      {/* Logo y créditos */}
      <div className={styles.container_logos}>
   
        <div className={styles.textSection}>
          <p>
            Web creada por <a href="https://www.elaritech.com/" target="_blank" rel="noopener noreferrer"><strong>elaritech.com</strong></a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
