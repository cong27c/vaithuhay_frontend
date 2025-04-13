import styles from "./JobBenefitsSection.module.scss";

function JobBenefitsSection() {
  const benefitsIn4 = [
    {
      childTitle:
        "https://w.ladicdn.com/s850x350/5c0b681b8b014a0649e90d0a/gioi-thi-lam-xep-ro-thi-hoc-tiep-02-20220803043324.png",
      desc: "https://w.ladicdn.com/s850x450/5c0b681b8b014a0649e90d0a/cho-lam-viec-nhu-ca-phe-01-20220803043343.png",
    },
    {
      childTitle:
        "https://w.ladicdn.com/s850x400/5c0b681b8b014a0649e90d0a/thoai-mai-gio-giacs-01-20220803043410.png",
      desc: "https://w.ladicdn.com/s900x400/5c0b681b8b014a0649e90d0a/thoai-mai-gio-giacs-03-20220803043442.png",
    },
    {
      childTitle:
        "	https://w.ladicdn.com/s850x450/5c0b681b8b014a0649e90d0a/like-01-20220803043553.png",
      desc: "	https://w.ladicdn.com/s850x450/5c0b681b8b014a0649e90d0a/like-01-20220803043553.png",
    },
    {
      childTitle:
        "https://w.ladicdn.com/s850x500/5c0b681b8b014a0649e90d0a/thu-nhap-theo-nang-luc-01-20220803043617.png",
      desc: "	https://w.ladicdn.com/s850x450/5c0b681b8b014a0649e90d0a/like-01-20220803043553.png",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainTitle}>
        <img
          src="https://w.ladicdn.com/s650x400/5c0b681b8b014a0649e90d0a/quyen-loi-20220803043248.png"
          alt=""
        />
      </div>
      <div className={styles.listItem}>
        {benefitsIn4.map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.childTitle}>
              <img src={item.childTitle} alt="" />
            </div>
            {item.desc && (
              <div className={styles.desc}>
                <img src={item.desc} alt="" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobBenefitsSection;
