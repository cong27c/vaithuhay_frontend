import images from "@/assets/images";
import styles from "./SlideHalfImageDefault.module.scss";
import Button from "@/components/Button";
import Slider from "@/components/Slider";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function SlideHalfImageDefault() {
  const slidesData = [
    {
      title: `JSAUX STAND Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course4,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course1,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course2,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course3,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course5,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course1,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course2,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course3,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course4,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course1,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course2,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course3,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course5,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course1,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course2,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course3,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course4,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course1,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course2,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course3,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course5,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course1,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND COLLECTION - Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course2,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
    {
      title: `JSAUX STAND Bộ phụ kiện từ tính hỗ trợ nâng đỡ,
                  bảo vệ màn hình, Ipad, tablet`,
      image: images.course3,
      variant: "alternative",
      desc: `Có giá bán lẻ khi hàng có sẵn`,
      price: `850,000₫`,
      notification: "Số lượng cực ít",
      sale: "15%",
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.Slider3}>
        <h2 className={styles.Maintitle}>
          SẢN PHẨM CHƯA TỪNG XUẤT HIỆN TẠI VIỆT NAM
        </h2>
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
            <Slider slides={slidesData} type="half-image" wrap={true} />
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
