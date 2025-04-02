import * as yup from "yup";

const registerSchema = yup.object({
  firstName: yup.string().required("Vui lòng nhập tên"),
  lastName: yup.string().required("Vui lòng nhập họ"),
  email: yup.string().when("$registerType", {
    is: "email",
    then: (schema) =>
      schema.email("Email không hợp lệ").required("Vui lòng nhập email"),
  }),
  phone: yup.string().when("$registerType", {
    is: "phone",
    then: (schema) =>
      schema
        .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
        .required("Vui lòng nhập số điện thoại"),
  }),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Vui lòng nhập mật khẩu"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});

export default registerSchema;
