import config from "~/config";
import Home from "~/pages/Home";
import NotFound from "~/pages/NotFound";
import ProductDetail from "~/pages/ProductDetail";
import Products from "~/pages/Products";
// import AdminLayout from "~/layouts/AdminLayout";
import Register from "~/pages/Register";
import Login from "~/pages/Login";
import Account from "~/pages/Account";
import Loyalty from "~/pages/Account/Loyalty";
import UserInfo from "~/pages/Account/UserInfo";
import YourOrder from "~/pages/Account/YourOrder";
import Wishlist from "~/pages/Account/Wishlist";
import Address from "~/pages/Account/Address";
import Coupon from "~/pages/Account/Coupon";
import Introduce from "~/pages/SeeMore/Introduce";
import SetupDecor from "~/pages/Blogs/SetupDecor";
import Technology from "~/pages/Blogs/Technology";
import Blogs from "~/pages/Blogs";
import SeeMore from "~/pages/SeeMore";
import Affiliate from "~/pages/SeeMore/Affiliate";
import Recruitment from "~/pages/SeeMore/Recruitment";
import Showcase from "~/pages/SeeMore/Showcase";
import FullscreenLayout from "~/layouts/FullscreenLayout";
import PartTimeJobs from "~/pages/SeeMore/Recruitment/PartTimeJobs";

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
    path: config.routes.introduce,
    component: Introduce,
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
    path: config.seeMoreRoutes.recruitment,
    component: Recruitment,
    layout: FullscreenLayout,
  },
  {
    path: config.seeMoreRoutes.parTimeJobs,
    component: PartTimeJobs,
    layout: FullscreenLayout,
  },

  {
    path: config.routes.account,
    component: Account,
    children: [
      { path: config.accountRoutes.loyalty, component: Loyalty },
      { path: config.accountRoutes.info, component: UserInfo },
      { path: config.accountRoutes.orders, component: YourOrder },
      { path: config.accountRoutes.wishlist, component: Wishlist },
      { path: config.accountRoutes.addresses, component: Address },
      { path: config.accountRoutes.coupons, component: Coupon },
    ],
  },
  {
    path: config.routes.blogs,
    component: Blogs,
    children: [
      { path: config.blogsRoutes.setupDecor, component: SetupDecor },
      { path: config.blogsRoutes.technology, component: Technology },
    ],
  },
  {
    path: config.routes.seeMore,
    component: SeeMore,
    children: [
      { path: config.seeMoreRoutes.affiliate, component: Affiliate },
      { path: config.seeMoreRoutes.introduce, component: Introduce },
      { path: config.seeMoreRoutes.Showcase, component: Showcase },
    ],
  },
];

export default routes;
