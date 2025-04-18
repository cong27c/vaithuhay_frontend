import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { LoadingProvider } from "./contexts/LoadingContext .jsx";
import store from "./store/index.js";
import { actions as productActions } from "~/reducers/product";

createRoot(document.getElementById("root")).render(
  <ReduxProvider store={store}>
    <AuthProvider>
      <LoadingProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <App />
      </LoadingProvider>
    </AuthProvider>
  </ReduxProvider>
);
