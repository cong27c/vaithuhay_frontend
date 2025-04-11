import Accordion from "~/components/Accordion/Accordion";
import styles from "./Navigation.module.scss";
import AccordionItem from "~/components/Accordion/AccordionItem";

function Navigation() {
  return (
    <>
      <nav className={styles.wrapper}>
        <Accordion defaultIndex={-1} collapseOthers={false} trigger="hover">
          <AccordionItem header="Trang chủ" />
          <AccordionItem header="Khám phá" />
          <AccordionItem header="Tìm hiểu thêm">
            <ul className={styles.dropdown}>
              <li>Về VaiThuHay</li>
              <li>Bán hàng liên kết (Affiliate)</li>
              <li>Tìm đồng đội - Tuyển dụng</li>
              <li>Showcase</li>
              <li>Quà tặng hay</li>
              <li>Cộng đồng Hayer</li>
              <li>Các chính sách quan trọng</li>
            </ul>
          </AccordionItem>
          <AccordionItem header="Bài viết">
            <ul className={styles.dropdown}>
              <li>SetUp Decor</li>
              <li>Công nghệ</li>
            </ul>
          </AccordionItem>
        </Accordion>
      </nav>
    </>
  );
}
export default Navigation;
