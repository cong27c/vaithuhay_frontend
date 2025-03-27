import Button from "~/components/Button";
import styles from "./BrandList.module.scss";
import images from "~/assets/images";

function BrandList() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>THƯƠNG HIỆU HAY TẠI VAITHUHAY</h2>
      <div className={styles.listBrand}>
        <div className={styles.brand}>
          <div className={styles.image}>
            <img src={images.course5} alt="" />
            <div className={styles.name}>Thương hiệu Gravastar</div>
          </div>
          <div className={styles.content}>
            <div className={styles.field}>
              <strong>Lĩnh vực:</strong> Công nghê mới
            </div>
            <div className={styles.born}>
              <strong>Ra đời:</strong> Tháng 10.2021
            </div>
            <div className={styles.story}>
              <strong>Câu chuyện thương hiệu</strong> Gravastar thương hiệu mang
              đến trải nghiệm nghe nhìn ấn tượng qua từng sản phẩm. Không đơn
              thuần là các thiết bị công nghệ mà còn là một tác phẩm nghệ thuật
            </div>
          </div>
          <div className={styles.button}>
            <Button className={styles.btn} tabButton>
              Câu chuyện phía sau
            </Button>
          </div>
        </div>
        <div className={styles.brand}>
          <div className={styles.image}>
            <img src={images.course5} alt="" />
            <div className={styles.name}>Thương hiệu Gravastar</div>
          </div>
          <div className={styles.content}>
            <div className={styles.field}>
              <strong>Lĩnh vực:</strong> Công nghê mới
            </div>
            <div className={styles.born}>
              <strong>Ra đời:</strong> Tháng 10.2021
            </div>
            <div className={styles.story}>
              <strong>Câu chuyện thương hiệu</strong> Gravastar thương hiệu mang
              đến trải nghiệm nghe nhìn ấn tượng qua từng sản phẩm. Không đơn
              thuần là các thiết bị công nghệ mà còn là một tác phẩm nghệ thuật
            </div>
          </div>
          <div className={styles.button}>
            <Button className={styles.btn} tabButton>
              Câu chuyện phía sau
            </Button>
          </div>
        </div>
        <div className={styles.brand}>
          <div className={styles.image}>
            <img src={images.course5} alt="" />
            <div className={styles.name}>Thương hiệu Gravastar</div>
          </div>
          <div className={styles.content}>
            <div className={styles.field}>
              <strong>Lĩnh vực:</strong> Công nghê mới
            </div>
            <div className={styles.born}>
              <strong>Ra đời:</strong> Tháng 10.2021
            </div>
            <div className={styles.story}>
              <strong>Câu chuyện thương hiệu</strong> Gravastar thương hiệu mang
              đến trải nghiệm nghe nhìn ấn tượng qua từng sản phẩm. Không đơn
              thuần là các thiết bị công nghệ mà còn là một tác phẩm nghệ thuật
            </div>
          </div>
          <div className={styles.button}>
            <Button className={styles.btn} tabButton>
              Câu chuyện phía sau
            </Button>
          </div>
        </div>
        <div className={styles.brand}>
          <div className={styles.image}>
            <img src={images.course5} alt="" />
            <div className={styles.name}>Thương hiệu Gravastar</div>
          </div>
          <div className={styles.content}>
            <div className={styles.field}>
              <strong>Lĩnh vực:</strong> Công nghê mới
            </div>
            <div className={styles.born}>
              <strong>Ra đời:</strong> Tháng 10.2021
            </div>
            <div className={styles.story}>
              <strong>Câu chuyện thương hiệu</strong> Gravastar thương hiệu mang
              đến trải nghiệm nghe nhìn ấn tượng qua từng sản phẩm. Không đơn
              thuần là các thiết bị công nghệ mà còn là một tác phẩm nghệ thuật
            </div>
          </div>
          <div className={styles.button}>
            <Button className={styles.btn} tabButton>
              Câu chuyện phía sau
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandList;
