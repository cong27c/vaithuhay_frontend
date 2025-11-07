"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import Card from "@/components/Admin/ui/Card";
import ProductTableRow from "./ProductTableRow";
import styles from "./Products.module.scss";

const ProductList = ({
  products,
  loading,
  searchTerm,
  onSearchChange,
  onEditProduct,
  onDeleteProduct,
  onOpenVariantModal,
  formatVND,
  calculateProductFinalPrice,
}) => {
  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Card>
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm theo tên hoặc slug..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingState}>
          <Loader2 size={24} className={styles.spinner} />
          <p>Đang tải sản phẩm...</p>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Slug</th>
              <th>Giá gốc</th>
              <th>Giá bán</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
              <th>Phiên bản</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                onEdit={onEditProduct}
                onDelete={onDeleteProduct}
                onOpenVariantModal={onOpenVariantModal}
                formatVND={formatVND}
                calculateProductFinalPrice={calculateProductFinalPrice}
              />
            ))}
          </tbody>
        </table>
      )}

      {!loading && filteredProducts?.length === 0 && (
        <div className={styles.emptyState}>
          <p>Không tìm thấy sản phẩm nào</p>
        </div>
      )}
    </Card>
  );
};

export default ProductList;
