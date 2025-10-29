// services/checkoutService.js
import * as httpRequest from "@/utils/httpRequest";
import { ensureGuestSession } from "./cartService";

const checkout = async (formData, isLoggedIn = false) => {
  try {
    let payload = { ...formData };

    // Thêm session_id nếu là guest
    if (!isLoggedIn) {
      const sessionId = await ensureGuestSession();
      payload.session_id = sessionId;
    }

    console.log("Checkout payload:", payload);
    const response = await httpRequest.post("/checkout", payload);
    return response.data;
  } catch (error) {
    console.error("Checkout error:", error);
    throw error;
  }
};

const getAllCombos = async () => {
  const response = await httpRequest.get(`/combos`);
  return response.data;
};

const getAllComboDetail = async () => {
  const response = await httpRequest.get(`/combos/detail`);
  return response.data;
};

const getComboProducts = async (comboId) => {
  const response = await httpRequest.get(`/combos/${comboId}/products`);
  return response.data;
};

export { checkout, getAllCombos, getAllComboDetail, getComboProducts };
