import styles from "./ReturnPolicy.module.scss";

function ReturnPolicy() {
  const listImage = [
    {
      image:
        "https://file.hstatic.net/1000069970/file/bao_hanh-01_8b13c004db084f61b83c8e8e55e1ea8e_1024x1024.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/bao_hanh-02_b830790af9b2438ab29f9ea9e4cac02c_1024x1024.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/bao_hanh-04_753dfd5ed12a4dbabb72aa09612fa936_1024x1024.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/bao_hanh-05_0650aa4784ea48e38d48e12a5a7473c4_1024x1024.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/bao_hanh-05_0650aa4784ea48e38d48e12a5a7473c4_1024x1024.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/bao_hanh-08_22c97b6712dc4df0b0f567fa3de4b424_1024x1024.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/bao_hanh-09_ad2d966318b44221a4a01a6fbbac0dde_1024x1024.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/bao_hanh-10_af6a882e47b94635ab76b7535a844ede_1024x1024.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/bao_hanh-10_af6a882e47b94635ab76b7535a844ede_1024x1024.png",
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        Chính sách đổi trả, bảo hành và bồi hoàn sản phẩm
      </div>
      <div className={styles.listImage}>
        {listImage.map((item, index) => (
          <div key={index} className={styles.image}>
            <img src={item.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReturnPolicy;
