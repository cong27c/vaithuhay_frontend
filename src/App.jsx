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
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // Lấy giỏ hàng ngay khi app load
  //   dispatch(fetchCartItems());
  //   dispatch(fetchCartCombos());
  // }, [dispatch]);
  return (
    <Router>
      <UserProvider />
      <ScrollTop />
      <AppRoutes />
      {/* <FixedButtons /> */}
    </Router>
  );
}

export default App;
