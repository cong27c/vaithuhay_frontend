import styles from "./Middle.module.scss";

function Middle() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles["footer-column"]}>
          <h3>VỀ CHÚNG TÔI</h3>
          <ul>
            <li>Chúng tôi là ai</li>
            <li>Tuyển dụng</li>
            <li>Trả góp 0% lãi suất qua thẻ</li>
            <li>Quà tặng doanh nghiệp</li>
          </ul>
        </div>

        <div className={styles["footer-column"]}>
          <h3>CÁC CHÍNH SÁCH</h3>
          <ul>
            <li>Chương trình thành viên Loyalty</li>
            <li>Chính sách đặt trước Pre-Order</li>
            <li>Chính sách đổi trả & bảo hành</li>
            <li>Kiểm tra hành trình đơn hàng</li>
            <li>Hướng dẫn mua hàng & thanh toán</li>
            <li>Chính sách bảo mật thông tin khách hàng</li>
          </ul>
        </div>

        <div className={styles["footer-column"]}>
          <h3>DANH MỤC SẢN PHẨM</h3>
          <ul>
            <li>Tất cả sản phẩm</li>
            <li>Bàn nâng hạ</li>
            <li>Ghế công thái học</li>
            <li>Chiến dịch đặt hàng trước</li>
            <li>Thương hiệu NID Việt Nam</li>
            <li>Bàn phím</li>
            <li>Setup góc làm việc</li>
            <li>Sản phẩm tại showroom Vaithuhay</li>
            <li>Showcase - Nơi khám phá những sản phẩm độc đáo</li>
            <li>Bộ sưu tập bình giữ nhiệt HydroFlask</li>
          </ul>
        </div>

        <div className={styles["footer-column"]}>
          <div className={styles["sale-logos"]}>
            <a href="#!">
              <img
                src="https://theme.hstatic.net/1000069970/1001119059/14/footer_ecommerce_1_compact.png?v=7149​"
                alt="Shopee Mall"
              />
            </a>
            <a href="#!">
              <img
                src="//theme.hstatic.net/1000069970/1001119059/14/footer_ecommerce_2_compact.png?v=7149"
                alt="LazMall"
              />
            </a>
          </div>
          <p>Đến các TMĐT của Vaithuhay để nhận nhiều khuyến mãi hơn</p>
        </div>
      </div>
    </>
  );
}

export default Middle;
