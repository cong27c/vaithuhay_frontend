"use client";

import { Edit2, Trash2, Layers } from "lucide-react";
import Button from "@/components/Admin/ui/Button";
import styles from "./Products.module.scss";

const ProductTableRow = ({
  product,
  onEdit,
  onDelete,
  onOpenVariantModal,
  formatVND,
  calculateProductFinalPrice,
}) => {
  return (
    <tr>
      <td>
        <div className={styles.productInfo}>
          {product.main_image && (
            <img
              src={product.main_image}
              alt={product.name}
              className={styles.productImage}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
          <span>{product.name}</span>
        </div>
      </td>
      <td>{product.slug}</td>
      <td>{formatVND(product.price)}</td>
      <td>
        <div className={styles.priceInfo}>
          <span className={styles.finalPrice}>
            {formatVND(calculateProductFinalPrice(product))}
          </span>
          {product.discount && (
            <span className={styles.discountBadge}>-{product.discount}%</span>
          )}
        </div>
      </td>
      <td>{product.stock}</td>
      <td>
        <span className={`${styles.badge} ${styles[product.status]}`}>
          {product.status === "coming_soon" && "coming_soon"}
          {product.status === "pre_order" && "pre_order"}
          {product.status === "available" && "available"}
        </span>
      </td>
      <td>
        <div className={styles.variantInfo}>
          <span>{product.variants?.length || 0} phiên bản</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenVariantModal(product)}
          >
            <Layers size={14} />
          </Button>
        </div>
      </td>
      <td>
        <div className={styles.actions}>
          <button
            className={styles.actionBtn}
            onClick={() => onEdit(product)}
            title="Sửa"
          >
            <Edit2 size={16} />
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => onDelete(product.id)}
            title="Xóa"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductTableRow;
