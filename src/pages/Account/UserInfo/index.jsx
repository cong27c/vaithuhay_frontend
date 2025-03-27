import styles from "./UserInfo.module.scss";

function UserInfo() {
  return (
    <div className={styles.UserInfo}>
      <form className={styles.todoForm}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Họ và tên</label>
          <input type="text" id="name" placeholder="Nhập họ và tên" />
        </div>

        <div className={styles["form-group"]}>
          <label>Giới tính</label>
          <div className={styles["radio-group"]}>
            <input type="radio" id="male" name="gender" />
            <label htmlFor="male">Nam</label>
            <input type="radio" id="female" name="gender" />
            <label htmlFor="female">Nữ</label>
          </div>
        </div>

        <div className={styles["form-group"]}>
          <label>Địa chỉ</label>
          <button className={styles["address-btn"]}>
            Xem & điều chỉnh địa chỉ của bạn
          </button>
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Nhập email" />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="phone">Số điện thoại</label>
          <input type="tel" id="phone" placeholder="Nhập số điện thoại" />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="dob">Ngày sinh</label>
          <input type="date" id="dob" />
        </div>

        <button type="submit" className={styles["submit-btn"]}>
          CẬP NHẬT
        </button>
      </form>
    </div>
  );
}

export default UserInfo;
