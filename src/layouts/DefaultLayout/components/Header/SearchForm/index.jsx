import styles from "./SearchForm.module.scss";

function SearchForm() {
  return (
    <>
      <form action="" className={styles.wrapper}>
        <input
          type="text"
          className={styles.SearchForm}
          placeholder="Tìm sản phẩm"
        />
        <button className={styles["search-icon"]}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </>
  );
}
export default SearchForm;
