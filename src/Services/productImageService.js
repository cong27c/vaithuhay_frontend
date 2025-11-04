import adminHttpRequest from "@/utils/adminHttpRequest";

export const uploadMainProductImage = async (productId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("is_main", true);

  const response = await adminHttpRequest.post(
    `/products/${productId}/images`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
};

export const uploadSubProductImage = async (productId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("is_main", false);

  const response = await adminHttpRequest.post(
    `/products/${productId}/images`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
};

export const deleteProductImage = async (productId, imageId) => {
  const response = await adminHttpRequest.del(
    `/products/${productId}/images/${imageId}`,
  );
  return response.data;
};

export const deleteAllProductImages = async (productId) => {
  const response = await adminHttpRequest.del(`/products/${productId}/images`);
  return response.data;
};
