import styles from "./ButtonsList.module.scss";
import PropTypes from "prop-types";

function ButtonsList({ width, top }) {
  return (
    <>
      <div
        className={styles["list-button"]}
        style={{
          "--width": width,
          "--top": top,
        }}
      >
        <button className={styles.prev}>&#10094;</button>
        <button className={styles.next}>&#10095;</button>
      </div>
    </>
  );
}
ButtonsList.propTypes = {
  width: PropTypes.any,
  top: PropTypes.any,
};
export default ButtonsList;
