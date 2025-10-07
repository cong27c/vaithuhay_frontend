import Button from "@/components/Button";
import styles from "./Contact.module.scss";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function Contact() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.contact}>
        <h2 className={styles.title}>
          LIÊN HỆ NGAY ĐỂ ĐỒNG HÀNH CÙNG CHÚNG TÔI
        </h2>
        <div className={styles.content}>
          <div className={styles.type}>
            <div className={styles.open}>Bạn là...</div>
            <button className={styles.btn}>PHÂN PHỐI/ĐẠI LÝ</button>
            <button
              className={styles.btn}
            >{`BÁN HÀNG LIÊN KẾT (AFFILIATE)`}</button>
            <button className={styles.btn}>QUÀ TẶNG DOANH NGHIỆP</button>
            <button className={styles.btn}>
              YOUTUBER/TIKTOKER/ CONTENT CREATOR
            </button>
          </div>
          <div className={styles.register}>
            <form className={styles.form}>
              <input type="text" placeholder="Tên:" />
              <input type="text" placeholder="Số Điện Thoại:" />
              <input type="text" placeholder="Email:" />
              <Button
                draculaButton
                size="large"
                className={styles.btnRegister}
                icon={faPaperPlane}
              >
                Đăng ký
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
