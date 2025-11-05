import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { LoadingProvider } from "./contexts/LoadingContext .jsx";
import { persistor, store } from "./store/index.js";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

// Tạo một instance QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <LoadingProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          <App />
        </LoadingProvider>
      </QueryClientProvider>
    </PersistGate>
  </ReduxProvider>,
);
