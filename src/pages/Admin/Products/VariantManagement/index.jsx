"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Edit2,
  Trash2,
  Image as ImageIcon,
  Loader2,
  Plus,
  X,
} from "lucide-react";
import Modal from "@/components/Admin/ui/Modal";
import Button from "@/components/Admin/ui/Button";
import Input from "@/components/Admin/ui/Input";
import {
  createProductVariant,
  updateProductVariant,
  deleteProductVariant,
  getProductVariant,
  getProductVariantsByProduct,
} from "@/Services/productAdminService";
import styles from "../Products.module.scss";

const VariantManagement = ({ isOpen, onClose, product, onUpdate }) => {
  const [editingVariant, setEditingVariant] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState([]);

  // Mock data attributes từ database
  const availableAttributes = [
    { id: 1, name: "Màu sắc", display_order: 4 },
    { id: 8, name: "Kích thước", display_order: 3 },
    { id: 9, name: "Kiểu dáng", display_order: 0 },
  ].sort((a, b) => a.display_order - b.display_order); // Sắp xếp theo display_order

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      sku: "",
      price: "",
      stock: "",
      image_url: "",
      variant_attributes: [{ attribute_type: "", attribute_value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variant_attributes",
  });

  // Load variants khi modal mở hoặc product thay đổi
  useEffect(() => {
    if (isOpen && product?.id) {
      loadProductVariants();
    }
  }, [isOpen, product?.id]);

  // Reset form khi modal mở/đóng
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    if (editingVariant) {
      populateFormWithVariantData(editingVariant);
    } else {
      reset({
        name: "",
        sku: "",
        price: product?.price?.toString() || "",
        stock: "",
        image_url: "",
        variant_attributes: [{ attribute_type: "", attribute_value: "" }],
      });
    }
  }, [editingVariant, product, reset]);

  // Hàm load variants từ API
  const loadProductVariants = async () => {
    try {
      setLoading(true);
      const response = await getProductVariantsByProduct(product.id, {
        includeAttributes: true,
        includeStock: true,
      });
      console.log("getProductVariantsByProduct", response);
      setVariants(response.data || []);
    } catch (error) {
      console.error("Lỗi khi tải biến thể:", error);
      setVariants([]);
    } finally {
      setLoading(false);
    }
  };

  const populateFormWithVariantData = (variant) => {
    setValue("name", variant.name || "");
    setValue("sku", variant.sku || "");
    setValue("price", variant.price?.toString() || "");
    setValue("stock", variant.stock?.toString() || "");
    setValue("image_url", variant.image_url || "");

    // Xử lý dữ liệu variant attributes từ API
    let variantAttributes = [{ attribute_type: "", attribute_value: "" }];

    console.log("Variant data:", variant);

    if (variant.attribute_values && Array.isArray(variant.attribute_values)) {
      variantAttributes = variant.attribute_values.map((attr) => ({
        attribute_type: attr.attribute_id?.toString() || "", // Sử dụng attribute_id thay vì attribute_type
        attribute_value: attr.value || "", // Sử dụng value thay vì attribute_value
      }));
    }

    // Fallback: sử dụng variant_type và variant_value nếu attribute_values không có
    else if (
      variant.variant_type &&
      variant.variant_value &&
      Array.isArray(variant.variant_type) &&
      Array.isArray(variant.variant_value)
    ) {
      variantAttributes = variant.variant_type.map((type, index) => {
        // Tìm attribute_id từ tên attribute trong availableAttributes
        const attribute = availableAttributes.find(
          (attr) => attr.name === type,
        );
        return {
          attribute_type: attribute?.id?.toString() || "",
          attribute_value: variant.variant_value[index] || "",
        };
      });
    }

    // Đảm bảo luôn có ít nhất 1 bản ghi
    if (variantAttributes.length === 0) {
      variantAttributes = [{ attribute_type: "", attribute_value: "" }];
    }

    console.log("Processed variantAttributes:", variantAttributes);
    setValue("variant_attributes", variantAttributes);
  };

  const resetForm = () => {
    reset({
      name: "",
      sku: "",
      price: product?.price?.toString() || "",
      stock: "",
      image_url: "",
      variant_attributes: [{ attribute_type: "", attribute_value: "" }],
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
      alert(
        error.message || "Có lỗi xảy ra khi lưu biến thể. Vui lòng thử lại.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Chuyển đổi dữ liệu biến thể để gửi API
  const transformVariantForAPI = (formData) => {
    console.log("transformVariantForAPI - formData:", formData);

    // Lọc các cặp attribute có giá trị
    const validAttributes = formData.variant_attributes.filter(
      (attr) => attr.attribute_type && attr.attribute_value,
    );

    // Tạo variant_attributes với ID số
    const variant_attributes = validAttributes.map((attr) => ({
      attribute_type: parseInt(attr.attribute_type), // Chuyển sang number
      attribute_value: attr.attribute_value,
    }));

    return {
      name: formData.name,
      sku: formData.sku,
      price: parseFloat(formData.price) || product.price,
      stock: parseInt(formData.stock) || 0,
      image_url: formData.image_url,
      variant_attributes, // Chỉ gửi variant_attributes
    };
  };

  const handleCreateVariant = async (variantData) => {
    console.log("handleCreateVariant", variantData);
    const response = await createProductVariant(product.id, variantData);

    // Load lại danh sách variants
    await loadProductVariants();

    // Cập nhật parent component
    if (onUpdate) {
      onUpdate();
    }

    resetForm();
    alert("Thêm biến thể thành công!");
  };

  const handleUpdateVariant = async (variantData) => {
    const response = await updateProductVariant(editingVariant.id, variantData);

    // Load lại danh sách variants
    await loadProductVariants();

    // Cập nhật parent component
    if (onUpdate) {
      onUpdate();
    }

    resetForm();
    alert("Cập nhật biến thể thành công!");
  };

  const handleDeleteVariant = async (variantId) => {
    if (!confirm("Bạn có chắc chắn muốn xóa biến thể này?")) {
      return;
    }

    try {
      await deleteProductVariant(variantId);

      // Load lại danh sách variants
      await loadProductVariants();

      // Cập nhật parent component
      if (onUpdate) {
        onUpdate();
      }

      alert("Xóa biến thể thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa biến thể:", error);
      alert(
        error.message || "Có lỗi xảy ra khi xóa biến thể. Vui lòng thử lại.",
      );
    }
  };

  const handleEditVariant = async (variant) => {
    try {
      // Load chi tiết variant để lấy đầy đủ thông tin attributes
      const response = await getProductVariant(variant.id, {
        includeAttributes: true,
      });
      setEditingVariant(response.data);
    } catch (error) {
      console.error("Lỗi khi tải chi tiết biến thể:", error);
      // Fallback: sử dụng variant cơ bản nếu không load được chi tiết
      setEditingVariant(variant);
    }
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  // Thêm bản ghi mới
  const handleAddAttribute = () => {
    append({ attribute_type: "", attribute_value: "" });
  };

  // Xóa bản ghi
  const handleRemoveAttribute = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  // Lấy attributes hiện tại để hiển thị preview
  const getCurrentVariantAttributes = () => {
    const watchedAttributes = watch("variant_attributes") || [];
    return watchedAttributes.filter(
      (attr) => attr.attribute_type && attr.attribute_value,
    );
  };

  // Hàm lấy tên attribute từ ID
  // Hàm lấy tên attribute từ ID
  const getAttributeName = (attributeId) => {
    if (!attributeId) return "Chọn thuộc tính";

    const attribute = availableAttributes.find(
      (attr) => attr.id === parseInt(attributeId),
    );
    return attribute ? attribute.name : `Unknown (${attributeId})`;
  };
  // Hàm hiển thị thuộc tính biến thể
  const renderVariantAttributes = (variant) => {
    console.log("Rendering variant attributes:", variant);

    // Hiển thị từ attribute_values (cấu trúc mới)
    if (variant.attribute_values && Array.isArray(variant.attribute_values)) {
      return (
        <div className={styles.variantAttributes}>
          {variant.attribute_values.map((attr, index) => (
            <div key={index} className={styles.attribute}>
              <span className={styles.attributeKey}>
                {attr.attribute?.name || `Attribute ${attr.attribute_id}`}:
              </span>
              <span className={styles.attributeValue}>{attr.value}</span>
            </div>
          ))}
        </div>
      );
    }

    // Hiển thị từ variant_type và variant_value
    else if (
      variant.variant_type &&
      variant.variant_value &&
      Array.isArray(variant.variant_type) &&
      Array.isArray(variant.variant_value)
    ) {
      return (
        <div className={styles.variantAttributes}>
          {variant.variant_type.map((type, index) => (
            <div key={index} className={styles.attribute}>
              <span className={styles.attributeKey}>{type}:</span>
              <span className={styles.attributeValue}>
                {variant.variant_value[index]}
              </span>
            </div>
          ))}
        </div>
      );
    } else {
      return <div className={styles.noAttributes}>Không có thuộc tính</div>;
    }
  };

  const watchedValues = watch();

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

            {/* Thuộc tính Biến thể - Dạng động */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <h5>Thuộc tính Biến thể</h5>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddAttribute}
                  className={styles.addButton}
                >
                  <Plus size={16} />
                  Thêm thuộc tính
                </Button>
              </div>

              <div className={styles.attributesList}>
                {fields.map((field, index) => (
                  <div key={field.id} className={styles.attributeRow}>
                    <div className={styles.attributeInputs}>
                      <select
                        {...register(
                          `variant_attributes.${index}.attribute_type`,
                          {
                            required: "Loại thuộc tính là bắt buộc",
                          },
                        )}
                        className={`${styles.attributeSelect} ${errors.variant_attributes?.[index]?.attribute_type ? styles.error : ""}`}
                      >
                        <option value="">Chọn thuộc tính</option>
                        {availableAttributes.map((attr) => (
                          <option key={attr.id} value={attr.id}>
                            {attr.name}
                          </option>
                        ))}
                      </select>

                      <Input
                        placeholder="Giá trị (VD: Đỏ, L)"
                        register={register(
                          `variant_attributes.${index}.attribute_value`,
                          {
                            required: "Giá trị thuộc tính là bắt buộc",
                          },
                        )}
                        className={styles.attributeInput}
                        error={
                          errors.variant_attributes?.[index]?.attribute_value
                            ?.message
                        }
                      />
                    </div>
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveAttribute(index)}
                      disabled={fields.length <= 1}
                      className={styles.removeButton}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
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
                        {getAttributeName(attr.attribute_type)}:{" "}
                        {attr.attribute_value}
                      </span>
                    ))}
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
          <h4>Biến thể Hiện có ({variants.length})</h4>
          {loading ? (
            <div className={styles.loading}>
              <Loader2 size={24} className={styles.spinner} />
              <p>Đang tải biến thể...</p>
            </div>
          ) : variants.length > 0 ? (
            <div className={styles.variantsGrid}>
              {variants.map((variant) => (
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

                  {/* Thuộc tính Biến thể */}
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
