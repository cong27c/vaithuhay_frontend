import styles from "./Pagination.module.scss";

function Pagination() {
  return (
    <>
      <div className={styles["pagination-gradient"]}>
        <a href="#" className={styles["prev-next"]}>
          Prev
        </a>
        <a href="#">1</a>
        <a href="#" className={styles["active"]}>
          2
        </a>
        <a href="#">3</a>
        <span className={styles["dots"]}>...</span>
        <a href="#">8</a>
        <a href="#" className={styles["prev-next"]}>
          Next
        </a>
      </div>
    </>
  );
}

export default Pagination;
