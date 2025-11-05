"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Edit2, Trash2, Image as ImageIcon, Loader2 } from "lucide-react";
import Modal from "@/components/Admin/ui/Modal";
import Button from "@/components/Admin/ui/Button";
import Input from "@/components/Admin/ui/Input";
import {
  createProductVariant,
  updateProductVariant,
  deleteProductVariant,
} from "@/Services/productAdminService";
import styles from "../Products.module.scss";

const VariantManagement = ({ isOpen, onClose, product, onUpdate }) => {
  const [editingVariant, setEditingVariant] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      sku: "",
      price: "",
      stock: "",
      image_url: "",
      variant_type_color: "",
      variant_type_size: "",
      variant_type_material: "",
      variant_value_color: "",
      variant_value_size: "",
      variant_value_material: "",
    },
  });

  // Theo dõi giá trị form để cập nhật real-time
  const watchedValues = watch();

  // Reset form khi modal mở/đóng hoặc khi chỉnh sửa thay đổi
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    if (editingVariant) {
      // Điền dữ liệu biến thể vào form khi chỉnh sửa
      populateFormWithVariantData(editingVariant);
    } else {
      // Reset về giá trị mặc định khi tạo mới
      reset({
        name: "",
        sku: "",
        price: product?.price?.toString() || "",
        stock: "",
        image_url: "",
        variant_type_color: "",
        variant_type_size: "",
        variant_type_material: "",
        variant_value_color: "",
        variant_value_size: "",
        variant_value_material: "",
      });
    }
  }, [editingVariant, product, reset]);

  const populateFormWithVariantData = (variant) => {
    setValue("name", variant.name || "");
    setValue("sku", variant.sku || "");
    setValue("price", variant.price?.toString() || "");
    setValue("stock", variant.stock?.toString() || "");
    setValue("image_url", variant.image_url || "");

    // Reset tất cả các trường variant
    setValue("variant_type_color", "");
    setValue("variant_type_size", "");
    setValue("variant_type_material", "");
    setValue("variant_value_color", "");
    setValue("variant_value_size", "");
    setValue("variant_value_material", "");

    // Ưu tiên variant_attributes nếu có (component structure)
    if (
      variant.variant_attributes &&
      Array.isArray(variant.variant_attributes)
    ) {
      variant.variant_attributes.forEach((attr) => {
        const type = attr.attribute_type?.toLowerCase();
        if (type.includes("color") || type.includes("màu")) {
          setValue("variant_type_color", attr.attribute_type || "");
          setValue("variant_value_color", attr.attribute_value || "");
        } else if (type.includes("size") || type.includes("kích thước")) {
          setValue("variant_type_size", attr.attribute_type || "");
          setValue("variant_value_size", attr.attribute_value || "");
        } else if (type.includes("material") || type.includes("chất liệu")) {
          setValue("variant_type_material", attr.attribute_type || "");
          setValue("variant_value_material", attr.attribute_value || "");
        }
      });
    }
    // Fallback: sử dụng variant_type và variant_value (model structure)
    else if (variant.variant_type && variant.variant_value) {
      Object.entries(variant.variant_type).forEach(([key, typeValue]) => {
        const value = variant.variant_value[key];
        if (key.includes("color") || key.includes("màu")) {
          setValue("variant_type_color", typeValue || "");
          setValue("variant_value_color", value || "");
        } else if (key.includes("size") || key.includes("kích thước")) {
          setValue("variant_type_size", typeValue || "");
          setValue("variant_value_size", value || "");
        } else if (key.includes("material") || key.includes("chất liệu")) {
          setValue("variant_type_material", typeValue || "");
          setValue("variant_value_material", value || "");
        }
      });
    }
  };

  const resetForm = () => {
    reset({
      name: "",
      sku: "",
      price: product?.price?.toString() || "",
      stock: "",
      image_url: "",
      variant_type_color: "",
      variant_type_size: "",
      variant_type_material: "",
      variant_value_color: "",
      variant_value_size: "",
      variant_value_material: "",
    });
    setEditingVariant(null);
    setSubmitting(false);
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      // Chuẩn bị dữ liệu biến thể theo cấu trúc API
      const variantData = transformVariantForAPI(data);

      if (editingVariant) {
        await handleUpdateVariant(variantData);
      } else {
        await handleCreateVariant(variantData);
      }
    } catch (error) {
      console.error("Lỗi khi gửi biến thể:", error);
      alert("Có lỗi xảy ra khi lưu biến thể. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  // Chuyển đổi dữ liệu biến thể để gửi API - ĐÃ ĐỒNG BỘ
  const transformVariantForAPI = (formData) => {
    // Tạo variant_attributes theo cấu trúc component
    const variant_attributes = [
      ...(formData.variant_type_color && formData.variant_value_color
        ? [
            {
              attribute_type: formData.variant_type_color,
              attribute_value: formData.variant_value_color,
            },
          ]
        : []),
      ...(formData.variant_type_size && formData.variant_value_size
        ? [
            {
              attribute_type: formData.variant_type_size,
              attribute_value: formData.variant_value_size,
            },
          ]
        : []),
      ...(formData.variant_type_material && formData.variant_value_material
        ? [
            {
              attribute_type: formData.variant_type_material,
              attribute_value: formData.variant_value_material,
            },
          ]
        : []),
    ];

    // Tạo variant_type và variant_value theo cấu trúc model
    const variant_type = {};
    const variant_value = {};

    variant_attributes.forEach((attr) => {
      const key = attr.attribute_type.toLowerCase().replace(/\s+/g, "_");
      variant_type[key] = attr.attribute_type;
      variant_value[key] = attr.attribute_value;
    });

    return {
      name: formData.name,
      sku: formData.sku,
      price: parseFloat(formData.price) || product.price,
      stock: parseInt(formData.stock) || 0,
      image_url: formData.image_url,
      product_id: product.id,
      // Cả hai định dạng để đảm bảo đồng bộ
      variant_attributes,
      variant_type,
      variant_value,
    };
  };

  const handleCreateVariant = async (variantData) => {
    const newVariant = await createProductVariant(product.id, variantData);

    // Cập nhật sản phẩm với biến thể mới
    const updatedProduct = {
      ...product,
      variants: [...(product.variants || []), newVariant],
    };

    onUpdate(updatedProduct);
    resetForm();
    alert("Thêm biến thể thành công!");
  };

  const handleUpdateVariant = async (variantData) => {
    const updatedVariant = await updateProductVariant(
      editingVariant.id,
      variantData,
    );

    const updatedProduct = {
      ...product,
      variants: product.variants?.map((variant) =>
        variant.id === editingVariant.id
          ? { ...variant, ...updatedVariant }
          : variant,
      ),
    };

    onUpdate(updatedProduct);
    resetForm();
    alert("Cập nhật biến thể thành công!");
  };

  const handleDeleteVariant = async (variantId) => {
    if (!confirm("Bạn có chắc chắn muốn xóa biến thể này?")) {
      return;
    }

    try {
      await deleteProductVariant(variantId);

      const updatedProduct = {
        ...product,
        variants: product.variants.filter(
          (variant) => variant.id !== variantId,
        ),
      };

      onUpdate(updatedProduct);
      alert("Xóa biến thể thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa biến thể:", error);
      alert("Có lỗi xảy ra khi xóa biến thể. Vui lòng thử lại.");
    }
  };

  const handleEditVariant = (variant) => {
    setEditingVariant(variant);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  // Lấy loại và giá trị biến thể hiện tại để hiển thị
  const getCurrentVariantAttributes = () => {
    const attributes = [];

    if (watchedValues.variant_type_color && watchedValues.variant_value_color) {
      attributes.push({
        type: watchedValues.variant_type_color,
        value: watchedValues.variant_value_color,
      });
    }

    if (watchedValues.variant_type_size && watchedValues.variant_value_size) {
      attributes.push({
        type: watchedValues.variant_type_size,
        value: watchedValues.variant_value_size,
      });
    }

    if (
      watchedValues.variant_type_material &&
      watchedValues.variant_value_material
    ) {
      attributes.push({
        type: watchedValues.variant_type_material,
        value: watchedValues.variant_value_material,
      });
    }

    return attributes;
  };

  // Hàm hiển thị thuộc tính biến thể - ĐÃ ĐỒNG BỘ
  const renderVariantAttributes = (variant) => {
    // Ưu tiên hiển thị từ variant_attributes
    if (
      variant.variant_attributes &&
      Array.isArray(variant.variant_attributes) &&
      variant.variant_attributes.length > 0
    ) {
      return (
        <div className={styles.variantAttributes}>
          {variant.variant_attributes.map((attr, index) => (
            <div key={index} className={styles.attribute}>
              <span className={styles.attributeKey}>
                {attr.attribute_type}:
              </span>
              <span className={styles.attributeValue}>
                {attr.attribute_value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    // Fallback: hiển thị từ variant_type và variant_value
    else if (
      variant.variant_type &&
      Object.keys(variant.variant_type).length > 0
    ) {
      return (
        <div className={styles.variantAttributes}>
          {Object.entries(variant.variant_type).map(([key, typeValue]) =>
            typeValue && variant.variant_value?.[key] ? (
              <div key={key} className={styles.attribute}>
                <span className={styles.attributeKey}>{typeValue}:</span>
                <span className={styles.attributeValue}>
                  {variant.variant_value[key]}
                </span>
              </div>
            ) : null,
          )}
        </div>
      );
    } else {
      return <div className={styles.noAttributes}>Không có thuộc tính</div>;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
      title={`Quản lý Biến thể - ${product?.name}`}
      size="xl"
    >
      <div className={styles.variantManagement}>
        {/* Form Biến thể */}
        <div
          className={`${styles.variantForm} ${editingVariant ? styles.editMode : styles.createMode}`}
        >
          <div className={styles.formHeader}>
            <h4>
              {editingVariant ? "Chỉnh sửa Biến thể" : "Thêm Biến thể Mới"}
            </h4>
            {editingVariant && (
              <div className={styles.editBadge}>
                Đang chỉnh sửa: {editingVariant.name}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Thông tin Cơ bản */}
            <div className={styles.formSection}>
              <h5>Thông tin Cơ bản</h5>

              <Input
                label="Tên Biến thể"
                placeholder="VD: Áo thun đỏ size L"
                register={register("name", {
                  required: "Tên biến thể là bắt buộc",
                  minLength: {
                    value: 2,
                    message: "Tên biến thể phải có ít nhất 2 ký tự",
                  },
                })}
                error={errors.name?.message}
              />

              <Input
                label="SKU"
                placeholder="Mã SKU duy nhất"
                register={register("sku", {
                  required: "SKU là bắt buộc",
                  pattern: {
                    value: /^[A-Za-z0-9-_]+$/,
                    message:
                      "SKU chỉ có thể chứa chữ cái, số, dấu gạch ngang và gạch dưới",
                  },
                })}
                error={errors.sku?.message}
              />
            </div>

            {/* Giá & Tồn kho */}
            <div className={styles.formSection}>
              <h5>Giá & Tồn kho</h5>

              <div className={styles.formRow}>
                <Input
                  label="Giá"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  register={register("price", {
                    required: "Giá là bắt buộc",
                    min: {
                      value: 0,
                      message: "Giá phải là số dương",
                    },
                  })}
                  error={errors.price?.message}
                />

                <Input
                  label="Tồn kho"
                  type="number"
                  placeholder="0"
                  register={register("stock", {
                    required: "Tồn kho là bắt buộc",
                    min: {
                      value: 0,
                      message: "Tồn kho không thể âm",
                    },
                  })}
                  error={errors.stock?.message}
                />
              </div>
            </div>

            {/* Thuộc tính Biến thể */}
            <div className={styles.formSection}>
              <h5>Thuộc tính Biến thể</h5>

              <div className={styles.attributeGroup}>
                <label className={styles.attributeLabel}>
                  Biến thể Màu sắc
                </label>
                <div className={styles.formRow}>
                  <Input
                    placeholder="Loại (VD: Màu sắc)"
                    register={register("variant_type_color")}
                  />
                  <Input
                    placeholder="Giá trị (VD: Đen)"
                    register={register("variant_value_color")}
                  />
                </div>
              </div>

              <div className={styles.attributeGroup}>
                <label className={styles.attributeLabel}>
                  Biến thể Kích thước
                </label>
                <div className={styles.formRow}>
                  <Input
                    placeholder="Loại (VD: Kích thước)"
                    register={register("variant_type_size")}
                  />
                  <Input
                    placeholder="Giá trị (VD: Lớn)"
                    register={register("variant_value_size")}
                  />
                </div>
              </div>

              <div className={styles.attributeGroup}>
                <label className={styles.attributeLabel}>
                  Biến thể Chất liệu
                </label>
                <div className={styles.formRow}>
                  <Input
                    placeholder="Loại (VD: Chất liệu)"
                    register={register("variant_type_material")}
                  />
                  <Input
                    placeholder="Giá trị (VD: Cotton)"
                    register={register("variant_value_material")}
                  />
                </div>
              </div>

              {/* Xem trước thuộc tính hiện tại */}
              {getCurrentVariantAttributes().length > 0 && (
                <div className={styles.attributesPreview}>
                  <label className={styles.attributeLabel}>
                    Xem trước Thuộc tính
                  </label>
                  <div className={styles.previewTags}>
                    {getCurrentVariantAttributes().map((attr, index) => (
                      <span key={index} className={styles.previewTag}>
                        {attr.type}: {attr.value}
                      </span>
                    ))}
                  </div>
                  <div className={styles.previewNote}>
                    * Thuộc tính sẽ được lưu theo cả hai định dạng: mảng và JSON
                  </div>
                </div>
              )}
            </div>

            {/* Ảnh Biến thể */}
            <div className={styles.formSection}>
              <h5>Ảnh Biến thể</h5>

              <Input
                label="URL Ảnh"
                placeholder="https://example.com/image.jpg"
                register={register("image_url", {
                  pattern: {
                    value: /^https?:\/\/.+\..+/,
                    message: "Vui lòng nhập URL hợp lệ",
                  },
                })}
                error={errors.image_url?.message}
              />

              {watchedValues.image_url && (
                <div className={styles.imagePreview}>
                  <img
                    src={watchedValues.image_url}
                    alt="Xem trước biến thể"
                    className={styles.previewImage}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Hành động Form */}
            <div className={styles.formActions}>
              {editingVariant && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancelEdit}
                  disabled={submitting}
                >
                  Hủy Chỉnh sửa
                </Button>
              )}
              <Button
                type="submit"
                variant="primary"
                disabled={submitting}
                className={
                  editingVariant ? styles.updateButton : styles.createButton
                }
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className={styles.spinner} />
                    {editingVariant ? "Đang cập nhật..." : "Đang tạo..."}
                  </>
                ) : editingVariant ? (
                  "Cập nhật Biến thể"
                ) : (
                  "Thêm Biến thể"
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Danh sách Biến thể */}
        <div className={styles.variantList}>
          <h4>Biến thể Hiện có ({product?.variants?.length || 0})</h4>
          {product?.variants?.length > 0 ? (
            <div className={styles.variantsGrid}>
              {product.variants.map((variant) => (
                <div
                  key={variant.id}
                  className={`${styles.variantCard} ${editingVariant?.id === variant.id ? styles.editing : ""}`}
                >
                  <div className={styles.variantHeader}>
                    <div className={styles.variantImage}>
                      {variant.image_url ? (
                        <img
                          src={variant.image_url}
                          alt={variant.name}
                          className={styles.variantImg}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : (
                        <div className={styles.noImage}>
                          <ImageIcon size={24} />
                        </div>
                      )}
                      {variant.image_url && (
                        <div
                          className={styles.noImage}
                          style={{ display: "none" }}
                        >
                          <ImageIcon size={24} />
                        </div>
                      )}
                    </div>
                    <div className={styles.variantInfo}>
                      <h5>{variant.name}</h5>
                      <p className={styles.sku}>{variant.sku}</p>
                      <p className={styles.price}>${variant.price}</p>
                      <p className={styles.stock}>Tồn kho: {variant.stock}</p>
                    </div>
                  </div>

                  {/* Thuộc tính Biến thể - ĐÃ ĐỒNG BỘ */}
                  {renderVariantAttributes(variant)}

                  <div className={styles.variantActions}>
                    <button
                      onClick={() => handleEditVariant(variant)}
                      className={styles.actionBtn}
                      title="Chỉnh sửa Biến thể"
                      type="button"
                      disabled={submitting}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteVariant(variant.id)}
                      className={`${styles.actionBtn} ${styles.danger}`}
                      title="Xóa Biến thể"
                      type="button"
                      disabled={submitting || editingVariant?.id === variant.id}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noVariants}>
              <p>
                Chưa có biến thể nào. Thêm biến thể đầu tiên của bạn ở trên.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.modalFooter}>
        <Button
          variant="secondary"
          onClick={() => {
            resetForm();
            onClose();
          }}
          type="button"
          disabled={submitting}
        >
          Đóng
        </Button>
      </div>
    </Modal>
  );
};

export default VariantManagement;
