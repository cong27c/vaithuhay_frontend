import styles from "./Logout.module.scss";
import config from "~/config";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logoutUser } from "~/Services/authServices";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";

function Logout() {
  const navigate = useNavigate();
  const [hasToken, setHasToken] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => setHasToken(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      setHasToken(false);
      if (window.location.pathname !== config.routes.login) {
        navigate(config.routes.home);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      {hasToken ? (
        <Button
          draculaButton
          size="large"
          icon={faPaperPlane}
          onClick={handleLogout}
        >
          Đăng xuất
        </Button>
      ) : (
        <Button
          to={config.routes.login}
          draculaButton
          size="large"
          icon={faPaperPlane}
        >
          Đăng nhập
        </Button>
      )}
    </div>
  );
}

export default Logout;
