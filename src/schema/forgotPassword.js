import * as yup from "yup";

export const forgotSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email không được để trống")
    .email("Email không hợp lệ"),
});
