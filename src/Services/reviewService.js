// Services/reviewService.js
import * as httpRequest from "@/utils/httpRequest";

const createReview = async (formData) => {
  try {
    console.log("📤 Sending to API...");

    // 👇 DEBUG: Kiểm tra FormData trong service
    console.log("🔍 FormData in service:");
    for (let [key, value] of formData.entries()) {
      console.log(
        key,
        value instanceof File ? `${value.name} (${value.type})` : value,
      );
    }

    const response = await httpRequest.post("/reviews", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000, // 30 seconds timeout
    });

    return response.data;
  } catch (error) {
    console.error("💥 API Error:", error);

    if (error.response) {
      // Server responded with error status
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      throw error;
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
      throw new Error("Không thể kết nối đến server");
    } else {
      // Something else happened
      console.error("Error:", error.message);
      throw error;
    }
  }
};

const getProductReviews = async (productId, page = 1, limit = 10) => {
  // THÊM: Phân trang
  const response = await httpRequest.get(`/reviews/products/${productId}`, {
    params: { page, limit },
  });
  return response.data;
};

const getReviewableOrders = async (productId) => {
  const response = await httpRequest.get(`/orders/reviewable/${productId}`);
  return response.data;
};

// // THÊM: Service mới
// const getPendingReviews = async (page = 1, limit = 20) => {
//   const response = await httpRequest.get(`/admin/reviews/pending`, {
//     params: { page, limit }
//   });
//   return response.data;
// };

// const updateReviewStatus = async (reviewId, status) => {
//   const response = await httpRequest.patch(`/admin/reviews/${reviewId}/status`, {
//     status
//   });
//   return response.data;
// };

export { createReview, getProductReviews, getReviewableOrders };
