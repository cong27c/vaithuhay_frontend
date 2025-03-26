import styles from "./Logout.module.scss";
import config from "~/config";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("https://api01.f8team.dev/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.removeItem("token");
        navigate(config.routes.home);
      })
      .catch((error) => console.error("Lỗi khi đăng xuất:", error));
  };

  return (
    <button className={styles.btn} onClick={handleLogout}>
      Log out
    </button>
  );
}

export default Logout;
