import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import authReducer from "@/features/auth/authSlice";
import cartReducer from "@/features/cart/cartSlice";
import sliderReducer from "@/features/slider/sliderSlice";

const authConfig = {
  key: "auth",
  storage,
};

const cartConfig = {
  key: "cart",
  storage,
  // Có thể thêm các tùy chọn khác nếu cần
  // whitelist: ['selectedProducts'], // Chỉ persist các field cụ thể
  // blacklist: ['temporaryData'], // Không persist các field cụ thể
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  cart: persistReducer(cartConfig, cartReducer), // Thêm persist cho cart
  slider: sliderReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Bỏ qua cảnh báo serializable cho persist
      },
    }),
});

export const persistor = persistStore(store);
