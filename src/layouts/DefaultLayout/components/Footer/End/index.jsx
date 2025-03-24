import styles from "./End.module.scss";

function End() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.logoSection}>
            <div className={styles.logos}>
              <img
                src="//theme.hstatic.net/1000069970/1001119059/14/logo-bct-1_medium.png?v=7149 "
                alt="Vaithuhay Logo"
              />
              <img
                src="//theme.hstatic.net/1000069970/1001119059/14/logo-bct-2_medium.png?v=7149"
                alt="Quatanghay Logo"
              />
            </div>
            <p>
              Vaithuhay.com là một website phân phối và thiết kế sản phẩm công
              nghiệp sáng tạo, với mong muốn thiết lập lại một triết lý nhằm
              định nghĩa lại cuộc sống thông qua việc đổi mới các vật dụng hàng
              ngày.
            </p>
            <p>
              Và cam kết kiên quyết cung cấp các sản phẩm sáng tạo, chất lượng
              kết hợp với thiết kế công nghiệp độc đáo để tạo ra giá trị mới.
            </p>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className={styles.contactSection}>
            <h4>Trụ sở văn phòng:</h4>
            <p>
              Showroom Hồ Chí Minh: Số 7, Nguyễn Văn Vĩnh, P.4, Q.Tân Bình,
              TP.HCM
            </p>
            <p>
              Showroom Hà Nội: Số 28 lô TT01, Khu liên kế Chung cư HD Mon City,
              Mỹ Đình, Nam Từ Liêm
            </p>
            <h4>Email:</h4>
            <p>support@vaithuhay.com</p>
            <p>partner@vaithuhay.com</p>
            <h4>Số điện thoại:</h4>
            <p>0938.228.865 (Tư vấn mua hàng)</p>
            <p>0968.888.640 (Chăm sóc khách hàng)</p>
            <p>0287.101.5808 (Khách hàng doanh nghiệp)</p>
            <h4>Giờ làm việc:</h4>
            <p>8:00 AM - 20:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default End;
