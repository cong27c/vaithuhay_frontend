// features/cart/cartSelectors.js
export const selectCartItems = (state) => state.cart.cartItems;
export const selectedProducts = (state) => state.cart.selectedProducts;
export const selectCombos = (state) => state.cart.combos;

// Selector để lấy tất cả items (cả sản phẩm lẻ và combo)
export const selectAllCartItems = (state) => {
  const individualItems = state.cart.cartItems.map((item) => ({
    ...item,
    type: "product",
  }));

  const comboItems = state.cart.combos.map((combo) => ({
    ...combo,
    type: "combo",
  }));

  return [...individualItems, ...comboItems];
};

// Selector tính tổng tiền
export const selectCartTotal = (state) => {
  const individualTotal = state.cart.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const combosTotal = state.cart.combos.reduce(
    (total, combo) =>
      total +
      combo.products.reduce(
        (comboTotal, product) => comboTotal + product.price * product.quantity,
        0,
      ),
    0,
  );

  return individualTotal + combosTotal;
};
