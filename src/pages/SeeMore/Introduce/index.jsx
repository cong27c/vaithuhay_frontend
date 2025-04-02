import styles from "./Introduce.module.scss";

function Introduce() {
  const listImage = [
    {
      ytbLink: "https://www.youtube.com/embed/DEWWVrMiGUc",
      title: "About Vaithuhay.com",
    },
    {
      ytbLink: "https://www.youtube.com/embed/DEWWVrMiGUc",
      title: "Introducing Vaithuhay platform",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/03_e28882fb61024ccca6fa4689e4a3a5fb.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/04_d548b8f1bb054df9b5b7a279ae428af0.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/05_4270f10f05f543e29b03076380df347f.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/06_6007eb6ca7f2446db00f22c49f672104.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/07_f48b5b35d96c42e2b2e2565ebc4fa23b.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/06_6007eb6ca7f2446db00f22c49f672104.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/08_fae95bd110744800b1f78dfab429697f.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/09_152d171ebdd9494ca7d8a816d1bdeee3.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/10_a52d11bc3fa64760bd394410a8d2b480.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/11_9c702279e41147b3940b36a3f4035970.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/12_92dd3bdbec1d4a1cb9d6f9e4aa41f68d.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/11_9c702279e41147b3940b36a3f4035970.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/14_2adf0225bcfd4641a581fbaaf17db53d.png",
    },
    {
      ytbLink: "https://www.youtube.com/embed/DEWWVrMiGUc",
      title: "Vaithuhay 5 year journey",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/15_e8bed1d18f064b4d99b4ba3e3f1d46d8.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/16_54dc037080b8425a9f1ac6e9832aadd4.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/17_9328c0f749244d698658d78ae3695922.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/18_9ad5ddae97304a05b9f65e05384ea037.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/19_c0946cfc7b6f48c3b17c594d17207aa4.png",
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Giới thiệu về Vaithuhay</div>

      {listImage.map((item, index) =>
        item.image ? (
          <div key={index} className={styles.image}>
            <img src={item.image} alt="" />
          </div>
        ) : (
          <div key={index} className={styles.ytbBox}>
            <iframe
              src={item.ytbLink}
              title={item.title}
              allowfullscreen
            ></iframe>
          </div>
        )
      )}
    </div>
  );
}

export default Introduce;
