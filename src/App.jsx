import { BrowserRouter as Router } from "react-router-dom";
import ScrollTop from "./components/ScrollTop";
import AppRoutes from "./components/AppRoutes";
import "./utils/FontAwesome";
import UserProvider from "./components/UserProvider";
import FixedButtons from "./components/FixedButtons";

function App() {
  return (
    <Router>
      <UserProvider />
      <ScrollTop />
      <AppRoutes />
      <FixedButtons />
    </Router>
  );
}

export default App;
