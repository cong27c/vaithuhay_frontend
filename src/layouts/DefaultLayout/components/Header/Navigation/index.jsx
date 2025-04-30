import Accordion from "~/components/Accordion/Accordion";
import styles from "./Navigation.module.scss";
import AccordionItem from "~/components/Accordion/AccordionItem";
import MegaMenu from "../MegaMenu";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ArticleList from "~/components/ArticleList";
import { Link } from "react-router-dom";
import config from "~/config";

function Navigation() {
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
              <a href="/seeMore/introduce">
                <li>Về VaiThuHay</li>
              </a>
              <a href="/seeMore/affiliate">
                <li>Bán hàng liên kết (Affiliate)</li>
              </a>
              <a href="/recruitment">
                <li>Tìm đồng đội - Tuyển dụng</li>
              </a>
              <a href="/seeMore/Showcase">
                <li>Showcase</li>
              </a>
              <a href="https://quatanghay.com/">
                <li>Quà tặng hay</li>
              </a>
              <a href="https://www.facebook.com/groups/gocvaithuhay">
                <li>Cộng đồng Hayer</li>
              </a>
              <a href="/">
                <li>Các chính sách quan trọng</li>
                {/* <Accordion>
                  <AccordionItem header="Các chính sách quan trọng" />
                  <ul>
                    <li>Membership/Loyalty</li>
                    <li>Chính sách đặt hàng trước</li>
                    <li>Membership/Loyalty</li>
                    <li>Chính sách bảo hành/đổi trả</li>
                  </ul>
                </Accordion> */}
              </a>
            </ul>
          </AccordionItem>
          <AccordionItem header="Bài viết">
            <ul className={styles.dropdown}>
              <a href="/blogs/setup-decor">
                <li>SetUp Decor</li>
              </a>
              <a href="/blogs/technology">
                <li>Công nghệ</li>
              </a>
            </ul>
          </AccordionItem>
        </Accordion>
      </nav>
    </>
  );
}
export default Navigation;
