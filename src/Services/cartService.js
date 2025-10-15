import httpRequest from "@/utils/httpRequest";

// services/cartService.js
const ensureGuestSession = async () => {
  try {
    let sessionId = localStorage.getItem("guest_session_id");

    // Nếu đã có sessionId, trả về luôn
    if (sessionId) {
      return sessionId;
    }

    // Chỉ tạo mới khi thật sự chưa có
    const res = await httpRequest.post("/guest-session/create");
    sessionId = res.data.session_id;
    localStorage.setItem("guest_session_id", sessionId);

    return sessionId;
  } catch (error) {
    console.error("Error ensuring guest session:", error);
    throw error;
  }
};
/**
 * Lấy giỏ hàng
 */
const getCart = async (isLoggedIn = false) => {
  try {
    let config = {};
    console.log("isLoggedIn", isLoggedIn);
    if (!isLoggedIn) {
      const sessionId = await ensureGuestSession();
      console.log(sessionId);

      config.params = { session_id: sessionId };
    }

    const response = await httpRequest.get("/carts/my-cart", config);
    return response.data;
  } catch (error) {
    console.error("Error getting cart:", error);
    throw error;
  }
};

/**
 * Thêm sản phẩm vào giỏ hàng
 */
const addToCart = async (data, isLoggedIn = false) => {
  try {
    const sessionId = await ensureGuestSession();

    const payload = {
      ...data,
      ...(!isLoggedIn && { session_id: sessionId }),
    };

    const response = await httpRequest.post("/carts/add", payload);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

/**
 * Cập nhật số lượng sản phẩm trong giỏ hàng
 */
const updateQuantity = async (cartItemId, quantity, isLoggedIn = false) => {
  try {
    const sessionId = await ensureGuestSession();

    const payload = {
      quantity,
      ...(!isLoggedIn && { session_id: sessionId }),
    };

    const response = await httpRequest.patch(
      `/carts/items/${cartItemId}/quantity`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating quantity:", error);
    throw error;
  }
};

/**
 * Xóa sản phẩm khỏi giỏ hàng
 */
const removeCartItem = async (cartItemId, isLoggedIn = false) => {
  try {
    const sessionId = await ensureGuestSession();

    const config = {};
    if (!isLoggedIn && sessionId) {
      config.data = { session_id: sessionId };
    }

    const response = await httpRequest.del(
      `/carts/items/${cartItemId}`,
      config,
    );
    return response.data;
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
};

/**
 * Cập nhật biến thể sản phẩm trong giỏ hàng
 */
const updateCartItemVariant = async (itemId, variantId, isLoggedIn = false) => {
  try {
    const sessionId = await ensureGuestSession();

    const payload = {
      variantId,
      ...(!isLoggedIn && { session_id: sessionId }),
    };

    const response = await httpRequest.put(
      `/carts/items/${itemId}/variant`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating cart item variant:", error);
    throw error;
  }
};

export {
  ensureGuestSession,
  getCart,
  addToCart,
  updateQuantity,
  removeCartItem,
  updateCartItemVariant,
};
