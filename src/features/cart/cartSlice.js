// features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  addCombo,
  fetchCartCombos,
  removeCombo,
  updateComboQuantity,
  fetchCartItems,
  refreshCart, // THÊM fetchCartItems
} from "./cartThunks";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    selectedProducts: [],
    combos: [],
    loading: false,
    error: null,
    lastUpdated: null, // THÊM: Theo dõi thời gian cập nhật cuối
  },

  reducers: {
    setCartItems: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.cartItems = action.payload?.map((item) => ({
          ...item,
          checked: item.checked || false,
        }));
        state.lastUpdated = Date.now(); // CẬP NHẬT thời gian
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
        state.selectedProducts.splice(existingIndex, 1);
      } else {
        state.selectedProducts.push(product);
      }

      const cartItemIndex = state.cartItems.findIndex(
        (item) => item.id === product.id,
      );
      if (cartItemIndex >= 0) {
        state.cartItems[cartItemIndex].checked =
          !state.cartItems[cartItemIndex].checked;
      }
    },

    toggleSelectCombo: (state, action) => {
      const comboId = action.payload;
      if (!comboId) {
        console.error("Invalid comboId in toggleSelectCombo");
        return;
      }

      const comboIndex = state.combos.findIndex(
        (combo) => combo.id === comboId,
      );
      if (comboIndex >= 0) {
        state.combos[comboIndex].checked = !state.combos[comboIndex].checked;

        const existingIndex = state.selectedProducts.findIndex(
          (p) => p.id === comboId && p.isCombo === true,
        );

        if (state.combos[comboIndex].checked) {
          if (existingIndex === -1) {
            state.selectedProducts.push({
              ...state.combos[comboIndex],
              isCombo: true,
            });
          }
        } else {
          if (existingIndex >= 0) {
            state.selectedProducts.splice(existingIndex, 1);
          }
        }
      }
    },

    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity = quantity;

        const selectedIndex = state.selectedProducts.findIndex(
          (item) => item.id === id,
        );
        if (selectedIndex >= 0) {
          state.selectedProducts[selectedIndex].quantity = quantity;
        }

        state.lastUpdated = Date.now(); // CẬP NHẬT thời gian
      }
    },

    updateComboQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (!id || quantity === undefined || quantity < 0) {
        console.error("Invalid payload in updateComboQuantity");
        return;
      }

      const comboIndex = state.combos.findIndex((combo) => combo.id === id);
      if (comboIndex >= 0) {
        const oldQuantity = state.combos[comboIndex].quantity;
        state.combos[comboIndex].quantity = quantity;

        if (state.combos[comboIndex].products) {
          state.combos[comboIndex].products.forEach((product) => {
            product.subtotal = product.price * quantity;
          });

          const originalTotal = state.combos[comboIndex].products.reduce(
            (sum, product) => sum + product.price * quantity,
            0,
          );

          const discountValue = state.combos[comboIndex].discountValue || 0;
          const discountedTotal = originalTotal * (1 - discountValue / 100);
          const discountPrice = originalTotal - discountedTotal;

          state.combos[comboIndex].originalTotal = originalTotal;
          state.combos[comboIndex].discountedTotal = discountedTotal;
          state.combos[comboIndex].discountPrice = discountPrice;
          state.combos[comboIndex].total = discountedTotal;
          state.combos[comboIndex].totalPrice = originalTotal;
        }

        const selectedIndex = state.selectedProducts.findIndex(
          (item) => item.id === id && item.isCombo === true,
        );
        if (selectedIndex >= 0) {
          state.selectedProducts[selectedIndex].quantity = quantity;
          state.selectedProducts[selectedIndex].originalTotal =
            state.combos[comboIndex].originalTotal;
          state.selectedProducts[selectedIndex].discountedTotal =
            state.combos[comboIndex].discountedTotal;
          state.selectedProducts[selectedIndex].total =
            state.combos[comboIndex].total;
        }

        state.lastUpdated = Date.now(); // CẬP NHẬT thời gian
      }
    },

    removeCartItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
      state.selectedProducts = state.selectedProducts.filter(
        (item) => item.id !== id,
      );
      state.lastUpdated = Date.now(); // CẬP NHẬT thời gian
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.selectedProducts = [];
      state.combos = [];
      state.lastUpdated = Date.now(); // CẬP NHẬT thời gian
    },

    // THÊM: Action để refresh cart thủ công
    forceRefresh: (state) => {
      state.lastUpdated = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshCart.fulfilled, (state, action) => {
      const { cartItems, combos } = action.payload || {};
      if (cartItems) state.cartItems = cartItems;
      if (combos) state.combos = combos;
      state.lastUpdated = Date.now();
    });
    // Fetch cart items - THÊM logic xử lý fetchCartItems
    builder.addCase(fetchCartItems.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload?.map((item) => ({
        ...item,
        checked: item.checked || false,
      }));
      state.lastUpdated = Date.now(); // CẬP NHẬT thời gian
    });
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch combos
    builder.addCase(fetchCartCombos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCartCombos.fulfilled, (state, action) => {
      state.loading = false;
      state.combos = action.payload?.map((item) => ({
        ...item,
        checked: item.checked || false,
      }));
      state.lastUpdated = Date.now(); // CẬP NHẬT thời gian
    });
    builder.addCase(fetchCartCombos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add combo
    builder.addCase(addCombo.fulfilled, (state, action) => {
      const comboItem = action.payload;
      state.combos.push({ ...comboItem, checked: false });
      state.lastUpdated = Date.now(); // CẬP NHẬT thời gian
    });

    // Update combo quantity
    builder.addCase(updateComboQuantity.fulfilled, (state, action) => {
      const { cartItemId, quantity } = action.payload;
      const index = state.combos.findIndex((c) => c.id === cartItemId);
      if (index >= 0) {
        state.combos[index].quantity = quantity;

        if (state.combos[index].products) {
          const originalTotal = state.combos[index].products.reduce(
            (sum, product) => sum + product.price * quantity,
            0,
          );
          const discountValue = state.combos[index].discountValue || 0;

          const discountedTotal = originalTotal * (1 - discountValue / 100);

          state.combos[index].originalTotal = originalTotal;
          state.combos[index].discountedTotal = discountedTotal;
          state.combos[index].total = discountedTotal;
          state.combos[index].totalPrice = originalTotal;
        }

        state.lastUpdated = Date.now(); // CẬP NHẬT thời gian
      }
    });

    // Remove combo
    builder.addCase(removeCombo.fulfilled, (state, action) => {
      const id = action.payload;
      state.combos = state.combos.filter((c) => c.id !== id);
      state.selectedProducts = state.selectedProducts.filter(
        (item) => !(item.id === id && item.isCombo === true),
      );
      state.lastUpdated = Date.now(); // CẬP NHẬT thời gian
    });
  },
});

export const {
  setCartItems,
  setSelectedProducts,
  clearSelectedProducts,
  toggleSelectProduct,
  toggleSelectCombo,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
  forceRefresh, // THÊM export
} = cartSlice.actions;

export default cartSlice.reducer;
