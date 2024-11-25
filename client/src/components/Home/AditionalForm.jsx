import React from 'react';
import styles from '../../styles/Home/AditionalForm.module.css'; // Importación de estilos con CSS Modules

const AditionalForm = () => {
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>DATOS DEL PACIENTE</h2>
      <form className={styles.form}>
        <label className={styles.label}>NOMBRES</label>
        <input type="text" className={styles.input} placeholder="Ingrese sus nombres" />

        <label className={styles.label}>APELLIDOS</label>
        <input type="text" className={styles.input} placeholder="Ingrese sus apellidos" />

        <label className={styles.label}>EMAIL</label>
        <input type="email" className={styles.input} placeholder="Ingrese su correo electrónico" />

        <label className={styles.label}>TELÉFONO</label>
        <input type="tel" className={styles.input} placeholder="Ingrese su teléfono" />

        <button type="submit" className={styles.button}>SEPARAR CITA</button>
      </form>
    </div>
  );
};

export default AditionalForm;
