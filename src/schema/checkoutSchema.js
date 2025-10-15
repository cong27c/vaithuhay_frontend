import * as yup from "yup";

export const checkoutSchema = yup.object({
  fullName: yup.string().required("Họ và tên là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  phone: yup
    .string()
    .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),
  address: yup.string().when("deliveryMethod", {
    is: "home",
    then: (schema) => schema.required("Địa chỉ là bắt buộc"),
    otherwise: (schema) => schema.notRequired(),
  }),
  province: yup.string().when("deliveryMethod", {
    is: "home",
    then: (schema) => schema.required("Tỉnh/Thành phố là bắt buộc"),
    otherwise: (schema) => schema.notRequired(),
  }),
  district: yup.string().when("deliveryMethod", {
    is: "home",
    then: (schema) => schema.required("Quận/Huyện là bắt buộc"),
    otherwise: (schema) => schema.notRequired(),
  }),
  ward: yup.string().when("deliveryMethod", {
    is: "home",
    then: (schema) => schema.required("Phường/Xã là bắt buộc"),
    otherwise: (schema) => schema.notRequired(),
  }),
  provinceName: yup.string(),
  districtName: yup.string(),
  wardName: yup.string(),
  deliveryMethod: yup
    .string()
    .oneOf(["home", "store"])
    .required("Phương thức giao hàng là bắt buộc"),
  paymentMethod: yup
    .string()
    .oneOf(["cod", "bank", "momo", "vnpay"])
    .required("Phương thức thanh toán là bắt buộc"),
});
