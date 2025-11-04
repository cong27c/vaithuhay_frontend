import { BrowserRouter as Router } from "react-router-dom";
import ScrollTop from "./components/ScrollTop";
import AppRoutes from "./components/AppRoutes";
import "./utils/FontAwesome";
import UserProvider from "./components/UserProvider";
import FixedButtons from "./components/FixedButtons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCartCombos, fetchCartItems } from "./features/cart/cartThunks";

function App() {
  return (
    <Router>
      <UserProvider />
      <ScrollTop />
      <AppRoutes />
    </Router>
  );
}

export default App;
