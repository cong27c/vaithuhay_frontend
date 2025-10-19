import styles from "./Card.module.scss";

const Card = ({ children, className = "", title, subtitle, ...props }) => {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      {title && (
        <div className={styles.cardHeader}>
          <h3 className={styles.title}>{title}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
};

export default Card;
