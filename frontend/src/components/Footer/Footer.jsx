import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} Finovo. Todos os direitos reservados.</span>
      <span className={styles.dot}>•</span>
      <span>Feito para controle financeiro pessoal.</span>
    </footer>
  );
}
