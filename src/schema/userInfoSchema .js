import * as yup from "yup";

export const userInfoSchema = yup.object({
  username: yup.string().required("Họ và tên không được để trống"),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Giới tính phải là Nam hoặc Nữ")
    .required("Giới tính là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  phone: yup
    .string()
    .matches(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số"),
  birthDate: yup
    .date()
    .max(new Date(), "Ngày sinh không thể ở tương lai")
    .nullable()
    .typeError("Ngày sinh không hợp lệ"),
});
