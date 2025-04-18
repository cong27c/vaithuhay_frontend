import Button from "~/components/Button";
import styles from "./Recruitment.module.scss";
import { Link } from "react-router-dom";

function Recruitment() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img
            src="https://w.ladicdn.com/s550x500/5c0b681b8b014a0649e90d0a/vaithuhay-trang-20230224095816-lb9ia.png"
            alt=""
          />
        </div>
        <div className={styles.title}>
          GREAT VISION, WITHOUT GREAT <strong>PEOPLE</strong> IS IRRELEVANT
        </div>
        <div className={styles.box}>
          <div className={styles.desc}>Choose the best seat:</div>
          <div className={styles.listbtn}>
            <Button tabButton className={styles.btn}>
              SALE & CUSTOMER SERVICE
            </Button>
            <Button tabButton className={styles.btn}>
              MARKETING EXECUTIVE
            </Button>
            <Button tabButton className={styles.btn}>
              MARKETING INTERN
            </Button>
            <Button tabButton className={styles.btn}>
              WAREHOUSE & TECHNIQUE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recruitment;
