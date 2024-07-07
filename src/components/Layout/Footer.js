import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li>
          <a href="https://www.facebook.com/seu_facebook">
            <FaFacebook />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/seu_instagram">
            <FaInstagram />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/seu_linkedin">
            <FaLinkedin />
          </a>
        </li>
      </ul>
      <p className={styles.copy_right}>
        <span>Costs</span> &copy; 2024
      </p>
    </footer>
  )
}

export default Footer;