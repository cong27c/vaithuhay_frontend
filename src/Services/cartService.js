import * as httpRequest from "@/utils/httpRequest";

const addToCart = async (data) => {
  const response = await httpRequest.post("/carts/add", data);
  return response.data;
};

const getCart = async () => {
  const response = await httpRequest.get("/carts/my-cart");
  return response.data;
};

const updateQuantity = async (cartItemId, quantity) => {
  const response = await httpRequest.patch(
    `/carts/items/${cartItemId}/quantity`,
    { quantity },
  );
  return response.data;
};

const removeCartItem = async (cartItemId) => {
  const response = await httpRequest.del(`/carts/items/${cartItemId}`);
  return response.data;
};

export { addToCart, getCart, updateQuantity, removeCartItem };
