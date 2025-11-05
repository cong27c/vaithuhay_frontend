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
  // 🎯 FIX: Đảm bảo không bị lỗi khi destructuring
  const safeTempImageUrls = tempImageUrls || {};
  const safeTempImageFiles = tempImageFiles || {};
  const safeUploadingImages = uploadingImages || {};
  const safeProductImages = productImages || {};

  // 🎯 FIX: Lấy productId an toàn
  const productId = editingProduct?.id;

  // 🎯 FIX: Lấy thông tin ảnh từ productImages một cách an toàn
  const currentProductImages = productId ? safeProductImages[productId] : null;
  const currentMainImage = currentProductImages?.main;
  const currentSubImages = Array.isArray(currentProductImages?.sub)
    ? currentProductImages.sub
    : [];

  // 🎯 FIX: Đảm bảo các mảng luôn tồn tại
  const mainImageToShow = safeTempImageUrls.main || watchedValues?.main_image;

  const subTempUrls = Array.isArray(safeTempImageUrls.sub)
    ? safeTempImageUrls.sub
    : [];

  const subWatchedImages = Array.isArray(watchedValues?.sub_images)
    ? watchedValues.sub_images
    : [];

  // 🎯 FIX: Tách riêng ảnh temp và ảnh từ database để dễ quản lý
  const subImagesFromDB = subWatchedImages.filter(
    (img) => !subTempUrls.includes(img),
  );

  const subImagesToShow = [...subTempUrls, ...subImagesFromDB].filter(Boolean);

  // 🎯 FIX: Hàm tìm imageId từ URL - QUAN TRỌNG
  const findImageIdByUrl = (imageUrl, imageType) => {
    if (!productId || !currentProductImages) return null;

    if (imageType === "main") {
      // So sánh ảnh chính
      if (currentMainImage?.data?.image_url === imageUrl) {
        return currentMainImage.data.id;
      }
      return null;
    }

    if (imageType === "sub") {
      // Tìm ảnh phụ theo URL
      const foundSubImage = currentSubImages.find(
        (subImg) => subImg?.data?.image_url === imageUrl,
      );
      return foundSubImage?.data?.id || null;
    }

    return null;
  };

  // 🎯 FIX: Kiểm tra xem ảnh có phải là temp hay không - ĐƠN GIẢN HƠN
  const isTempImage = (imageUrl) => {
    return (
      subTempUrls.includes(imageUrl) || safeTempImageUrls.main === imageUrl
    );
  };

  console.log("=== DEBUG IMAGES ===");
  console.log("productId:", productId);
  console.log("currentProductImages:", currentProductImages);
  console.log("mainImageToShow:", mainImageToShow);
  console.log("subImagesToShow:", subImagesToShow);
  console.log("subTempUrls:", subTempUrls);
  console.log("subImagesFromDB:", subImagesFromDB);

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
              onChange={(e) => onFileChange && onFileChange("main", e)}
              className={styles.fileInput}
              disabled={safeUploadingImages.main}
            />
            <label htmlFor="main-image-upload" className={styles.uploadLabel}>
              {safeUploadingImages.main ? (
                <Loader2 size={16} className={styles.spinner} />
              ) : (
                <Upload size={16} />
              )}
              {safeUploadingImages.main ? "Đang upload..." : "Upload ảnh chính"}
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

              {/* 🎯 FIX: Hiển thị nút xóa cho ảnh chính từ database */}
              {productId &&
                currentMainImage &&
                !isTempImage(mainImageToShow) && (
                  <button
                    type="button"
                    onClick={() => {
                      const imageId = findImageIdByUrl(mainImageToShow, "main");
                      console.log("Deleting main image:", {
                        imageId,
                        mainImageToShow,
                      });
                      if (onDeleteImage && imageId) {
                        onDeleteImage(productId, imageId, "main");
                      }
                    }}
                    className={styles.removeImageBtn}
                    title="Xóa ảnh chính"
                  >
                    <X size={14} />
                  </button>
                )}
            </div>
          )}
        </div>
        {safeTempImageFiles.main && (
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
              onChange={(e) => onFileChange && onFileChange("sub", e)}
              className={styles.fileInput}
              disabled={safeUploadingImages.sub}
            />
            <label htmlFor="sub-image-upload" className={styles.uploadLabel}>
              {safeUploadingImages.sub ? (
                <Loader2 size={16} className={styles.spinner} />
              ) : (
                <Upload size={16} />
              )}
              {safeUploadingImages.sub ? "Đang upload..." : "Upload ảnh phụ"}
            </label>
          </div>

          {/* Hiển thị danh sách ảnh phụ */}
          <div className={styles.subImages}>
            {subImagesToShow.map((image, index) => {
              const isTemp = isTempImage(image);
              const imageId = findImageIdByUrl(image, "sub");

              return (
                <div key={`${image}-${index}`} className={styles.subImageItem}>
                  <img
                    src={image}
                    alt={`Ảnh phụ ${index + 1}`}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />

                  {/* 🎯 FIX: Hiển thị nút xóa cho ảnh phụ từ database */}
                  {!isTemp && productId && imageId && (
                    <button
                      type="button"
                      onClick={() => {
                        console.log("Deleting sub image:", {
                          imageId,
                          image,
                          index,
                        });
                        onDeleteImage(productId, imageId, "sub");
                      }}
                      className={styles.removeImageBtn}
                      title="Xóa ảnh phụ"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {safeTempImageFiles.sub && safeTempImageFiles.sub.length > 0 && (
          <p className={styles.tempFileNote}>
            📝 {safeTempImageFiles.sub.length} ảnh phụ sẽ được upload sau khi
            tạo sản phẩm
          </p>
        )}

        {/* Nút xóa tất cả ảnh (chỉ hiện khi đang edit) */}
        {productId && (mainImageToShow || subImagesToShow.length > 0) && (
          <div className={styles.deleteAllSection}>
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => onDeleteAllImages && onDeleteAllImages(productId)}
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
