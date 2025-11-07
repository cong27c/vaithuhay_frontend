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
  onDeleteTempImage,
  onDeleteAllImages,
  resetForm,
  loadingProductDetail,
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

  // 🎯 CẬP NHẬT: Reset form khi isOpen thay đổi
  useEffect(() => {
    if (isOpen && !editingProduct) {
      resetFormState();
    }
  }, [isOpen, editingProduct]);

  // 🎯 Hàm reset state của form
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

  // 🎯 Set giá trị form khi editing
  useEffect(() => {
    if (editingProduct && isOpen) {
      const productDetail = editingProduct.detail || {};

      // Parse specifications từ HTML string
      let parsedSpecifications = [];
      if (productDetail.specifications) {
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(
            productDetail.specifications,
            "text/html",
          );

          const body = doc.querySelector("body");
          const childNodes = Array.from(body?.childNodes || []);

          for (let i = 0; i < childNodes.length; i++) {
            const node = childNodes[i];

            if (
              node.nodeType === Node.ELEMENT_NODE &&
              node.tagName === "STRONG"
            ) {
              let key = node.textContent?.replace(/&nbsp;/g, " ").trim() || "";

              if (i + 1 < childNodes.length) {
                const nextNode = childNodes[i + 1];
                if (nextNode.nodeType === Node.TEXT_NODE) {
                  let value =
                    nextNode.textContent?.trim().replace(/^"|"$/g, "") || "";

                  if (key && value) {
                    parsedSpecifications.push({ key, value });
                  }
                }
              }
            }
          }

          console.log("Parsed specifications:", parsedSpecifications);
        } catch (e) {
          console.log("Error parsing specifications:", e);
          parsedSpecifications = [];
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
            const parsed = JSON.parse(productDetail.highlights);
            parsedHighlights = {
              img: parsed.img || parsed.image || "",
              highlights_html: parsed.highlights_html || [],
            };
          } catch (e) {
            console.error("Error parsing highlights:", e);
            parsedHighlights = {
              img: "",
              highlights_html: [],
            };
          }
        } else {
          parsedHighlights = productDetail.highlights;
        }
      }

      setSpecifications(parsedSpecifications);
      setHighlights(parsedHighlights);
      setHighlightImagePreview(parsedHighlights.img || "");

      // Reset form với dữ liệu editing
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
    const newSpecifications = [...specifications, { key: "", value: "" }];
    setSpecifications(newSpecifications);
    setValue("specifications", newSpecifications);
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
      if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file hình ảnh");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước file không được vượt quá 5MB");
        return;
      }

      setHighlightImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setHighlightImagePreview(previewUrl);

      const updatedHighlights = {
        ...highlights,
        img: previewUrl,
      };
      setHighlights(updatedHighlights);
      setValue("highlights", updatedHighlights);
    }
  };

  const removeHighlightImage = () => {
    if (highlightImagePreview && highlightImagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(highlightImagePreview);
    }

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
        ? `<table><tbody>${specifications
            ?.filter((spec) => spec.key && spec.value)
            ?.map(
              (spec) =>
                `<tr><td><strong>${spec.key.replace(/</g, "&lt;").replace(/>/g, "&gt;")}&nbsp;&nbsp;&nbsp;</strong></td><td>${spec.value.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}</td></tr>`,
            )
            .join("")}</tbody></table>`
        : "";

    // Format highlights
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

      // ProductDetail data
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

    console.log("Submitting form data:", formData);
    onSubmit(formData);
  };

  const handleClose = () => {
    // Clean up object URLs
    if (highlightImagePreview && highlightImagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(highlightImagePreview);
    }

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

        {/* Images Section - SỬ DỤNG HOÀN TOÀN PROPS TỪ PARENT */}
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
            onDeleteTempImage={onDeleteTempImage}
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
              {specifications.map((spec, index) => (
                <div key={index} className={styles.specificationItem}>
                  <div className={styles.specificationInputs}>
                    <Input
                      placeholder="Tên thông số (VD: Tải trọng)"
                      value={spec.key}
                      onChange={(e) =>
                        updateSpecification(index, "key", e.target.value)
                      }
                    />
                    <Textarea
                      placeholder="Giá trị (VD: 140kg)"
                      value={spec.value}
                      onChange={(e) =>
                        updateSpecification(index, "value", e.target.value)
                      }
                      rows={2}
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
                  <img
                    src={highlightImagePreview}
                    alt="Highlight preview"
                    className={styles.previewImage}
                  />
                  <div className={styles.imageOverlay}>
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
                </div>
              ) : (
                <label className={styles.uploadPlaceholder}>
                  <div className={styles.uploadIcon}>
                    <Upload size={24} />
                  </div>
                  <span className={styles.uploadText}>
                    Tải lên hình ảnh highlight
                  </span>
                  <span className={styles.uploadHint}>
                    PNG, JPG, WEBP (Tối đa 5MB)
                  </span>
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
              {highlights.highlights_html.map((highlight, index) => (
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
