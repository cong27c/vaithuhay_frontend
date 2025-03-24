import styles from "./Navigation.module.scss";

function Navigation() {
  return (
    <>
      <nav className={styles.wrapper}>
        <ul>
          <li className="active">
            <a href="#!">Trang chủ</a>
          </li>
          <li>
            <a href="#!">
              Khám phá<i className="fa-solid fa-chevron-down"></i>
            </a>
          </li>
          <li>
            <a href="#!">
              Tìm hiểu thêm<i className="fa-solid fa-chevron-down"></i>
            </a>
          </li>
          <li>
            <a href="#!">
              Bài viết<i className="fa-solid fa-chevron-down"></i>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default Navigation;
