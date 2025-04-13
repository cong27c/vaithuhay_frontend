import clsx from "clsx";
import styles from "./CurrentActivitiesSection.module.scss";

function CurrentActivitiesSection() {
  const listItem = [
    {
      image:
        "https://w.ladicdn.com/s500x500/5c0b681b8b014a0649e90d0a/6643087-20230228085628-gkmcb.png",
      subTitle: "PRE-ORDER CAMPAIGN",
      desc1:
        "Tổ chức mở bán các chiến dịch pre-order cho các sản phẩm mới tại Vaithuhay.com",
      skill: "planning, brand/booking, timeline, teamwork, digital. ",
    },
    {
      image:
        "https://w.ladicdn.com/s500x500/5c0b681b8b014a0649e90d0a/5024468-20230228085908-qdjyl.png",
      subTitle: "AFFILIATE/COMMUNITY",
      desc1: `Quản lý cộng đồng khách hàng tiềm năng & fans Vaithuhay, tăng nhận diện, tương tác của khách hàng qua các bài post. Kiểm soát nội dung KOCs, influencer, group, forum, event social…quản lý partner.`,
      desc2: `Quản lý affiliater review sản phẩm của Vaithuhay để tạo doanh thu`,
      skill: " Customer Insight, social active.. ",
    },
    {
      image:
        "https://w.ladicdn.com/s500x500/5c0b681b8b014a0649e90d0a/180758-20230228085732-bt2ew.png",
      subTitle: "BRAND COLLECTION",
      desc1:
        "Vaithuhay đang quản lý hơn 10+ brand mới khác nhau cần quản lý để duy trì doanh thu qua các hoạt động daily như ads, content, forecast mua hàng…..",
      skill: " kỹ lưỡng, digital, planning timeline, content….. ",
    },
    {
      image:
        "	https://w.ladicdn.com/s500x500/5c0b681b8b014a0649e90d0a/2558944-20230228090821-ciar6.png",
      subTitle: "SALE/EVENT",
      desc1:
        "Chạy các chiến dịch giảm giá, sale event, flashsale. sự kiện tại Website nhằm gia tăng doanh thu. Ý tưởng sale, ý tưởng content, ý tưởng các scheme giảm giá, combo quà, minigame, masterfile giảm giá…..",
      skill: " traffic drivent, planning, content, customer insight…",
    },
  ];
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.mainTitle}>
        MỘT SỐ MẢNG HOẠT ĐỘNG ĐANG CHẠY TẠI{" "}
        <span className={styles.highlight}>VAITHUHAY</span>
      </h2>
      <div className={styles.listItem}>
        {listItem.map((item, index) => (
          <div
            key={index}
            className={clsx(styles.item, index % 2 !== 0 ? styles.reverse : "")}
          >
            <div className={styles.image}>
              <img src={item.image} alt="" />
            </div>
            <div className={styles.content}>
              <div className={styles.subTitle}>{item.subTitle}</div>
              <div className={styles.desc}>{item.desc1}</div>
              {item.desc2 && <div className={styles.desc}>{item.desc2}</div>}
              <div className={styles.skill}>
                <strong>Kỹ năng yêu cầu:</strong> {item.skill}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.dots}>
        {Array(15)
          .fill(null)
          .map((_, index) => (
            <div key={index} className={styles.dot}></div>
          ))}
      </div>
    </div>
  );
}

export default CurrentActivitiesSection;
