const config = {
  routes: {
    home: "/",
    products: "/products",
    productDetail: "/products/:slug",
    notfound: "*",
    register: "/register",
    login: "/login",
    account: "/account",
  },
  accountRoutes: {
    loyalty: "/account",
    info: "/account/info/p/:username",
    orders: "/account/orders",
    wishlist: "/account/wishlist",
    addresses: "/account/addresses",
    coupons: "/account/coupons",
  },
  blogsRoutes: {
    setupDecor: "/blogs/setup-decor",
    technology: "/blogs/technology",
  },
  seeMoreRoutes: {
    introduce: "/seeMore/introduce",
    affiliate: "/seeMore/affiliate",
  },
};

export default config;
