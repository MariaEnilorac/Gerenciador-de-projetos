import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li>
          <a href="https://www.facebook.com/seu_facebook">
            <FaFacebook className={styles.icon} />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/seu_instagram">
            <FaInstagram className={styles.icon} />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/seu_linkedin">
            <FaLinkedin className={styles.icon} />
          </a>
        </li>
      </ul>
      <p className={styles.copy_right}>
        <span>Bear</span> &copy; 2024
      </p>
    </footer>
  )
}

export default Footer;
