import Contact from "./Contact";
import End from "./End";
import styles from "./Footer.module.scss";
import Middle from "./Middle";

function Footer() {
  return (
    <div className={styles.wrapper}>
      <Contact />
      <Middle />
      <End />
    </div>
  );
}

export default Footer;
