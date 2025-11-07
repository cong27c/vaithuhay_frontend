import * as httpRequest from "@/utils/httpRequest";

const getVouchers = async () => {
  const response = await httpRequest.get("/vouchers");
  return response.data;
};

const applyVoucher = async (cartId, voucherCode, cartItems) => {
  const response = await httpRequest.post("/vouchers/apply", {
    cartId,
    voucherCode,
    cartItems,
  });
  return response.data;
};

export { getVouchers, applyVoucher };
