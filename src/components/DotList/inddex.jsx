import styles from "./DotList.module.scss";
import clsx from "clsx";

const DotList = ({
  total = 5,
  activeIndex = 0,
  size = 10,
  onDotClick = () => {},
}) => {
  return (
    <div className={styles.dotList}>
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={clsx(styles.dot, {
            [styles.active]: index === activeIndex,
          })}
          style={{ width: size, height: size }}
          onClick={() => onDotClick(index)}
        />
      ))}
    </div>
  );
};

export default DotList;
