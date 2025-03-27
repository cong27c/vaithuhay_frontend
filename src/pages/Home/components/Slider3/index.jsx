import images from "~/assets/images";
import ButtonsList from "../ButtonsList";
import styles from "./Slider3.module.scss";
import Button from "~/components/Button";

function Slider3() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.Slider3}>
        <h2 className={styles.Maintitle}>
          SẢN PHẨM CHƯA TỪNG XUẤT HIỆN TẠI VIỆT NAM
        </h2>
        <div className={styles.top}>
          <div className={styles.btnList}>
            <Button tabButton>Sản phẩm mới nhất</Button>
            <Button tabButton>Sản phẩm được quan tâm</Button>
            <Button tabButton>Sản phẩm độc đáo</Button>
          </div>
          <button className={styles.btnMore}>
            Khám phá thêm <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <div className={styles.middle}>
          <div className={styles.ListCard}>
            <div className={styles.cardItem}>
              <a href="#!">
                <img src={images.course1} alt="" />
              </a>
              <div className={styles.content}>
                <h3 className={styles.title}>
                  JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet
                </h3>
                <div className={styles.desc}>Có giá bán lẻ khi hàng có sẵn</div>
                <div className={styles.price}> 850,000₫</div>
                <div className={styles.notification}>Số lượng cực ít</div>
                <div className={styles.buttonList}>
                  <button className={styles.btn}>Nhận ưu đãi 15%</button>
                  <div className={styles["cart-icon"]}>
                    <i className="fa-solid fa-cart-plus"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cardItem}>
              <a href="#!">
                <img src={images.course1} alt="" />
              </a>
              <div className={styles.content}>
                <h3 className={styles.title}>
                  JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet
                </h3>
                <div className={styles.desc}>Có giá bán lẻ khi hàng có sẵn</div>
                <div className={styles.price}> 850,000₫</div>
                <div className={styles.notification}>Số lượng cực ít</div>
                <div className={styles.buttonList}>
                  <button className={styles.btn}>Nhận ưu đãi 15%</button>
                  <div className={styles["cart-icon"]}>
                    <i className="fa-solid fa-cart-plus"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cardItem}>
              <a href="#!">
                <img src={images.course1} alt="" />
              </a>
              <div className={styles.content}>
                <h3 className={styles.title}>
                  JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet
                </h3>
                <div className={styles.desc}>Có giá bán lẻ khi hàng có sẵn</div>
                <div className={styles.price}> 850,000₫</div>
                <div className={styles.notification}>Số lượng cực ít</div>
                <div className={styles.buttonList}>
                  <button className={styles.btn}>Nhận ưu đãi 15%</button>
                  <div className={styles["cart-icon"]}>
                    <i className="fa-solid fa-cart-plus"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cardItem}>
              <a href="#!">
                <img src={images.course1} alt="" />
              </a>
              <div className={styles.content}>
                <h3 className={styles.title}>
                  JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet
                </h3>
                <div className={styles.desc}>Có giá bán lẻ khi hàng có sẵn</div>
                <div className={styles.price}> 850,000₫</div>
                <div className={styles.notification}>Số lượng cực ít</div>
                <div className={styles.buttonList}>
                  <button className={styles.btn}>Nhận ưu đãi 15%</button>
                  <div className={styles["cart-icon"]}>
                    <i className="fa-solid fa-cart-plus"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cardItem}>
              <a href="#!">
                <img src={images.course1} alt="" />
              </a>
              <div className={styles.content}>
                <h3 className={styles.title}>
                  JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet
                </h3>
                <div className={styles.desc}>Có giá bán lẻ khi hàng có sẵn</div>
                <div className={styles.price}> 850,000₫</div>
                <div className={styles.notification}>Số lượng cực ít</div>
                <div className={styles.buttonList}>
                  <button className={styles.btn}>Nhận ưu đãi 15%</button>
                  <div className={styles["cart-icon"]}>
                    <i className="fa-solid fa-cart-plus"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cardItem}>
              <a href="#!">
                <img src={images.course1} alt="" />
              </a>
              <div className={styles.content}>
                <h3 className={styles.title}>
                  JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet
                </h3>
                <div className={styles.desc}>Có giá bán lẻ khi hàng có sẵn</div>
                <div className={styles.price}> 850,000₫</div>
                <div className={styles.notification}>Số lượng cực ít</div>
                <div className={styles.buttonList}>
                  <button className={styles.btn}>Nhận ưu đãi 15%</button>
                  <div className={styles["cart-icon"]}>
                    <i className="fa-solid fa-cart-plus"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cardItem}>
              <a href="#!">
                <img src={images.course1} alt="" />
              </a>
              <div className={styles.content}>
                <h3 className={styles.title}>
                  JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet
                </h3>
                <div className={styles.desc}>Có giá bán lẻ khi hàng có sẵn</div>
                <div className={styles.price}> 850,000₫</div>
                <div className={styles.notification}>Số lượng cực ít</div>
                <div className={styles.buttonList}>
                  <button className={styles.btn}>Nhận ưu đãi 15%</button>
                  <div className={styles["cart-icon"]}>
                    <i className="fa-solid fa-cart-plus"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cardItem}>
              <a href="#!">
                <img src={images.course1} alt="" />
              </a>
              <div className={styles.content}>
                <h3 className={styles.title}>
                  JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet
                </h3>
                <div className={styles.desc}>Có giá bán lẻ khi hàng có sẵn</div>
                <div className={styles.price}> 850,000₫</div>
                <div className={styles.notification}>Số lượng cực ít</div>
                <div className={styles.buttonList}>
                  <button className={styles.btn}>Nhận ưu đãi 15%</button>
                  <div className={styles["cart-icon"]}>
                    <i className="fa-solid fa-cart-plus"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.dotList}>
          <div className={`${styles.dot} ${styles.active}`}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
        <ButtonsList />
      </div>
    </div>
  );
}

export default Slider3;
