import ButtonsList from "../ButtonsList";
import styles from "./Slider1.module.scss";
import images from "~/assets/images";

function Slider1() {
  return (
    <>
      <div className={styles.Slider}>
        <h2 className={styles.title}>
          CÙNG VAITHUHAY ĐẶT HÀNG VỀ TAY SỚM NHẤT
        </h2>
        <div className={styles["list-bar"]}>
          <button className={styles.btn}>DỰ ÁN THỊNH HÀNH</button>
          <button className={styles.btn}>MỚI RA MẮT</button>
          <button className={styles.btn}>MỞ BÁN ĐỢT 2</button>
          <button className={styles.btn}>SẮP KẾT THÚC</button>
          <button className={styles.btn}>SẮP VỀ HÀNG</button>
          <button className={styles.btn}>XEM TẤT CẢ </button>
        </div>
        <div className={styles["list-card"]}>
          <div className={styles["card-item"]}>
            <div className={styles.ribbon}>
              <span>PRE-ORDER</span>
            </div>
            <a href="#!">
              <img src={images.course1} alt="Product Image" />
            </a>
            <div className={styles.content}>
              <h3>Blindbox Natra 2 Popmart - Hộp mù Natra 2 Ma động náo hải</h3>
              <div className={styles.status}>Số lượng đã đặt: 23/360</div>
              <div className={styles.progress}>
                <div className={styles["progress-bar"]}></div>
              </div>
              <div className={styles.date}>Chiến dịch kết thúc: 12/04/2025</div>
            </div>
          </div>
          <div className={styles["card-item"]}>
            <div className={styles.ribbon}>
              <span>PRE-ORDER</span>
            </div>
            <a href="#!">
              <img src={images.course2} alt="Product Image" />
            </a>
            <div className={styles.content}>
              <h3>Blindbox Natra 2 Popmart - Hộp mù Natra 2 Ma động náo hải</h3>
              <div className={styles.status}>Số lượng đã đặt: 23/360</div>
              <div className={styles.progress}>
                <div className={styles["progress-bar"]}></div>
              </div>
              <div className={styles.date}>Chiến dịch kết thúc: 12/04/2025</div>
            </div>
          </div>
          <div className={styles["card-item"]}>
            <div className={styles.ribbon}>
              <span>PRE-ORDER</span>
            </div>
            <a href="#!">
              <img src={images.course3} alt="Product Image" />
            </a>
            <div className={styles.content}>
              <h3>Blindbox Natra 2 Popmart - Hộp mù Natra 2 Ma động náo hải</h3>
              <div className={styles.status}>Số lượng đã đặt: 23/360</div>
              <div className={styles.progress}>
                <div className={styles["progress-bar"]}></div>
              </div>
              <div className={styles.date}>Chiến dịch kết thúc: 12/04/2025</div>
            </div>
          </div>
          <div className={styles["card-item"]}>
            <div className={styles.ribbon}>
              <span>PRE-ORDER</span>
            </div>
            <a href="#!">
              <img src={images.course4} alt="Product Image" />
            </a>
            <div className={styles.content}>
              <h3>Blindbox Natra 2 Popmart - Hộp mù Natra 2 Ma động náo hải</h3>
              <div className={styles.status}>Số lượng đã đặt: 23/360</div>
              <div className={styles.progress}>
                <div className={styles["progress-bar"]}></div>
              </div>
              <div className={styles.date}>Chiến dịch kết thúc: 12/04/2025</div>
            </div>
          </div>
          <div className={styles["card-item"]}>
            <div className={styles.ribbon}>
              <span>PRE-ORDER</span>
            </div>
            <a href="#!">
              <img src={images.course5} alt="Product Image" />
            </a>
            <div className={styles.content}>
              <h3>Blindbox Natra 2 Popmart - Hộp mù Natra 2 Ma động náo hải</h3>
              <div className={styles.status}>Số lượng đã đặt: 23/360</div>
              <div className={styles.progress}>
                <div className={styles["progress-bar"]}></div>
              </div>
              <div className={styles.date}>Chiến dịch kết thúc: 12/04/2025</div>
            </div>
          </div>
        </div>
        <ButtonsList />
      </div>
    </>
  );
}

export default Slider1;
