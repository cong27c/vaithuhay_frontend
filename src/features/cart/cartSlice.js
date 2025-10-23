// features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [], // Đổi từ 'items' thành 'cartItems' để đồng bộ
    selectedProducts: [],
  },
  reducers: {
    setCartItems: (state, action) => {
      // Thêm validation
      if (Array.isArray(action.payload)) {
        state.cartItems = action.payload.map((item) => ({
          ...item,
          checked: item.checked || false, // Đảm bảo có thuộc tính checked
        }));
      } else {
        console.error("setCartItems payload must be an array");
        state.cartItems = [];
      }
    },
    setSelectedProducts: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.selectedProducts = action.payload;
      } else {
        console.error("setSelectedProducts payload must be an array");
        state.selectedProducts = [];
      }
    },
    clearSelectedProducts: (state) => {
      state.selectedProducts = [];
    },
    toggleSelectProduct: (state, action) => {
      const product = action.payload;
      if (!product || !product.id) {
        console.error("Invalid product in toggleSelectProduct");
        return;
      }

      const existingIndex = state.selectedProducts.findIndex(
        (p) => p.id === product.id,
      );

      if (existingIndex >= 0) {
        // Remove if exists
        state.selectedProducts.splice(existingIndex, 1);
      } else {
        // Add if not exists
        state.selectedProducts.push(product);
      }

      // Also update the checked status in cartItems
      const cartItemIndex = state.cartItems.findIndex(
        (item) => item.id === product.id,
      );
      if (cartItemIndex >= 0) {
        state.cartItems[cartItemIndex].checked =
          !state.cartItems[cartItemIndex].checked;
      }
    },
    // Thêm reducer mới để xử lý cập nhật số lượng
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity = quantity;

        // Cập nhật cả selectedProducts nếu có
        const selectedIndex = state.selectedProducts.findIndex(
          (item) => item.id === id,
        );
        if (selectedIndex >= 0) {
          state.selectedProducts[selectedIndex].quantity = quantity;
        }
      }
    },
    // Thêm reducer để xóa item
    removeCartItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
      state.selectedProducts = state.selectedProducts.filter(
        (item) => item.id !== id,
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.selectedProducts = [];
    },
  },
});

export const {
  setCartItems,
  setSelectedProducts,
  clearSelectedProducts,
  toggleSelectProduct,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
