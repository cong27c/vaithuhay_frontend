import config from "~/config";
import Home from "~/pages/Home";
import NotFound from "~/pages/NotFound";
import ProductDetail from "~/pages/ProductDetail";
import Products from "~/pages/Products";
// import AdminLayout from "~/layouts/AdminLayout";
import Register from "~/pages/Register";
import Login from "~/pages/Login";
import Account from "~/pages/Account";
const routes = [
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.register,
    component: Register,
  },
  {
    path: config.routes.login,
    component: Login,
  },
  {
    path: config.routes.products,
    component: Products,
  },
  {
    path: config.routes.productDetail,
    component: ProductDetail,
  },
  {
    path: config.routes.notfound,
    component: NotFound,
  },
  {
    path: config.routes.account,
    component: Account,
  },
];

export default routes;
