import Button from "~/components/Button";
import styles from "./JobFooterSection.module.scss";

function JobFooterSection() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.companyIn4}>
        <div className={styles.image}>
          <img
            src="http://theme.hstatic.net/1000069970/1001119059/14/logo-bct-1_medium.png?v=7149"
            alt=""
          />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>Công ty cổ phần TM & CN Newideas</div>
          <div className={styles.address}>
            Địa chỉ: 26 đường C12, phường 13, quận Tân Bình, Tp.HCM
          </div>
          <div className={styles.email}>Email: support@vaithuhay.com</div>
          <div className={styles.hotline}>Hotline: 093.822.8865</div>
          <div className={styles.webName}>Website: vaithuhay.com</div>
        </div>
      </div>
      <div className={styles.ShowRoomLocation}>
        <div className={styles.title}>SHOWROOM LOCATED</div>
        <div className={styles.desc}>
          <strong>SHOWROOM 1</strong> - 26 đường C12, phường 13, quận Tân Bình,
          Tp.HCM
        </div>
        <div className={styles.desc}>
          <strong>SHOWROOM 2</strong> - 26A Đường 2, Phường Thảo Điền, Quận 2,
          TP. Hồ Chí Minh
        </div>
      </div>
      <div className={styles.button}>
        <div className={styles.title}>NỘP HỒ SƠ NGAY</div>
        <Button tabButton className={styles.btn}>
          ỨNG TUYỂN NGAY
        </Button>
      </div>
    </div>
  );
}

export default JobFooterSection;
