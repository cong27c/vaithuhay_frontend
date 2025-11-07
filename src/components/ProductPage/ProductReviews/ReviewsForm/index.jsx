import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./ReviewsForm.module.scss";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Button from "@/components/Button";
import StarRating from "../StarRating";
import reviewSchema from "@/schema/reviewSchema";
import { createReview } from "@/Services/reviewService";

function ReviewsForm({ email, username, phone, product, orderId }) {
  // 👈 THÊM orderId
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: username || "",
      email: email || "",
      phone: phone || "",
      title: "",
      content: "",
      youtubeLink: "",
      rating: 0,
      product_id: product?.id,
      order_id: orderId || "", // 👈 SỬA: order_id từ props, không hardcode
    },
    // resolver: yupResolver(reviewSchema),
  });

  // === State ảnh & video ===
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); // 👈 THÊM: Thông báo thành công

  // === Xử lý chọn ảnh (tối đa 5) ===
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length > 5) {
      setErrorMsg("Bạn chỉ có thể chọn tối đa 5 ảnh");
      return;
    }
    setErrorMsg("");
    const newFiles = [...imageFiles, ...files];
    setImageFiles(newFiles);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  // === Xử lý chọn video (chỉ 1) ===
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate video size (ví dụ: max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setErrorMsg("Video không được vượt quá 50MB");
      return;
    }

    if (videoFile) {
      setErrorMsg("Chỉ được phép chọn 1 video");
      return;
    }
    setErrorMsg("");
    setVideoFile(file);
    setPreviewVideo(URL.createObjectURL(file));
  };

  // === Cleanup khi unmount ===
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
      if (previewVideo) URL.revokeObjectURL(previewVideo);
    };
  }, [previewImages, previewVideo]);

  // === Submit form ===
  // === Submit form ===
  const onSubmit = async (data) => {
    try {
      setErrorMsg("");
      setSuccessMsg("");

      // Validate rating
      if (!data.rating || data.rating === 0) {
        setErrorMsg("Vui lòng chọn số sao đánh giá");
        return;
      }

      // Validate order_id
      if (!data.order_id) {
        setErrorMsg("Thiếu thông tin đơn hàng");
        return;
      }

      console.log("📝 Form data:", data);
      console.log("🖼️ Image files:", imageFiles);
      console.log("🎥 Video file:", videoFile);

      const formData = new FormData();

      // 👇 APPEND ĐÚNG CÁCH - kiểm tra từng field
      formData.append("title", data.title?.trim() || "");
      formData.append("content", data.content?.trim() || "");
      formData.append("rating", data.rating?.toString() || "0");
      formData.append("product_id", data.product_id?.toString() || "");
      formData.append("order_id", data.order_id?.toString() || "");

      // 👇 APPEND FILES - kiểm tra từng file
      if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach((file, index) => {
          formData.append("images", file); // 👈 QUAN TRỌNG: "images" (số nhiều)
          console.log(`✅ Appended image ${index + 1}:`, file.name);
        });
      }

      if (videoFile) {
        formData.append("video", videoFile); // 👈 "video" (số ít)
        console.log(`✅ Appended video:`, videoFile.name);
      }

      // 👇 DEBUG: Kiểm tra FormData contents
      console.log("📦 FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // 👇 Gọi API
      console.log("🚀 Calling createReview API...");
      const res = await createReview(formData);
      console.log("✅ Response:", res);

      // 👇 Reset form sau khi thành công
      reset({
        username: username || "",
        email: email || "",
        phone: phone || "",
        title: "",
        content: "",
        youtubeLink: "",
        rating: 0,
        product_id: product?.id,
        order_id: orderId || "",
      });

      setSuccessMsg("Đánh giá thành công! Đánh giá của bạn đang chờ duyệt.");
      setImageFiles([]);
      setVideoFile(null);
      setPreviewImages([]);
      setPreviewVideo(null);
    } catch (err) {
      console.error("❌ Lỗi khi gửi đánh giá:", err);
      setErrorMsg(
        err.response?.data?.message || "Có lỗi xảy ra khi gửi đánh giá",
      );
      setSuccessMsg("");
    }
  };

  // === Xử lý xóa ảnh ===
  const handleRemoveImage = (index) => {
    URL.revokeObjectURL(previewImages[index]);
    const newImages = imageFiles.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setImageFiles(newImages);
    setPreviewImages(newPreviews);
  };

  // === Xử lý xóa video ===
  const handleRemoveVideo = () => {
    if (previewVideo) {
      URL.revokeObjectURL(previewVideo);
    }
    setVideoFile(null);
    setPreviewVideo(null);
  };

  return (
    <div className={styles.reviewsContent}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* 👇 ẨN các field user info nếu BE không dùng */}
        <div className={styles.userIn4} style={{ display: "none" }}>
          <input placeholder="Tên" {...register("username")} />
          <input type="email" placeholder="Email" {...register("email")} />
          <input placeholder="Số điện thoại" {...register("phone")} />
        </div>

        {/* 👇 THÊM: Hiển thị order_id (có thể ẩn hoặc readonly) */}
        <input type="hidden" {...register("order_id")} />

        <div className={styles.starRating}>
          <label className={styles.subTitle}>Đánh giá *</label>
          <StarRating
            rating={watch("rating")}
            setRating={(star) => setValue("rating", star)}
          />
          {errors.rating && (
            <span className={styles.error}>{errors.rating.message}</span>
          )}
        </div>

        <div className={styles.titleRating}>
          <label className={styles.subTitle}>Tiêu đề đánh giá *</label>
          <input placeholder="Nhập tiêu đề" {...register("title")} />
          {errors.title && (
            <span className={styles.error}>{errors.title.message}</span>
          )}
        </div>

        <div className={styles.contentRating}>
          <label className={styles.subTitle}>Nội dung *</label>
          <textarea
            placeholder="Viết nội dung đánh giá"
            {...register("content")}
          />
          {errors.content && (
            <span className={styles.error}>{errors.content.message}</span>
          )}
        </div>

        {/* Preview ảnh/video */}
        <div className={styles.previewContainer}>
          {previewImages.map((url, idx) => (
            <div key={idx} className={styles.previewItem}>
              <img src={url} alt={`preview-${idx}`} />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => handleRemoveImage(idx)}
              >
                ×
              </button>
            </div>
          ))}
          {previewVideo && (
            <div className={styles.previewItem}>
              <video controls>
                <source src={previewVideo} type={videoFile?.type} />
              </video>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={handleRemoveVideo}
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* 👇 THÊM: Hiển thị thông báo thành công */}
        {successMsg && <p className={styles.success}>{successMsg}</p>}
        {errorMsg && <p className={styles.error}>{errorMsg}</p>}

        <div className={styles.listBtn}>
          <div className={styles.bodyLeft}>
            <div className={styles.fileImageContainer}>
              <input
                type="file"
                id="fileImage"
                className={styles.fileInput}
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <label htmlFor="fileImage" className={styles.fileLabel}>
                Chọn hình (tối đa 5)
              </label>
            </div>

            <input
              type="file"
              id="fileVideo"
              className={styles.fileInput}
              accept="video/*"
              style={{ display: "none" }}
              onChange={handleVideoChange}
            />
            <button
              type="button"
              className={styles.btn}
              onClick={() => document.getElementById("fileVideo").click()}
            >
              Chọn video
            </button>
          </div>

          <div className={styles.bodyRight}>
            <Button
              draculaButton
              icon={faPaperPlane}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReviewsForm;
