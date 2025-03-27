import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import config from "~/config";
import { useState } from "react";
import useQuery from "~/Hooks/useQuery";
import { useNavigate } from "react-router-dom";
import { postUser } from "~/Services/authServices";
import Button from "~/components/Button";
import { faPaperPlane, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const query = useQuery();
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const setFormValue = (e) => {
    setHasError(false);
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await postUser("/auth/login", formValues);
      localStorage.setItem("token", data.access_token);
      navigate(query.get("continue") || config.routes.home);
    } catch {
      setHasError(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Button
        to={config.routes.home}
        size="large"
        arrowButton
        icon={faArrowRight}
      >
        KHÁM PHÁ NGAY
      </Button>

      <Button draculaButton size="large" icon={faSignOutAlt}>
        Đăng xuất
      </Button>
      <Button tabButton>Sản phẩm mới nhất</Button>
      {/*<Button />
      <Button /> */}
      <div className={styles.container}>
        <h1 className={styles.title}>Đăng nhập</h1>
        <div className={styles.listInput}>
          <form action="" className="todoForm" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={setFormValue}
              placeholder="Email..."
            />
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={setFormValue}
              placeholder="Mật Khẩu..."
            />

            <div className={styles.buttons}>
              <button className={styles.btn}>Đăng nhập</button>
              <Link to={config.routes.register}>
                <button className={styles.btn}>Đăng ký</button>
              </Link>
            </div>
            {hasError && <p>Email hoặc mật khẩu không hợp lệ.</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
