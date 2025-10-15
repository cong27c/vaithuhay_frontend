import config from "@/config";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import ProductDetail from "@/pages/ProductDetail";
// import AdminLayout from "@/layouts/AdminLayout";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Account from "@/pages/Account";
import Loyalty from "@/pages/Account/Loyalty";
import UserInfo from "@/pages/Account/UserInfo";
import YourOrder from "@/pages/Account/YourOrder";
import Wishlist from "@/pages/Account/Wishlist";
import Address from "@/pages/Account/Address";
import Coupon from "@/pages/Account/Coupon";
import Introduce from "@/pages/SeeMore/Introduce";
import SetupDecor from "@/pages/Blogs/SetupDecor";
import Technology from "@/pages/Blogs/Technology";
import Blogs from "@/pages/Blogs";
import SeeMore from "@/pages/SeeMore";
import Affiliate from "@/pages/SeeMore/Affiliate";
import Recruitment from "@/pages/SeeMore/Recruitment";
import Collections from "@/pages/SeeMore/Showcase";
import FullscreenLayout from "@/layouts/FullscreenLayout";
import PartTimeJobs from "@/pages/SeeMore/Recruitment/PartTimeJobs";
import AffiliateOperation from "@/pages/JobDetailPage/Intern/AffiliateOperation";
import ContentCreator from "@/pages/JobDetailPage/Intern/ContentCreator";
import GraphicDesigner from "@/pages/JobDetailPage/Intern/GraphicDesigner";
import MarketingExecutive from "@/pages/JobDetailPage/FullTime/MarketingExecutive";
import PartTimeCustomerService from "@/pages/JobDetailPage/PartTimeCustomerService";
import CustomerService from "@/pages/JobDetailPage/FullTime/CustomerService";
import MarketingExecutiveIntern from "@/pages/JobDetailPage/Intern/MarketingExecutiveIntern";
import JobDetailPage from "@/pages/JobDetailPage";
import PolicySection from "@/components/PolicySection";
import PolicyPage from "@/pages/PolicyPage";
import LoyaltyProgram from "@/pages/PolicyPage/LoyaltyProgram";
import PreOrderPolicy from "@/pages/PolicyPage/PreOrderPolicy";
import ReturnPolicy from "@/pages/PolicyPage/ReturnPolicy";
import News from "@/components/News";
import NewPost from "@/pages/NewPost";
import KingrowK1 from "@/pages/NewPost/KingrowK1";
import NarwalRobot from "@/pages/NewPost/NarwalRobot/index.jsx";
import RainShoeCover from "@/pages/NewPost/RainShoeCover";
import SmartEInkTablet from "@/pages/NewPost/SmartEInkTablet";
import EYESmartcase from "@/pages/NewPost/EYESmartcase";
import DiceGlowFeature from "@/pages/NewPost/DiceGlowFeature";
import LeatherCareTips from "@/pages/NewPost/LeatherCareTips";
import ProductPage from "@/components/ProductPage";
import VerifyEmail from "@/components/VerifyEmail/VerifyEmail";
import AuthLayout from "@/layouts/AuthLayout";
import ResetPassword from "@/components/ResetPassword";
import ForgotPassword from "@/components/ForgotPassword";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";

const routes = [
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.cart,
    component: Cart,
  },
  {
    path: config.routes.checkout,
    component: Checkout,
  },
  {
    path: config.routes.register,
    component: Register,
    layout: AuthLayout,
  },

  {
    path: config.routes.login,
    component: Login,
    layout: AuthLayout,
  },
  {
    path: config.routes.resetPassword,
    component: ResetPassword,
    layout: AuthLayout,
  },
  {
    path: config.routes.forgotPassword,
    component: ForgotPassword,
    layout: AuthLayout,
  },
  {
    path: config.routes.products,
    component: ProductPage,
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
    path: config.routes.verify,
    component: VerifyEmail,
  },
  {
    path: config.routes.news,
    component: News,
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
    path: config.seeMoreRoutes.jobsDetailPage,
    component: JobDetailPage,
    layout: FullscreenLayout,
    children: [
      {
        path: config.jobDetailRoutes.affiliateOperation,
        component: AffiliateOperation,
      },
      {
        path: config.jobDetailRoutes.contentCreator,
        component: ContentCreator,
      },
      {
        path: config.jobDetailRoutes.graphicDesigner,
        component: GraphicDesigner,
      },
      {
        path: config.jobDetailRoutes.marketingExecutive,
        component: MarketingExecutive,
      },
      {
        path: config.jobDetailRoutes.partTimeCustomerService,
        component: PartTimeCustomerService,
      },
      {
        path: config.jobDetailRoutes.customerService,
        component: CustomerService,
      },
      {
        path: config.jobDetailRoutes.marketingExecutiveIntern,
        component: MarketingExecutiveIntern,
      },
    ],
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
      { path: config.seeMoreRoutes.Collections, component: Collections },
    ],
  },
  {
    path: config.routes.policySection,
    component: PolicySection,
  },
  {
    path: config.routes.policyPage,
    component: PolicyPage,
    children: [
      { path: config.policyRoutes.loyaltyProgram, component: LoyaltyProgram },
      { path: config.policyRoutes.preOrderPolicy, component: PreOrderPolicy },
      { path: config.policyRoutes.returnPolicy, component: ReturnPolicy },
    ],
  },
  {
    path: config.routes.newPost,
    component: NewPost,
    children: [
      { path: config.newPost.EYESmartcase, component: EYESmartcase },
      { path: config.newPost.kingrowK1, component: KingrowK1 },
      { path: config.newPost.smartEInkTablet, component: SmartEInkTablet },
      { path: config.newPost.narwalRobot, component: NarwalRobot },
      { path: config.newPost.rainShoeCover, component: RainShoeCover },
      { path: config.newPost.diceGlowFeature, component: DiceGlowFeature },
      { path: config.newPost.leatherCareTips, component: LeatherCareTips },
    ],
  },
];

export default routes;
