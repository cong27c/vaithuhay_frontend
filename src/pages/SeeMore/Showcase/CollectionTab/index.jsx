import Button from "@/components/Button";
import styles from "./CollectionTab.module.scss";

function CollectionTab({ collectionTab }) {
  return (
    <>
      <div className={styles.lisbtn}>
        {collectionTab.map((item, index) => (
          <Button key={index} tabButton className={styles.btn}>
            {item.Children}
          </Button>
        ))}
      </div>
    </>
  );
}

export default CollectionTab;
