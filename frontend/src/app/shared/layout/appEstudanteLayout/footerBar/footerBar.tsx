import React from "react";
import styles from "./footerBar.module.css";

export const FooterBar: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <span>
          &copy; {currentYear} <strong>Universidade de Cabo Verde (Uni-CV)</strong>. Todos os direitos reservados.
        </span>
      </div>

      <div className={styles.footerRight}>
        <div className={styles.statusContainer}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>Todos os sistemas operacionais</span>
        </div>
        
        <div className={styles.linksContainer}>
          <a href="#termos" className={styles.link}>Termos</a>
          <span className={styles.separator}>•</span>
          <a href="#privacidade" className={styles.link}>Privacidade</a>
          <span className={styles.separator}>•</span>
          <a href="#suporte" className={styles.link}>Suporte</a>
        </div>
      </div>
    </footer>
  );
};
