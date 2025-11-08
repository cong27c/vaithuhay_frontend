import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuộn mượt mà lên đầu khi đổi route
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
}
