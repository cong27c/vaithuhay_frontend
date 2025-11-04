import images from "@/assets/images";
import styles from "./SlideHalfImageDefault.module.scss";
import Button from "@/components/Button";
import Slider from "@/components/Slider";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getByProductsSlug } from "@/Services/collectionService";

function SlideHalfImageDefault() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const slug = "cong-nghe-tien-ich-co-san";
      const data = await getByProductsSlug(slug);

      // Thêm field variant cho mỗi sản phẩm
      const updatedProducts = data?.map((product) => ({
        ...product,
        variant: "alternative",
      }));

      console.log(updatedProducts);
      setProducts(updatedProducts);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.Slider3}>
        <h2 className={styles.Maintitle}>SẢN PHẨM HOT</h2>
        <div className={styles.top}>
          <div className={styles.btnList}>
            <Button tabButton>Sản phẩm mới nhất</Button>
            <Button tabButton>Sản phẩm được quan tâm</Button>
            <Button tabButton>Sản phẩm độc đáo</Button>
          </div>
          <Button discoverButton icon={faArrowRight}>
            KHÁM PHÁ NGAY
          </Button>
        </div>
        <div className={styles.middle}>
          <div className={styles.ListCard}>
            <Slider slides={products} type="half-image" wrap={true} />
          </div>
        </div>
        <div className={styles.dotList}>
          <div className={`${styles.dot} ${styles.active}`}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    </div>
  );
}

export default SlideHalfImageDefault;
