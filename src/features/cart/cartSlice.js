import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // toàn bộ giỏ hàng
    selectedProducts: [], // các sản phẩm được chọn để thanh toán
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
    clearSelectedProducts: (state) => {
      state.selectedProducts = [];
    },
    toggleSelectProduct: (state, action) => {
      const product = action.payload;
      const isSelected = state.selectedProducts.find(
        (p) => p.id === product.id,
      );
      if (isSelected) {
        state.selectedProducts = state.selectedProducts.filter(
          (p) => p.id !== product.id,
        );
      } else {
        state.selectedProducts.push(product);
      }
    },
  },
});

export const {
  setCartItems,
  setSelectedProducts,
  clearSelectedProducts,
  toggleSelectProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
