import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { getAllComboDetail } from "@/Services/stuffService";

const ProductsSetup = ({ children, onComboClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCombos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllComboDetail();
      setProducts(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCombos();
  }, [fetchCombos]);

  const handleContainerClick = (e) => {
    e.stopPropagation();

    if (loading) {
      alert("Đang tải dữ liệu combo...");
      return;
    }

    if (error) {
      alert("Có lỗi khi tải dữ liệu. Vui lòng thử lại.");
      return;
    }

    if (products.length === 0) {
      alert("Hiện không có combo nào khả dụng.");
      return;
    }

    // Gọi callback từ parent để xử lý mở modal combo
    if (onComboClick) {
      onComboClick(products);
    }
  };

  // Render states
  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div>🔄 Đang tải combo...</div>
      </div>
    );
  }

  return (
    <div onClick={handleContainerClick} style={{ cursor: "pointer" }}>
      {children}
    </div>
  );
};

ProductsSetup.propTypes = {
  children: PropTypes.node.isRequired,
  onComboClick: PropTypes.func,
};

ProductsSetup.defaultProps = {
  onComboClick: null,
};

export default ProductsSetup;
