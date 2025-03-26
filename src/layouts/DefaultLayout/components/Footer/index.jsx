import End from "./End";
import styles from "./Footer.module.scss";
import Middle from "./Middle";

function Footer() {
  return (
    <div className={styles.wrapper}>
      <Middle />
      <End />
    </div>
  );
}

export default Footer;
