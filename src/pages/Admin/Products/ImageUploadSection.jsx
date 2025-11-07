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
  onDeleteTempImage,
  onDeleteAllImages,
  setValue,
}) => {
  // Sử dụng props từ parent với giá trị mặc định an toàn
  console.log("tempImageFiles", tempImageFiles);
  console.log("tempImageUrls", tempImageUrls);
  console.log("productImages", productImages);

  const safeTempImageUrls = tempImageUrls || { main: null, sub: [] };
  const safeTempImageFiles = tempImageFiles || { main: null, sub: [] };
  const safeUploadingImages = uploadingImages || { main: false, sub: false };
  const safeProductImages = productImages || {};

  // Lấy productId
  const productId = editingProduct?.id;

  // Lấy thông tin ảnh từ productImages
  const currentProductImages = productId ? safeProductImages[productId] : null;
  const currentMainImage = currentProductImages?.main?.data;
  const currentSubImages = Array.isArray(currentProductImages?.sub)
    ? currentProductImages.sub.map((img) => img.data)
    : [];

  // Xác định ảnh chính để hiển thị (ưu tiên ảnh tạm)
  const mainImageToShow = safeTempImageUrls.main || currentMainImage?.image_url;

  // Xử lý ảnh phụ
  const subTempUrls = Array.isArray(safeTempImageUrls.sub)
    ? safeTempImageUrls.sub
    : [];

  // Lấy URLs của ảnh phụ từ server
  const subImagesFromDB = currentSubImages
    .map((img) => img?.image_url)
    .filter(Boolean);

  // Kết hợp ảnh tạm và ảnh từ server
  const subImagesToShow = [...subImagesFromDB, ...subTempUrls];

  // 🎯 Hàm kiểm tra ảnh tạm
  const isTempImage = (imageUrl) => {
    return (
      imageUrl === safeTempImageUrls.main ||
      subTempUrls.includes(imageUrl) ||
      imageUrl?.startsWith("blob:")
    );
  };

  // 🎯 Hàm xử lý xóa ảnh
  const handleDeleteImage = (imageUrl, imageType, index = null) => {
    if (isTempImage(imageUrl)) {
      // Xóa ảnh tạm
      if (imageType === "main") {
        onDeleteTempImage("main");
      } else if (imageType === "sub" && index !== null) {
        onDeleteTempImage("sub", index);
      }
    } else {
      // Xóa ảnh từ server
      if (productId) {
        let imageId = null;

        if (imageType === "main" && currentMainImage) {
          imageId = currentMainImage.id;
        } else if (imageType === "sub" && currentSubImages[index]) {
          imageId = currentSubImages[index].id;
        }

        if (imageId) {
          onDeleteImage(productId, imageId, imageType);
        }
      }
    }
  };

  // console.log("=== DEBUG IMAGES ===");
  // console.log("productId:", productId);
  // console.log("mainImageToShow:", mainImageToShow);
  // console.log("subImagesToShow:", subImagesToShow);
  // console.log("currentMainImage:", currentMainImage);
  // console.log("currentSubImages:", currentSubImages);

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

          {/* Hiển thị ảnh chính */}
          {mainImageToShow && (
            <div className={styles.imagePreviewWithActions}>
              <img
                src={mainImageToShow}
                alt="Ảnh chính sản phẩm"
                className={styles.previewImage}
                onError={(e) => {
                  console.error("Error loading image:", mainImageToShow);
                  e.target.style.display = "none";
                }}
              />

              {/* Nút xóa ảnh chính */}
              <button
                type="button"
                onClick={() => handleDeleteImage(mainImageToShow, "main")}
                className={styles.removeImageBtn}
                title="Xóa ảnh chính"
              >
                <X size={14} />
              </button>
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
            {subImagesToShow.map((imageUrl, index) => {
              const isTemp = isTempImage(imageUrl);

              return (
                <div
                  key={`${imageUrl}-${index}`}
                  className={styles.subImageItem}
                >
                  <img
                    src={imageUrl}
                    alt={`Ảnh phụ ${index + 1}`}
                    onError={(e) => {
                      console.error("Error loading image:", imageUrl);
                      e.target.style.display = "none";
                    }}
                  />

                  {/* Nút xóa ảnh phụ */}
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(imageUrl, "sub", index)}
                    className={styles.removeImageBtn}
                    title="Xóa ảnh phụ"
                  >
                    <X size={12} />
                  </button>

                  {/* Badge hiển thị trạng thái ảnh */}
                  {isTemp && <div className={styles.tempBadge}>Tạm</div>}
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

        {/* Nút xóa tất cả ảnh */}
        {productId && (currentMainImage || currentSubImages.length > 0) && (
          <div className={styles.deleteAllSection}>
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => {
                if (window.confirm("Bạn có chắc chắn muốn xóa tất cả ảnh?")) {
                  onDeleteAllImages(productId);
                }
              }}
              disabled={safeUploadingImages.main || safeUploadingImages.sub}
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
