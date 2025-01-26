import React from 'react';
import styles from './TermsAndConditions.module.css';

const TermsAndConditions = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Términos y Condiciones</h1>
      <p className={styles.introduction}>
        Al utilizar este sitio web, aceptas los siguientes términos y condiciones. Por favor, léelos
        cuidadosamente antes de utilizar nuestros servicios.
      </p>

      <h2 className={styles.subTitle}>1. Aceptación de los Términos</h2>
      <p className={styles.text}>
        Al acceder o utilizar este sitio web, el usuario acepta cumplir con estos términos y condiciones.
        Si no está de acuerdo con alguno de los términos aquí establecidos, no debe utilizar este sitio.
      </p>

      <h2 className={styles.subTitle}>2. Uso del Sitio Web</h2>
      <p className={styles.text}>
        El sitio web puede ser utilizado únicamente para fines legales. No se permite el uso de este
        sitio para actividades ilegales o que infrijan derechos de terceros.
      </p>

      <h2 className={styles.subTitle}>3. Propiedad Intelectual</h2>
      <p className={styles.text}>
        Todos los contenidos de este sitio web, incluyendo pero no limitándose a textos, imágenes, logotipos,
        gráficos, son propiedad de la empresa y están protegidos por las leyes de propiedad intelectual.
      </p>

      <h2 className={styles.subTitle}>4. Responsabilidad</h2>
      <p className={styles.text}>
        La empresa no se hace responsable por daños directos, indirectos, incidentales o consecuentes que
        surjan del uso del sitio web.
      </p>

      <h2 className={styles.subTitle}>5. Cambios en los Términos</h2>
      <p className={styles.text}>
        Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán
        efectivos inmediatamente después de su publicación en el sitio web.
      </p>

      <h2 className={styles.subTitle}>6. Contacto</h2>
      <p className={styles.text}>
        Si tienes alguna pregunta o inquietud sobre nuestros términos y condiciones, puedes contactarnos
        a través de nuestro correo electrónico: contacto@elaritech.com.
      </p>
    </div>
  );
};

export default TermsAndConditions;
