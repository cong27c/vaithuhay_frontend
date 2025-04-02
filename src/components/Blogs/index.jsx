import ArticleList from "../ArticleList";
import Pagination from "../Pagination";
import styles from "./Blogs.module.scss";
import PropTypes from "prop-types";

function Blogs({ title = "Setup Decor", type = "setup-decor" }) {
  console.log(type);
  const technologyIn4 = [
    {
      id: 1,
      title: "Cảm hứng đằng sau thiết kế của Nuphy Kick75: Từ Air Force 1",
      author: "Xuân Trang",
      date: "21.03.2005",
      image:
        "https://file.hstatic.net/1000069970/article/284dc4b89c4a6c8117095cf7b593906_4432509d98724fac88ed3e1b0f924df8_large.jpg",
      classParticular: styles.bigLeft,
    },
    {
      id: 2,
      title: "Cảm hứng đằng sau thiết kế của Nuphy Kick75: Từ Air Force 1",
      author: "Xuân Trang",
      date: "21.03.2005",
      image:
        "https://file.hstatic.net/1000069970/article/tai_xuong_f0c47f8b309149bda56d20c4a48ae558_grande.jpg",
      classParticular: styles.bigRightUp,
    },
    {
      id: 3,
      title: "Cảm hứng đằng sau thiết kế của Nuphy Kick75: Từ Air Force 1",
      author: "Xuân Trang",
      date: "21.03.2005",
      image:
        "https://file.hstatic.net/1000069970/article/top_cac_dong_san_pham_cong_nghe_duoc_yeu_thich_nhat_nam_2024__6__affe512a817b41cbb6e3f3f69d54f7e2_grande.png",
      classParticular: styles.smallLeftDown,
    },
    {
      id: 4,
      title: "Cảm hứng đằng sau thiết kế của Nuphy Kick75: Từ Air Force 1",
      author: "Xuân Trang",
      date: "21.03.2005",
      image:
        "https://file.hstatic.net/1000069970/article/top_cac_dong_san_pham_cong_nghe_duoc_yeu_thich_nhat_nam_2024__4__99851aea567e4f269b18ebfa0bf7960e_grande.png",
      classParticular: styles.smallRightDown,
    },
    {
      id: 5,
      title: "Cảm hứng đằng sau thiết kế của Nuphy Kick75: Từ Air Force 1",
      author: "Xuân Trang",
      date: "21.03.2005",
      image:
        "https://file.hstatic.net/1000069970/article/top_cac_dong_san_pham_cong_nghe_duoc_yeu_thich_nhat_nam_2024__5__d6f8ffe9a5f046698c56d48204fde3db_grande.png",
    },
    {
      id: 6,
      title: "Cảm hứng đằng sau thiết kế của Nuphy Kick75: Từ Air Force 1",
      author: "Xuân Trang",
      date: "21.03.2005",
      image:
        "https://file.hstatic.net/1000069970/article/top_cac_dong_san_pham_cong_nghe_duoc_yeu_thich_nhat_nam_2024__3__844914c7fc034dbaa6229a13c251e380_grande.png",
    },
    {
      id: 7,
      title: "Cảm hứng đằng sau thiết kế của Nuphy Kick75: Từ Air Force 1",
      author: "Xuân Trang",
      date: "21.03.2005",
      image:
        "https://file.hstatic.net/1000069970/article/top_cac_dong_san_pham_cong_nghe_duoc_yeu_thich_nhat_nam_2024__2__ffa0602917e945ec8c3eadaad4dcc077_grande.png",
    },
    {
      id: 8,
      title: "Cảm hứng đằng sau thiết kế của Nuphy Kick75: Từ Air Force 1",
      author: "Xuân Trang",
      date: "21.03.2005",
      image:
        "https://file.hstatic.net/1000069970/article/top_cac_dong_san_pham_cong_nghe_duoc_yeu_thich_nhat_nam_2024__1__b420568dac6a49b6aa374d59b1ef62d8_grande.png",
    },
    {
      id: 9,
      title: "Cảm hứng đằng sau thiết kế của Nuphy Kick75: Từ Air Force 1",
      author: "Xuân Trang",
      date: "21.03.2005",
      image:
        "https://file.hstatic.net/1000069970/article/top_cac_dong_san_pham_cong_nghe_duoc_yeu_thich_nhat_nam_2024_a07336d9697e45efaa4e2114d7e54830_grande.png",
    },
    {
      id: 10,
      title: "Cảm hứng đằng sau thiết kế của Nuphy Kick75: Từ Air Force 1",
      author: "Xuân Trang",
      date: "21.03.2005",
      image:
        "https://file.hstatic.net/1000069970/article/top_cac_dong_san_pham_cong_nghe_duoc_yeu_thich_nhat_nam_2024__4__662cf76dc75c478c8851ca52d364751b_grande.png",
    },
    {
      id: 11,
      title: "Cảm hứng đằng sau thiết kế của Nuphy Kick75: Từ Air Force 1",
      author: "Xuân Trang",
      date: "21.03.2005",
      image:
        "https://file.hstatic.net/1000069970/article/top_cac_dong_san_pham_cong_nghe_duoc_yeu_thich_nhat_nam_2024__3__67b18a902a2d4c7993915bf271839a15_grande.png",
    },
    {
      id: 12,
      title: "Cảm hứng đằng sau thiết kế của Nuphy Kick75: Từ Air Force 1",
      author: "Xuân Trang",
      date: "21.03.2005",
      image:
        "https://file.hstatic.net/1000069970/article/top_cac_dong_san_pham_cong_nghe_duoc_yeu_thich_nhat_nam_2024__2__2a9576e644e3411abfbf69df70aab859_grande.png",
    },
  ];

  const setupDecorIn4 = [
    {
      id: 1,
      title: "5 mẫu đồng hồ để bàn sáng tạo giúp tăng cảm hứng làm việc",
      author: "Đặng Nguyễn Hiệp",
      date: "27.05.2024",
      image:
        "https://file.hstatic.net/1000069970/article/pre-order-la-gi-moi-dieu-can-biet-ve-pre-order_b22ae22812ed4333bb07146c5f156217_grande.jpg",
      classParticular: styles.bigLeft,
    },
    {
      id: 2,
      title: "5 mẫu đồng hồ để bàn sáng tạo giúp tăng cảm hứng làm việc",
      author: "Đặng Nguyễn Hiệp",
      date: "27.05.2024",
      image:
        "https://file.hstatic.net/1000069970/article/bi-kip-live-stream-ban-hang_4fa4513f3d96436f859a495e2bc312cb_grande.png",
      classParticular: styles.bigRightUp,
    },
    {
      id: 3,
      title: "5 mẫu đồng hồ để bàn sáng tạo giúp tăng cảm hứng làm việc",
      author: "Đặng Nguyễn Hiệp",
      date: "27.05.2024",
      image:
        "https://file.hstatic.net/1000069970/article/5-mau-dong-ho-de-ban-giup-tang-cam-hung-sang-tao_f0c31564117b4b86832a68ec65f31a09_grande.jpg",
      classParticular: styles.smallLeftDown,
    },
    {
      id: 4,
      title: "5 mẫu đồng hồ để bàn sáng tạo giúp tăng cảm hứng làm việc",
      author: "Đặng Nguyễn Hiệp",
      date: "27.05.2024",
      image:
        "https://file.hstatic.net/1000069970/article/tong-hop-nhung-bo-ban-phim-chuot-phai-chang-danh-cho-design_69d2459670874f238d1c555f8310024f_grande.jpg",
      classParticular: styles.smallRightDown,
    },
    {
      id: 5,
      title: "5 mẫu đồng hồ để bàn sáng tạo giúp tăng cảm hứng làm việc",
      author: "Đặng Nguyễn Hiệp",
      date: "27.05.2024",
      image:
        "https://file.hstatic.net/1000069970/article/cach-setup-phong-livestream-de-ban-hang-livestream-game_76062ecd6bab486c90d8b12d684be96d_grande.jpg",
    },
    {
      id: 6,
      title: "5 mẫu đồng hồ để bàn sáng tạo giúp tăng cảm hứng làm việc",
      author: "Đặng Nguyễn Hiệp",
      date: "27.05.2024",
      image:
        "https://file.hstatic.net/1000069970/article/top-10-mon-do-cong-nghe-thong-minh-tao-cam-hug-lam-viec-cho-designer_f4cd3ca816b545bb81e49ae26f030f0c_grande.jpg",
    },
    {
      id: 7,
      title: "5 mẫu đồng hồ để bàn sáng tạo giúp tăng cảm hứng làm việc",
      author: "Đặng Nguyễn Hiệp",
      date: "27.05.2024",
      image:
        "https://file.hstatic.net/1000069970/article/15-y-tuong-trang-tri-goc-hoc-tap-dep-don-gian_fa01c78c96e04a4c9b33c710b3165d7e_grande.jpg",
    },
    {
      id: 8,
      title: "5 mẫu đồng hồ để bàn sáng tạo giúp tăng cảm hứng làm việc",
      author: "Đặng Nguyễn Hiệp",
      date: "27.05.2024",
      image:
        "https://file.hstatic.net/1000069970/article/dau-co-tay-nhung-khong-sung-la-bi-gi-nguyen-nhan-cach-khac-phuc_5e4d1eec513b4b778b4d3112c7f98b40_grande.jpg",
    },
    {
      id: 9,
      title: "5 mẫu đồng hồ để bàn sáng tạo giúp tăng cảm hứng làm việc",
      author: "Đặng Nguyễn Hiệp",
      date: "27.05.2024",
      image:
        "https://file.hstatic.net/1000069970/article/15-y-tuong-trang-tri-goc-hoc-tap-dep-don-gian_fa01c78c96e04a4c9b33c710b3165d7e_grande.jpg",
    },
    {
      id: 10,
      title: "5 mẫu đồng hồ để bàn sáng tạo giúp tăng cảm hứng làm việc",
      author: "Đặng Nguyễn Hiệp",
      date: "27.05.2024",
      image:
        "https://file.hstatic.net/1000069970/article/10-do-trang-tri-ban-lam-viec-dep-doc-dao_1d34a2b2d6344164ab295eeba022967e_grande.jpg",
    },
    {
      id: 11,
      title: "5 mẫu đồng hồ để bàn sáng tạo giúp tăng cảm hứng làm việc",
      author: "Đặng Nguyễn Hiệp",
      date: "27.05.2024",
      image:
        "https://file.hstatic.net/1000069970/article/decor-la-gi-nhung-nguyen-tac-co-ban-trong-decor_83993cc441444c6b866f4d3b018b29ed_grande.jpg",
    },
    {
      id: 12,
      title: "5 mẫu đồng hồ để bàn sáng tạo giúp tăng cảm hứng làm việc",
      author: "Đặng Nguyễn Hiệp",
      date: "27.05.2024",
      image:
        "https://file.hstatic.net/1000069970/article/trang-tri-ban-hoc_708f15bd2fa540eea5df284dd1de7dad_grande.png",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles["header-section"]}>
        <div className={styles.title}>{title}</div>
        <div className={styles.banner}>
          {(type === "technology" ? technologyIn4 : setupDecorIn4)
            .filter((card) => card.classParticular)
            .map((card) => (
              <div
                key={card.id}
                className={`${styles.item} ${card.classParticular}`}
              >
                <img src={card.image} alt="" />
                <div className={styles.overlay}>
                  <p>{card.title}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className={styles["footer-section"]}>
        <ArticleList
          articles={type === "technology" ? technologyIn4 : setupDecorIn4}
        />
        <Pagination />
      </div>
    </div>
  );
}

Blogs.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf(["setup-decor", "technology"]),
};

export default Blogs;
