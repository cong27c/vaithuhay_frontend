import config from "~/config";
import Home from "~/pages/Home";
import NotFound from "~/pages/NotFound";
import ProductDetail from "~/pages/ProductDetail";
import Products from "~/pages/Products";
// import AdminLayout from "~/layouts/AdminLayout";
import Register from "~/pages/Register";
import Login from "~/pages/Login";

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
    protected: true,
  },
  {
    path: config.routes.productDetail,
    component: ProductDetail,
    layout: null,
  },
  {
    path: config.routes.notfound,
    component: NotFound,
  },
];

export default routes;
