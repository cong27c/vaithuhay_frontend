import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./ReviewsForm.module.scss";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Button from "@/components/Button";
import StarRating from "../StarRating";
import reviewSchema from "@/schema/reviewSchema";
import { createReview } from "@/Services/reviewService";

function ReviewsForm({ email, username, phone, product }) {
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
      order_id: 1,
    },
    // resolver: yupResolver(reviewSchema),
  });

  // === State ảnh & video ===
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

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
  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    imageFiles.forEach((file) => formData.append("images", file));
    if (videoFile) formData.append("video", videoFile);
    console.log([...formData.entries()]);

    const res = await createReview(formData);
    console.log(res);

    reset();
    setErrorMsg("");
    setImageFiles([]);
    setVideoFile(null);
    setPreviewImages([]);
    setPreviewVideo(null);
  };
  // === Xử lý xóa ảnh ===
  const handleRemoveImage = (index) => {
    // Revoke URL của ảnh bị xóa
    URL.revokeObjectURL(previewImages[index]);

    // Cập nhật state
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
        <div className={styles.userIn4}>
          <input placeholder="Tên" {...register("username")} />
          <input type="email" placeholder="Email" {...register("email")} />
          <input placeholder="Số điện thoại" {...register("phone")} />
        </div>

        <div className={styles.starRating}>
          <label className={styles.subTitle}>Đánh giá</label>
          <StarRating
            rating={watch("rating")}
            setRating={(star) => setValue("rating", star)}
          />
        </div>

        <div className={styles.titleRating}>
          <label className={styles.subTitle}>Tiêu đề đánh giá</label>
          <input placeholder="Nhập tiêu đề" {...register("title")} />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div className={styles.contentRating}>
          <label className={styles.subTitle}>Nội dung</label>
          <textarea
            placeholder="Viết nội dung đánh giá"
            {...register("content")}
          />
          {errors.content && <span>{errors.content.message}</span>}
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
              Gửi đánh giá
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReviewsForm;
