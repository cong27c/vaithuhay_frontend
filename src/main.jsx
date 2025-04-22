import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { LoadingProvider } from "./contexts/LoadingContext .jsx";
import { persistor, store } from "./store/index.js";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor}>
      <LoadingProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <App />
      </LoadingProvider>
    </PersistGate>
  </ReduxProvider>
);
