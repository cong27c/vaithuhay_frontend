import styles from "./Logout.module.scss";
import config from "~/config";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { logoutUser } from "~/Services/authServices";

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
        <button className={styles.btn} onClick={handleLogout}>
          Log out
          <FontAwesomeIcon
            className={styles.icon}
            icon={["fas", "right-from-bracket"]}
          />
        </button>
      ) : (
        <Link to={config.routes.login}>
          <button className={styles.btn} onClick={handleLogout}>
            Log in
            <FontAwesomeIcon
              className={styles.icon}
              icon={["fas", "right-from-bracket"]}
            />
          </button>
        </Link>
      )}
    </div>
  );
}

export default Logout;
