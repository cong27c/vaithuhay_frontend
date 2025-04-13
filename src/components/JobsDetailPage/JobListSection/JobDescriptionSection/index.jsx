import Button from "~/components/Button";
import styles from "./JobDescriptionSection.module.scss";
import PropTypes from "prop-types";

function JobDescriptionSection({ requests = [], btnDownLoad = false }) {
  const boxItemImage = [
    {
      image:
        "https://w.ladicdn.com/s650x550/5c0b681b8b014a0649e90d0a/khung-01-20220803044120.png",
    },
    {
      image:
        "https://w.ladicdn.com/s650x550/5c0b681b8b014a0649e90d0a/khung-02-20220803044214.png",
    },
    {
      image:
        "https://w.ladicdn.com/s650x550/5c0b681b8b014a0649e90d0a/khung-03-20220803044357.png",
    },
    {
      image:
        "https://w.ladicdn.com/s650x550/5c0b681b8b014a0649e90d0a/khung-04-20220803044533.png",
    },
    {
      image:
        "https://w.ladicdn.com/s650x550/5c0b681b8b014a0649e90d0a/khung-05-20220803044442.png",
    },
    {
      image:
        "https://w.ladicdn.com/s650x550/5c0b681b8b014a0649e90d0a/khung-06-20220803044655.png",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.mainTitle}>
          <img
            src="https://w.ladicdn.com/s800x400/5c0b681b8b014a0649e90d0a/mo-ta-cong-viec-20220803043924.png"
            alt=""
          />
        </div>
        <p className={styles.desc}>
          <img
            src="https://w.ladicdn.com/s1100x400/5c0b681b8b014a0649e90d0a/chia-tay-som-boet-dau-kho-20220803051522.png"
            alt=""
          />
        </p>
      </div>
      <div className={styles.middleList}>
        {boxItemImage.map((item, index) => (
          <div key={index} className={styles.boxItem}>
            <img src={item.image} alt="" />
          </div>
        ))}
      </div>
      {btnDownLoad && (
        <Button tabButton className={styles.btn}>
          Tải file
        </Button>
      )}
      {requests && (
        <div className={styles.require}>
          {requests.map((item, index) => (
            <div key={index}>
              <div className={styles.subTitle}>{item.title}</div>
              {item.listDesc.map((desc, i) => (
                <p
                  key={i}
                  className={styles.desc}
                  dangerouslySetInnerHTML={{ __html: desc }}
                ></p>
              ))}
            </div>
          ))}
        </div>
      )}
      <Button tabButton className={styles.btn}>
        NHÀO VÔ KIẾM CƠM NGAY !
      </Button>
    </div>
  );
}
JobDescriptionSection.propTypes = {
  requests: PropTypes.bool,
  btnDownLoad: PropTypes.bool,
  title: PropTypes.array,
};

export default JobDescriptionSection;
