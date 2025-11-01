"use client";

import { Upload, X, Trash2, Loader2 } from "lucide-react";
import Button from "@/components/Admin/ui/Button";
import styles from "./Products.module.scss";

const ImageUploadSection = ({
  editingProduct,
  productImages,
  watchedValues,
  uploadingImages,
  tempImageFiles,
  tempImageUrls,
  onFileChange,
  onDeleteImage,
  onDeleteAllImages,
  setValue,
}) => {
  // Hiển thị ảnh chính (ưu tiên temp URL, sau đó là watched value)
  const mainImageToShow = tempImageUrls.main || watchedValues.main_image;

  // Hiển thị ảnh phụ (kết hợp temp URLs và watched values)
  const subImagesToShow = [
    ...tempImageUrls.sub,
    ...(watchedValues.sub_images || []).filter(
      (img) => !tempImageUrls.sub.includes(img),
    ),
  ];

  return (
    <>
      {/* Ảnh chính - Upload từ máy tính */}
      <div className={styles.imageSection}>
        <label className={styles.label}>Ảnh chính</label>
        <div className={styles.uploadSection}>
          <div className={styles.uploadButton}>
            <input
              type="file"
              id="main-image-upload"
              accept="image/*"
              onChange={(e) => onFileChange("main", e)}
              className={styles.fileInput}
              disabled={uploadingImages.main}
            />
            <label htmlFor="main-image-upload" className={styles.uploadLabel}>
              {uploadingImages.main ? (
                <Loader2 size={16} className={styles.spinner} />
              ) : (
                <Upload size={16} />
              )}
              {uploadingImages.main ? "Đang upload..." : "Upload ảnh chính"}
            </label>
          </div>

          {/* Hiển thị ảnh chính hiện tại */}
          {mainImageToShow && (
            <div className={styles.imagePreviewWithActions}>
              <img
                src={mainImageToShow}
                alt="Xem trước ảnh chính"
                className={styles.previewImage}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              {editingProduct &&
                productImages[editingProduct.id]?.main &&
                !tempImageUrls.main && (
                  <button
                    type="button"
                    onClick={() =>
                      onDeleteImage(
                        editingProduct.id,
                        productImages[editingProduct.id]?.main?.id,
                        "main",
                      )
                    }
                    className={styles.removeImageBtn}
                    title="Xóa ảnh"
                  >
                    <X size={14} />
                  </button>
                )}
            </div>
          )}
        </div>
        {tempImageFiles.main && (
          <p className={styles.tempFileNote}>
            📝 Ảnh sẽ được upload sau khi tạo sản phẩm
          </p>
        )}
      </div>

      {/* Ảnh phụ - Upload từ máy tính */}
      <div className={styles.imageSection}>
        <label className={styles.label}>Ảnh phụ</label>
        <div className={styles.uploadSection}>
          <div className={styles.uploadButton}>
            <input
              type="file"
              id="sub-image-upload"
              accept="image/*"
              multiple
              onChange={(e) => onFileChange("sub", e)}
              className={styles.fileInput}
              disabled={uploadingImages.sub}
            />
            <label htmlFor="sub-image-upload" className={styles.uploadLabel}>
              {uploadingImages.sub ? (
                <Loader2 size={16} className={styles.spinner} />
              ) : (
                <Upload size={16} />
              )}
              {uploadingImages.sub ? "Đang upload..." : "Upload ảnh phụ"}
            </label>
          </div>

          {/* Hiển thị danh sách ảnh phụ */}
          <div className={styles.subImages}>
            {subImagesToShow.map((image, index) => (
              <div key={index} className={styles.subImageItem}>
                <img
                  src={image}
                  alt={`Ảnh phụ ${index + 1}`}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                {editingProduct &&
                  productImages[editingProduct.id]?.sub?.[index] &&
                  !tempImageUrls.sub.includes(image) && (
                    <button
                      type="button"
                      onClick={() =>
                        onDeleteImage(
                          editingProduct.id,
                          productImages[editingProduct.id]?.sub?.[index]?.id,
                          "sub",
                          index,
                        )
                      }
                      className={styles.removeImageBtn}
                      title="Xóa ảnh"
                    >
                      <X size={12} />
                    </button>
                  )}
              </div>
            ))}
          </div>
        </div>
        {tempImageFiles.sub.length > 0 && (
          <p className={styles.tempFileNote}>
            📝 {tempImageFiles.sub.length} ảnh phụ sẽ được upload sau khi tạo
            sản phẩm
          </p>
        )}

        {/* Nút xóa tất cả ảnh (chỉ hiện khi đang edit) */}
        {editingProduct && (mainImageToShow || subImagesToShow.length > 0) && (
          <div className={styles.deleteAllSection}>
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => onDeleteAllImages(editingProduct.id)}
            >
              <Trash2 size={14} /> Xóa tất cả ảnh
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUploadSection;
