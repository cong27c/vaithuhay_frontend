import {
  addComboToCart,
  getCart,
  getCartCombos,
  removeCartCombo,
  updateCartComboQuantity,
} from "@/Services/cartService";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ------------------- Async Thunks cho combo -------------------
export const fetchCartCombos = createAsyncThunk(
  "cart/fetchCartCombos",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCartCombos();
      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch cart combos");
    }
  },
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCart();
      console.log("fetchCartItems", res);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const refreshCart = createAsyncThunk(
  "cart/refreshCart",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const [cartItems, combos] = await Promise.all([
        dispatch(fetchCartItems()).unwrap(),
        dispatch(fetchCartCombos()).unwrap(),
      ]);

      return { cartItems, combos };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to refresh cart");
    }
  },
);

export const addCombo = createAsyncThunk(
  "cart/addCombo",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await addComboToCart(payload);
      return data; // trả về cartItem vừa thêm
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add combo to cart");
    }
  },
);

export const updateComboQuantity = createAsyncThunk(
  "cart/updateComboQuantity",
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const data = await updateCartComboQuantity({
        cartItemId,
        quantity,
      });
      console.log("updateComboQuantity", data);
      return { cartItemId, quantity };
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to update combo quantity",
      );
    }
  },
);

export const removeCombo = createAsyncThunk(
  "cart/removeCombo",
  async (cartItemId, { rejectWithValue }) => {
    try {
      await removeCartCombo(cartItemId);
      return cartItemId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to remove combo");
    }
  },
);
