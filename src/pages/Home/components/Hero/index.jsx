import ButtonsList from "../ButtonsList";
import styles from "./Hero.module.scss";

function Hero() {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.body}>
          <div className={styles["body-left"]}>
            <div className={styles["toggle-switch"]}>
              <input
                type="checkbox"
                id="toggle"
                className={styles["toggle-input"]}
              />
              <label htmlFor="toggle" className={styles["toggle-label"]}>
                <span className={styles["toggle-text"]}>Danh mục</span>
                <span className={styles["toggle-text"]}>Đối tác</span>
              </label>
              <div className={styles.content}>
                <div className={styles["list-item"]}>
                  <div className={styles.item}>
                    <img src="./assets/img/avatar2.jpg" alt="" />
                    <p className={styles.desc}>Lorem ipsum dolor sit amet</p>
                  </div>
                  <div className={styles.line}></div>
                  <div className={styles.item}>
                    <img src="./assets/img/avatar2.jpg" alt="" />
                    <p className={styles.desc}>Lorem ipsum dolor sit amet</p>
                  </div>
                  <div className={styles.line}></div>
                  <div className={styles.item}>
                    <img src="./assets/img/avatar2.jpg" alt="" />
                    <p className={styles.desc}>Lorem ipsum dolor sit amet</p>
                  </div>
                  <div className={styles.line}></div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["body-right"]}>
            <div className={styles.slideShow}>
              <div className={styles.listImage}>
                <img
                  src="//theme.hstatic.net/1000069970/1001119059/14/slideshow_1_2048x2048.jpg?v=7149"
                  alt=""
                />
                <ButtonsList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
