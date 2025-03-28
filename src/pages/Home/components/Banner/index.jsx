import Button from "~/components/Button";
import ButtonsList from "../ButtonsList";
import styles from "./Banner.module.scss";
import images from "~/assets/images";

function Banner() {
  return (
    <>
      <div className={styles["banner-events"]}>
        <div className={styles.backGround}>
          <div className={styles["banner-up"]}>
            <h2 className={styles.title}>
              <i className="fas fa-bolt" style={{ color: "yellow" }}></i> Tháng
              3 ấm áp, trọn vẹn nghĩa tình
            </h2>
          </div>

          <Button discoverButton className={styles.btnMore} size="large">
            Xem thêm
          </Button>
          <div className={styles.countdown}>
            <p className={styles.desc}>Deal này sắp hết thời gian</p>
            <div className={styles["list-item"]}>
              <div className={styles["countdown-item"]}>
                <span className={styles.number}>10</span>
                <span className={styles.label}>ngày</span>
              </div>
              <div className={styles.separator}>:</div>
              <div className={styles["countdown-item"]}>
                <span className={styles.number}>00</span>
                <span className={styles.label}>giờ</span>
              </div>
              <div className={styles.separator}>:</div>
              <div className={styles["countdown-item"]}>
                <span className={styles.number}>27</span>
                <span className={styles.label}>phút</span>
              </div>
              <div className={styles.separator}>:</div>
              <div className={styles["countdown-item"]}>
                <span className={styles.number}>05</span>
                <span className={styles.label}>giây</span>
              </div>
            </div>
          </div>
          <div className={styles["banner-down"]}>
            <div className={styles["list-card"]}>
              <div className={styles["card-item"]}>
                <div className={styles["product-image"]}>
                  <a href="#!">
                    <img src={images.course1} alt="Product Image" />
                  </a>
                  <div className={styles["stock-info"]}>
                    <div>🔥Còn 7</div>
                    <div className={styles["limited-stock"]}>
                      Giới hạn chỉ 7 sản phẩm
                    </div>
                  </div>
                </div>
                <div className={styles.content}>
                  <h4 className={styles.title}>
                    Bàn nâng hạ tự động Ergonomic Desk 9SPACE GỖ VENEER
                  </h4>
                  <p className={styles.cost}>Giá niêm yết: 10,500,000đ</p>
                  <div className={styles.price}>
                    <div className={styles.cost}>6,930,000đ</div>
                    <div className={styles.sale}>-34%</div>
                  </div>
                  <div className={styles["list-btn"]}>
                    <button className={styles.btn}>XEM THÊM</button>
                    <button className={styles.btn}>MUA NGAY</button>
                  </div>
                </div>
              </div>
              <div className={styles["card-item"]}>
                <div className={styles["product-image"]}>
                  <a href="#!">
                    <img src={images.course2} alt="Product Image" />
                  </a>
                  <div className={styles["stock-info"]}>
                    <div>🔥Còn 7</div>
                    <div className={styles["limited-stock"]}>
                      Giới hạn chỉ 7 sản phẩm
                    </div>
                  </div>
                </div>
                <div className={styles.content}>
                  <h4 className={styles.title}>
                    Bàn nâng hạ tự động Ergonomic Desk 9SPACE GỖ VENEER
                  </h4>
                  <p className={styles.cost}>Giá niêm yết: 10,500,000đ</p>
                  <div className={styles.price}>
                    <div className={styles.cost}>6,930,000đ</div>
                    <div className={styles.sale}>-34%</div>
                  </div>
                  <div className={styles["list-btn"]}>
                    <button className={styles.btn}>XEM THÊM</button>
                    <button className={styles.btn}>MUA NGAY</button>
                  </div>
                </div>
              </div>
              <div className={styles["card-item"]}>
                <div className={styles["product-image"]}>
                  <a href="#!">
                    <img src={images.course3} alt="Product Image" />
                  </a>
                  <div className={styles["stock-info"]}>
                    <div>🔥Còn 7</div>
                    <div className={styles["limited-stock"]}>
                      Giới hạn chỉ 7 sản phẩm
                    </div>
                  </div>
                </div>
                <div className={styles.content}>
                  <h4 className={styles.title}>
                    Bàn nâng hạ tự động Ergonomic Desk 9SPACE GỖ VENEER
                  </h4>
                  <p className={styles.cost}>Giá niêm yết: 10,500,000đ</p>
                  <div className={styles.price}>
                    <div className={styles.cost}>6,930,000đ</div>
                    <div className={styles.sale}>-34%</div>
                  </div>
                  <div className={styles["list-btn"]}>
                    <button className={styles.btn}>XEM THÊM</button>
                    <button className={styles.btn}>MUA NGAY</button>
                  </div>
                </div>
              </div>
              <div className={styles["card-item"]}>
                <div className={styles["product-image"]}>
                  <a href="#!">
                    <img src={images.course4} alt="Product Image" />
                  </a>
                  <div className={styles["stock-info"]}>
                    <div>🔥Còn 7</div>
                    <div className={styles["limited-stock"]}>
                      Giới hạn chỉ 7 sản phẩm
                    </div>
                  </div>
                </div>
                <div className={styles.content}>
                  <h4 className={styles.title}>
                    Bàn nâng hạ tự động Ergonomic Desk 9SPACE GỖ VENEER
                  </h4>
                  <p className={styles.cost}>Giá niêm yết: 10,500,000đ</p>
                  <div className={styles.price}>
                    <div className={styles.cost}>6,930,000đ</div>
                    <div className={styles.sale}>-34%</div>
                  </div>
                  <div className={styles["list-btn"]}>
                    <button className={styles.btn}>XEM THÊM</button>
                    <button className={styles.btn}>MUA NGAY</button>
                  </div>
                </div>
              </div>
              <div className={styles["card-item"]}>
                <div className={styles["product-image"]}>
                  <a href="#!">
                    <img src={images.course5} alt="Product Image" />
                  </a>
                  <div className={styles["stock-info"]}>
                    <div>🔥Còn 7</div>
                    <div className={styles["limited-stock"]}>
                      Giới hạn chỉ 7 sản phẩm
                    </div>
                  </div>
                </div>
                <div className={styles.content}>
                  <h4 className={styles.title}>
                    Bàn nâng hạ tự động Ergonomic Desk 9SPACE GỖ VENEER
                  </h4>
                  <p className={styles.cost}>Giá niêm yết: 10,500,000đ</p>
                  <div className={styles.price}>
                    <div className={styles.cost}>6,930,000đ</div>
                    <div className={styles.sale}>-34%</div>
                  </div>
                  <div className={styles["list-btn"]}>
                    <button className={styles.btn}>XEM THÊM</button>
                    <button className={styles.btn}>MUA NGAY</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ButtonsList top="75%" />
      </div>
    </>
  );
}

export default Banner;
