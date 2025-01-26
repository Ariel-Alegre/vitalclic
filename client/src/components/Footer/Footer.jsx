import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <img
            src={require("../../assets/Images/elaritech.jpg")}// Reemplaza con la ruta de tu logo
            alt="elaritech logo"
            className={styles.logo}
          />
        </div>
        <div className={styles.textSection}>
          <p className={styles.text}>Web creada por <a href="https://www.elaritech.com/" target="_blank" rel="noopener noreferrer"><strong>elaritech.com</strong></a></p>
        </div>
   
      </div>
    </footer>
  );
};

export default Footer;
