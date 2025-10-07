import * as yup from "yup";

// Regex kiểm tra số điện thoại Việt Nam (có thể tùy chỉnh theo nhu cầu)
const phoneRegex = /^(\+84|0)(3|5|7|8|9)\d{8}$/;

// Regex kiểm tra link YouTube
const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

const reviewSchema = yup.object().shape({
  username: yup.string().required("Tên không được để trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  phone: yup
    .string()
    .matches(phoneRegex, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không được để trống"),
  title: yup.string().required("Tiêu đề đánh giá không được để trống"),
  content: yup
    .string()
    .min(10, "Nội dung phải ít nhất 10 ký tự")
    .required("Nội dung đánh giá không được để trống"),
  youtubeLink: yup
    .string()
    .matches(youtubeRegex, "Link YouTube không hợp lệ")
    .notRequired()
    .nullable(),
});

export default reviewSchema;
