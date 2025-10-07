import { useNavigate } from "react-router-dom";
import config from "@/config";

const useCustomNavigate = () => {
  const navigate = useNavigate();

  return {
    goHome: () => navigate(config.routes.home),
    goToLogin: () => navigate(config.routes.login),
    goToRegister: () => navigate(config.routes.register),
    goToAccount: () => navigate(config.routes.account),
    goToOrders: () => navigate(`${config.routes.account}?view=order`),
    goToProductDetail: (slug) => navigate(`/products/${slug}`),
  };
};

export default useCustomNavigate;
