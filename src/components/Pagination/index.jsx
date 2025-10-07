import styles from "./Pagination.module.scss";
import PropTypes from "prop-types";

function Pagination({
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 8,
  onPageChange = () => {},
  size = 40,
  fontSize = 1,
  gap = 8,
  prevNextWidth = "auto",
  prevNextPadding = "0 15px",
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null; // không hiển thị nếu chỉ có 1 trang

  const handleClick = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        pages.push(
          <a
            key={i}
            href="#"
            className={i === currentPage ? styles.active : ""}
            onClick={(e) => {
              e.preventDefault();
              handleClick(i);
            }}
          >
            {i}
          </a>,
        );
      } else if (
        (i === 2 && currentPage > 3) ||
        (i === totalPages - 1 && currentPage < totalPages - 2)
      ) {
        pages.push(
          <span key={i} className={styles.dots}>
            ...
          </span>,
        );
      }
    }
    return pages;
  };

  return (
    <div
      className={styles["pagination-gradient"]}
      style={{
        "--pagination-size": `${size}px`,
        "--pagination-font-size": `${fontSize}px`,
        "--pagination-gap": `${gap}px`,
        "--pagination-prev-next-width": prevNextWidth,
        "--pagination-prev-next-padding": prevNextPadding,
      }}
    >
      <a
        href="#"
        className={styles["prev-next"]}
        onClick={(e) => {
          e.preventDefault();
          handleClick(currentPage - 1);
        }}
      >
        Prev
      </a>

      {renderPageNumbers()}

      <a
        href="#"
        className={styles["prev-next"]}
        onClick={(e) => {
          e.preventDefault();
          handleClick(currentPage + 1);
        }}
      >
        Next
      </a>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  size: PropTypes.number,
  fontSize: PropTypes.number,
  gap: PropTypes.number,
  prevNextWidth: PropTypes.string,
  prevNextPadding: PropTypes.string,
};

export default Pagination;
