import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./buttonBars.module.scss";
import { faBars, faL, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CollectionTab from "@/pages/SeeMore/Showcase/CollectionTab";
import Category from "@/pages/Home/components/Category";
import clsx from "clsx";
import { icon } from "@fortawesome/fontawesome-svg-core";

const collectionTab = [
  { Children: "#VàiThứHay" },
  { Children: "#NORESTOCK" },
  { Children: "#ShopeeMall" },
  { Children: "#LazMall" },
  { Children: "#Tiki" },
  { Children: "#Pre-order" },
  { Children: "#SảnPhẩmHOT" },
  { Children: "#SetupDecor" },
  { Children: "#ĐènRGB" },
  { Children: "#LoaLạLạ" },
];
const hotCollectionList = [
  {
    link: "#!",
    icon: "https://theme.hstatic.net/1000069970/1001119059/14/fea_hot_icon_1.png?v=7251",
    name: "TẤT CẢ SẢN PHẨM",
  },
  {
    link: "#!",
    icon: "https://theme.hstatic.net/1000069970/1001119059/14/fea_hot_icon_2.png?v=7251",
    name: "XẢ KHO NÈ",
  },
  {
    link: "#!",
    icon: "https://theme.hstatic.net/1000069970/1001119059/14/fea_hot_icon_3.png?v=7251",
    name: "SHOPEE MALL",
  },
  {
    link: "#!",
    icon: "https://theme.hstatic.net/1000069970/1001119059/14/fea_hot_icon_4.png?v=7251",
    name: "LAZADA MALL",
  },
  {
    link: "#!",
    icon: "https://theme.hstatic.net/1000069970/1001119059/14/fea_hot_icon_5.png?v=7251",
    name: "PRE-ORDER CAMP",
  },
  {
    link: "#!",
    icon: "https://theme.hstatic.net/1000069970/1001119059/14/fea_hot_icon_6.png?v=7251",
    name: "TIKTOK TREND",
  },
  {
    link: "#!",
    icon: "https://theme.hstatic.net/1000069970/1001119059/14/fea_hot_icon_7.png?v=7251",
    name: "SẢN PHẨM HOT",
  },
];

function ButtonBars() {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleModal = () => {
    setOpen(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
    }, 300);
  };
  return (
    <>
      <div className={styles.ButtonBars} onClick={toggleModal}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      {open && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={clsx(
              styles.sidebarModal,
              isClosing ? styles.slideOut : styles.slideIn,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={closeModal}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className={styles.content}>
              <div className={styles.backgroundHeader}></div>
              <div className={styles.collection}>
                <CollectionTab collectionTab={collectionTab} />
              </div>
              <div className={styles.category}>
                <Category
                  haveButton={false}
                  columnGap="20px"
                  rowGap="20px"
                  columns="330px 330px"
                  padding="10px 20px"
                  widthImage="130px"
                  heightImage="130px"
                  haveTitle={false}
                />
              </div>
              <div className={styles.hotCollection}>
                <div className={styles.title}>HOT COLLECTION</div>
                <div className={styles.hotCollGrid}>
                  {hotCollectionList.map((item, index) => (
                    <div className={styles.hotCollItem} key={index}>
                      <span className={styles.icon}>
                        <img src={item.icon} alt="" />
                      </span>
                      <span className={styles.name}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ButtonBars;
