import Accordion from "@/components/Accordion/Accordion";
import styles from "./Navigation.module.scss";
import AccordionItem from "@/components/Accordion/AccordionItem";
import MegaMenu from "../MegaMenu";
import { useState } from "react";
import { Link } from "react-router-dom";
import config from "@/config";

function Navigation() {
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <>
      <nav className={styles.wrapper}>
        <Accordion defaultIndex={-1} collapseOthers={false} trigger="hover">
          <AccordionItem header="Trang chủ" />
          <AccordionItem header="Khám phá" isMegaMenu={true}>
            <MegaMenu />
          </AccordionItem>
          <AccordionItem header="Tìm hiểu thêm">
            <ul className={styles.dropdown}>
              <li>
                <a href="/seeMore/introduce">Về VaiThuHay</a>
              </li>
              <li>
                <a href="/seeMore/affiliate">Bán hàng liên kết (Affiliate)</a>
              </li>
              <li>
                <a href="/recruitment">Tìm đồng đội - Tuyển dụng</a>
              </li>
              <li>
                <a href="/seeMore/Showcase">Showcase</a>
              </li>
              <li>
                <a href="https://quatanghay.com/">Quà tặng hay</a>
              </li>
              <li>
                <a href="https://www.facebook.com/groups/gocvaithuhay">
                  Cộng đồng Hayer
                </a>
              </li>

              <li className={styles.hasSubmenu}>
                <span className={styles.toggleTitle}>
                  Các chính sách quan trọng
                </span>
                <ul className={styles.submenu}>
                  <li>
                    <Link to={config.policyRoutes.loyaltyProgram}>
                      Membership/Loyalty
                    </Link>
                  </li>
                  <li>
                    <Link to={config.policyRoutes.preOrderPolicy}>
                      Chính sách đặt hàng trước
                    </Link>
                  </li>
                  <li>
                    <Link to={config.policyRoutes.returnPolicy}>
                      Chính sách bảo hành/đổi trả
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </AccordionItem>
          <AccordionItem header="Bài viết">
            <ul className={styles.dropdown}>
              <li>
                <a href="/blogs/setup-decor">SetUp Decor</a>
              </li>

              <li>
                <a href="/blogs/technology">Công nghệ</a>
              </li>
            </ul>
          </AccordionItem>
        </Accordion>
      </nav>
    </>
  );
}
export default Navigation;
