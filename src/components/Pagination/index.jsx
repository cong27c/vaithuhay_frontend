import styles from "./Pagination.module.scss";
import PropTypes from "prop-types";

function Pagination({
  size = 40,
  fontSize = 1,
  gap = 8,
  prevNextWidth = "auto",
  prevNextPadding = "0 15px",
  ...props
}) {
  return (
    <>
      <div
        className={styles["pagination-gradient"]}
        style={{
          "--pagination-size": `${size}px`,
          "--pagination-font-size": `${fontSize}px`,
          "--pagination-gap": `${gap}px`,
          "--pagination-prev-next-width": prevNextWidth,
          "--pagination-prev-next-padding": prevNextPadding,
        }}
        {...props}
      >
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
Pagination.propTypes = {
  size: PropTypes.number,
  fontSize: PropTypes.number,
  gap: PropTypes.number,
  prevNextWidth: PropTypes.string,
  prevNextPadding: PropTypes.string,
};
export default Pagination;
