"use client";

import { useForm } from "react-hook-form";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import Button from "@/components/Admin/ui/Button";
import Input from "@/components/Admin/ui/Input";
import Modal from "@/components/Admin/ui/Modal";
import Textarea from "@/components/Admin/ui/Textarea";
import Select from "@/components/Admin/ui/Select";
import ImageUploadSection from "./ImageUploadSection";
import styles from "./Products.module.scss";
import { useState, useEffect, useCallback } from "react";

const ProductForm = ({
  editingProduct,
  isOpen,
  onClose,
  onSubmit,
  submitting,
  productImages,
  uploadingImages,
  tempImageFiles,
  tempImageUrls,
  onFileChange,
  onDeleteImage,
  onDeleteAllImages,
  resetForm,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Product fields
      name: "",
      slug: "",
      price: "",
      stock: "",
      weight: "",
      release_date: "",
      status: "coming_soon",
      brand_id: "",
      main_image: "",
      sub_images: [],
      discount_type: "percent",

      // ProductDetail fields
      title: "",
      long_description: "",
      specifications: [],
      highlights: {
        img: "",
        highlights_html: [],
      },
      care_instructions: "",
      origin: "",
      material: "",
    },
  });

  const [specifications, setSpecifications] = useState([]);
  const [highlights, setHighlights] = useState({
    img: "",
    highlights_html: [],
  });
  const [highlightImageFile, setHighlightImageFile] = useState(null);
  const [highlightImagePreview, setHighlightImagePreview] = useState("");

  const watchedValues = watch();

  // 🎯 THÊM: Reset form khi isOpen thay đổi và không có editingProduct
  useEffect(() => {
    if (isOpen && !editingProduct) {
      resetFormState();
    }
  }, [isOpen, editingProduct]);

  // 🎯 THÊM: Hàm reset state của form
  const resetFormState = useCallback(() => {
    setSpecifications([]);
    setHighlights({
      img: "",
      highlights_html: [],
    });
    setHighlightImageFile(null);
    setHighlightImagePreview("");

    // Reset form values
    reset({
      name: "",
      slug: "",
      price: "",
      stock: "",
      weight: "",
      release_date: "",
      status: "coming_soon",
      brand_id: "",
      main_image: "",
      sub_images: [],
      discount_type: "percent",
      title: "",
      long_description: "",
      specifications: [],
      highlights: {
        img: "",
        highlights_html: [],
      },
      care_instructions: "",
      origin: "",
      material: "",
    });
  }, [reset]);

  // Set giá trị form khi editing
  useEffect(() => {
    if (editingProduct && isOpen) {
      const productDetail = editingProduct.detail || {};

      // Parse specifications từ HTML string hoặc JSON
      let parsedSpecifications = [];
      if (productDetail.specifications) {
        if (typeof productDetail.specifications === "string") {
          // Nếu là HTML string, có thể parse hoặc để trống
          parsedSpecifications = [];
        } else {
          parsedSpecifications = productDetail.specifications;
        }
      }

      // Parse highlights
      let parsedHighlights = {
        img: "",
        highlights_html: [],
      };
      if (productDetail.highlights) {
        if (typeof productDetail.highlights === "string") {
          try {
            parsedHighlights = JSON.parse(productDetail.highlights);
          } catch (e) {
            parsedHighlights = {
              img: productDetail.highlights.img || "",
              highlights_html: productDetail.highlights.highlights_html || [],
            };
          }
        } else {
          parsedHighlights = productDetail.highlights;
        }
      }

      setSpecifications(parsedSpecifications);
      setHighlights(parsedHighlights);
      setHighlightImagePreview(parsedHighlights.img || "");

      reset({
        name: editingProduct.name || "",
        slug: editingProduct.slug || "",
        price: editingProduct.price?.toString() || "",
        stock: editingProduct.stock?.toString() || "",
        weight: editingProduct.weight?.toString() || "",
        release_date: editingProduct.release_date || "",
        status: editingProduct.status || "coming_soon",
        brand_id: editingProduct.brand_id?.toString() || "",
        main_image: editingProduct.main_image || "",
        sub_images: editingProduct.sub_images || [],
        discount_type: "percent",

        // ProductDetail fields
        title: productDetail.title || "",
        long_description: productDetail.long_description || "",
        specifications: parsedSpecifications,
        highlights: parsedHighlights,
        care_instructions: productDetail.care_instructions || "",
        origin: productDetail.origin || "",
        material: productDetail.material || "",
      });
    }
  }, [editingProduct, reset, isOpen]);

  const statusOptions = [
    { value: "coming_soon", label: "coming_soon" },
    { value: "pre_order", label: "pre_order" },
    { value: "available", label: "available" },
  ];

  // Specifications handlers
  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const updateSpecification = (index, field, value) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
    setValue("specifications", updated);
  };

  const removeSpecification = (index) => {
    const updated = specifications.filter((_, i) => i !== index);
    setSpecifications(updated);
    setValue("specifications", updated);
  };

  // Highlights handlers
  const addHighlight = () => {
    const updatedHighlights = {
      ...highlights,
      highlights_html: [
        ...highlights.highlights_html,
        { feature: "", description: "" },
      ],
    };
    setHighlights(updatedHighlights);
    setValue("highlights", updatedHighlights);
  };

  const updateHighlight = (index, field, value) => {
    const updatedHighlights = {
      ...highlights,
      highlights_html: highlights.highlights_html?.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    };
    setHighlights(updatedHighlights);
    setValue("highlights", updatedHighlights);
  };

  const removeHighlight = (index) => {
    const updatedHighlights = {
      ...highlights,
      highlights_html: highlights.highlights_html.filter((_, i) => i !== index),
    };
    setHighlights(updatedHighlights);
    setValue("highlights", updatedHighlights);
  };

  // Highlight image upload handler
  const handleHighlightImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHighlightImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setHighlightImagePreview(previewUrl);

      // Lưu file để xử lý khi submit
      const updatedHighlights = {
        ...highlights,
        img: previewUrl, // Tạm thời dùng preview URL, backend sẽ xử lý upload
      };
      setHighlights(updatedHighlights);
      setValue("highlights", updatedHighlights);
    }
  };

  const removeHighlightImage = () => {
    setHighlightImageFile(null);
    setHighlightImagePreview("");
    const updatedHighlights = {
      ...highlights,
      img: "",
    };
    setHighlights(updatedHighlights);
    setValue("highlights", updatedHighlights);
  };

  const handleFormSubmit = (data) => {
    // Format specifications thành HTML table
    const formattedSpecifications =
      specifications.length > 0
        ? `<tbody>${specifications
            ?.map(
              (spec) =>
                `<tr><td><strong>${spec.key}&nbsp;&nbsp; &nbsp;</strong></td><td>${spec.value}</td></tr>`,
            )
            .join("")}</tbody>`
        : "";

    // Format highlights đúng structure
    const formattedHighlights = {
      img: highlights.img,
      highlights_html: highlights.highlights_html.filter(
        (item) => item.feature && item.description,
      ),
    };

    const formData = {
      // Product basic data
      name: data.name,
      slug: data.slug,
      price: data.price,
      stock: data.stock,
      weight: data.weight,
      release_date: data.release_date,
      status: data.status,
      brand_id: data.brand_id,

      // ProductDetail data - ĐÚNG STRUCTURE
      title: data.title,
      long_description: data.long_description,
      specifications: formattedSpecifications,
      highlights: formattedHighlights,
      care_instructions: data.care_instructions,
      origin: data.origin,
      material: data.material,

      // File uploads
      highlight_image_file: highlightImageFile,
    };

    console.log("Submitting form data:", formData); // Debug
    onSubmit(formData);
  };

  // 🎯 SỬA: Xử lý đóng modal
  const handleClose = () => {
    // Reset form state trước khi đóng
    resetFormState();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={editingProduct ? "Chỉnh sửa Sản phẩm" : "Thêm Sản phẩm Mới"}
      size="lg"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        {/* Product Basic Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Thông tin cơ bản</h3>

          <Input
            label="Tên sản phẩm"
            placeholder="Nhập tên sản phẩm"
            register={register("name", {
              required: "Tên sản phẩm là bắt buộc",
            })}
            error={errors.name?.message}
            required
          />

          <Input
            label="Slug"
            placeholder="san-pham-slug"
            register={register("slug", {
              pattern: {
                value: /^[a-z0-9-]+$/,
                message:
                  "Slug chỉ có thể chứa chữ thường, số và dấu gạch ngang",
              },
            })}
            error={errors.slug?.message}
          />

          <Textarea
            label="Mô tả chi tiết"
            placeholder="Nhập mô tả chi tiết về sản phẩm..."
            register={register("long_description")}
            rows={5}
          />

          <Input
            label="Tiêu đề chi tiết"
            placeholder="Nhập tiêu đề cho phần chi tiết sản phẩm"
            register={register("title")}
          />
        </div>

        {/* Images Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Hình ảnh sản phẩm</h3>
          <ImageUploadSection
            editingProduct={editingProduct}
            productImages={productImages}
            watchedValues={watchedValues}
            uploadingImages={uploadingImages}
            tempImageFiles={tempImageFiles}
            tempImageUrls={tempImageUrls}
            onFileChange={onFileChange}
            onDeleteImage={onDeleteImage}
            onDeleteAllImages={onDeleteAllImages}
            setValue={setValue}
          />
        </div>

        {/* Specifications Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Thông số kỹ thuật</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSpecification}
            >
              <Plus size={16} />
              Thêm thông số
            </Button>
          </div>

          {specifications.length === 0 ? (
            <div className={styles.emptyState}>
              Chưa có thông số kỹ thuật nào
            </div>
          ) : (
            <div className={styles.specificationsList}>
              {specifications?.map((spec, index) => (
                <div key={index} className={styles.specificationItem}>
                  <div className={styles.specificationInputs}>
                    <Input
                      placeholder="Tên thông số (VD: Tải trọng)"
                      value={spec.key}
                      onChange={(e) =>
                        updateSpecification(index, "key", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Giá trị (VD: 140kg)"
                      value={spec.value}
                      onChange={(e) =>
                        updateSpecification(index, "value", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => removeSpecification(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Highlights Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Điểm nổi bật</h3>
          </div>

          {/* Highlight Image Upload */}
          <div className={styles.imageUploadSection}>
            <label className={styles.uploadLabel}>Hình ảnh highlight</label>
            <div className={styles.uploadArea}>
              {highlightImagePreview ? (
                <div className={styles.imagePreview}>
                  <img src={highlightImagePreview} alt="Highlight preview" />
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={removeHighlightImage}
                    className={styles.removeImageBtn}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ) : (
                <label className={styles.uploadPlaceholder}>
                  <Upload size={24} />
                  <span>Tải lên hình ảnh highlight</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleHighlightImageUpload}
                    className={styles.fileInput}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Features and Descriptions */}
          <div className={styles.sectionHeader}>
            <h4 className={styles.subSectionTitle}>Tính năng nổi bật</h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addHighlight}
            >
              <Plus size={16} />
              Thêm tính năng
            </Button>
          </div>

          {highlights.highlights_html.length === 0 ? (
            <div className={styles.emptyState}>
              Chưa có tính năng nổi bật nào
            </div>
          ) : (
            <div className={styles.highlightsList}>
              {highlights.highlights_html?.map((highlight, index) => (
                <div key={index} className={styles.highlightItem}>
                  <div className={styles.highlightInputs}>
                    <Input
                      placeholder="Tính năng (VD: 1 chạm điều khiển)"
                      value={highlight.feature}
                      onChange={(e) =>
                        updateHighlight(index, "feature", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Mô tả (VD: Nâng hạ chiều cao tự động chỉ với)"
                      value={highlight.description}
                      onChange={(e) =>
                        updateHighlight(index, "description", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => removeHighlight(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Inventory */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Giá & Tồn kho</h3>

          <div className={styles.formRow}>
            <Input
              label="Giá (VND)"
              type="number"
              placeholder="0"
              step="1000"
              register={register("price", {
                required: "Giá là bắt buộc",
                min: { value: 0, message: "Giá phải là số dương" },
              })}
              error={errors.price?.message}
              required
            />
            <Input
              label="Tồn kho"
              type="number"
              placeholder="0"
              register={register("stock", {
                min: { value: 0, message: "Tồn kho không thể âm" },
              })}
              error={errors.stock?.message}
            />
          </div>

          <Input
            label="Khối lượng (gam)"
            type="number"
            placeholder="0"
            register={register("weight", {
              min: { value: 0, message: "Khối lượng không thể âm" },
            })}
            error={errors.weight?.message}
          />
        </div>

        {/* Additional Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Thông tin bổ sung</h3>

          <div className={styles.formRow}>
            <Input
              label="Xuất xứ"
              placeholder="9Space"
              register={register("origin")}
            />
            <Input
              label="Chất liệu"
              placeholder="Gỗ công nghiệp cao cấp"
              register={register("material")}
            />
          </div>

          <Textarea
            label="Hướng dẫn bảo quản"
            placeholder="Nhập hướng dẫn bảo quản sản phẩm..."
            register={register("care_instructions")}
            rows={3}
          />
        </div>

        {/* Status & Release */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Trạng thái & Ngày ra mắt</h3>

          <div className={styles.formRow}>
            <Input
              label="Ngày ra mắt"
              type="date"
              register={register("release_date")}
            />
            <Select
              label="Trạng thái"
              options={statusOptions}
              register={register("status")}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={submitting}
          >
            Hủy
          </Button>
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 size={16} className={styles.spinner} />
                {editingProduct ? "Đang cập nhật..." : "Đang tạo..."}
              </>
            ) : editingProduct ? (
              "Cập nhật Sản phẩm"
            ) : (
              "Thêm Sản phẩm"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductForm;
