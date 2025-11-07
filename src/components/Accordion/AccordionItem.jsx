import { Link } from "react-router-dom";

function AccordionItem({ header, children, to, isMegaMenu }) {
  const HeaderTag = to ? Link : "div"; // nếu có to thì dùng Link
  const headerProps = to ? { to } : {}; // truyền prop to cho Link

  return (
    <div className="accordion-item">
      <HeaderTag className="accordion-header" {...headerProps}>
        {header}
      </HeaderTag>

      {/* Nếu có children thì hiển thị phần nội dung mở rộng */}
      {children && <div className="accordion-content">{children}</div>}
    </div>
  );
}

export default AccordionItem;
