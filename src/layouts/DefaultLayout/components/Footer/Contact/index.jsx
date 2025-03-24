import styles from "./Contact.module.scss";

function Contact() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>LIÊN HỆ NGAY ĐỂ ĐỒNG HÀNH CÙNG CHÚNG TÔI</h2>
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
            <button className={styles.btnRegister}>
              ĐĂNG KÝ
              <img
                className={styles.icon}
                src="https://cdn-icons-png.flaticon.com/512/60/60525.png"
                alt="icon"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
