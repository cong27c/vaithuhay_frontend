// import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
// import { reducer as productReducer } from "~/reducers/product";
// import { reducer as authReducer } from "~/reducers/auth";
// import { thunk } from "redux-thunk";
// import logger from "redux-logger";

// const initState = {};

// const rootReducer = combineReducers({
//   product: productReducer,
//   auth: authReducer,
// });

// const store = legacy_createStore(
//   rootReducer,
//   initState,
//   applyMiddleware(thunk, logger)
// );
// window.store = store;
// export default store;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "~/features/auth/authSlice";
import { profileApi } from "~/Services/profile";

const authConfig = {
  key: "auth",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  [profileApi.reducerPath]: profileApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) => [
    ...getDefault({ serializableCheck: false }),
    logger,
    profileApi.middleware,
  ],
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
