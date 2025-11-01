"use client";

import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import Button from "@/components/Admin/ui/Button";
import Input from "@/components/Admin/ui/Input";
import Modal from "@/components/Admin/ui/Modal";
import Textarea from "@/components/Admin/ui/Textarea";
import Select from "@/components/Admin/ui/Select";
import ImageUploadSection from "./ImageUploadSection";
import styles from "./Products.module.scss";
import { useState } from "react";

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
      name: "",
      slug: "",
      description: "",
      price: "",
      stock: "",
      weight: "",
      release_date: "",
      status: "coming_soon",
      brand_id: "",
      discount: "",
      main_image: "",
      sub_images: [],
    },
  });

  const watchedValues = watch();

  // Set giá trị form khi editing
  useState(() => {
    if (editingProduct) {
      reset({
        name: editingProduct.name || "",
        slug: editingProduct.slug || "",
        description: editingProduct.description || "",
        price: editingProduct.price?.toString() || "",
        stock: editingProduct.stock?.toString() || "",
        weight: editingProduct.weight?.toString() || "",
        release_date: editingProduct.release_date || "",
        status: editingProduct.status || "coming_soon",
        brand_id: editingProduct.brand_id?.toString() || "",
        discount: editingProduct.discount?.toString() || "",
        main_image: editingProduct.main_image || "",
        sub_images: editingProduct.sub_images || [],
      });
    }
  }, [editingProduct, reset]);

  const statusOptions = [
    { value: "coming_soon", label: "coming_soon" },
    { value: "pre_order", label: "pre_order" },
    { value: "available", label: "available" },
  ];

  const handleFormSubmit = (data) => {
    // Kết hợp với URLs tạm thời nếu có
    const formData = {
      ...data,
      main_image: tempImageUrls.main || data.main_image,
      sub_images:
        tempImageUrls.sub.length > 0 ? tempImageUrls.sub : data.sub_images,
    };
    onSubmit(formData);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={editingProduct ? "Chỉnh sửa Sản phẩm" : "Thêm Sản phẩm Mới"}
      size="lg"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
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
              message: "Slug chỉ có thể chứa chữ thường, số và dấu gạch ngang",
            },
          })}
          error={errors.slug?.message}
        />

        <Textarea
          label="Mô tả"
          placeholder="Nhập mô tả sản phẩm"
          register={register("description")}
          rows={3}
        />

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
            label="Giảm giá (%)"
            type="number"
            placeholder="0"
            min="0"
            max="100"
            step="1"
            register={register("discount", {
              min: { value: 0, message: "Giảm giá không thể âm" },
              max: {
                value: 100,
                message: "Giảm giá không thể vượt quá 100%",
              },
            })}
            error={errors.discount?.message}
          />
        </div>

        <div className={styles.formRow}>
          <Input
            label="Tồn kho"
            type="number"
            placeholder="0"
            register={register("stock", {
              min: { value: 0, message: "Tồn kho không thể âm" },
            })}
            error={errors.stock?.message}
          />
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

        {/* <Input
          label="ID Thương hiệu"
          type="number"
          placeholder="1"
          register={register("brand_id", {
            min: { value: 1, message: "ID Thương hiệu phải là số dương" },
          })}
          error={errors.brand_id?.message}
        /> */}

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
