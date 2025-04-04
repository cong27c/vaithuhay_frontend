import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { LoadingProvider } from "./contexts/LoadingContext .jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <LoadingProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <App />
    </LoadingProvider>
  </AuthProvider>
);
