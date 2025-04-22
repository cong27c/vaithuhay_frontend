import styles from "./Login.module.scss";
import config from "~/config";
import useQuery from "~/Hooks/useQuery";
import { useNavigate } from "react-router-dom";
import authServices, { postUser } from "~/Services/authServices";
import Button from "~/components/Button";
import { useForm } from "react-hook-form";
import InputText from "~/components/InputText";
import loginSchema from "~/schema/loginSchema ";
import { yupResolver } from "@hookform/resolvers/yup";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "~/features/auth/authAsync";
import { loginSuccess } from "~/features/auth/authSlice";
import { useCurrentUser } from "~/Hooks/useCurrentUser";

function Login() {
  const query = useQuery();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (currentUser) {
      navigate(query.get("continue") || config.routes.home);
    }
  }, [currentUser, navigate, query]);

  const onSubmit = async (data) => {
    try {
      const res = await postUser("/auth/login", data);
      localStorage.setItem("token", res.access_token);

      const userResponse = await authServices.getCurrentUser();

      dispatch(loginSuccess(userResponse));
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Đăng nhập</h1>
        <div className={styles.listInput}>
          <form
            action=""
            className="todoForm"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* <input type="email" name="email" placeholder="Email..." />
            <input type="password" name="password" placeholder="Mật Khẩu..." /> */}
            <div className={styles["input-container"]}>
              <label htmlFor="email">Email</label>
              <InputText
                type="email"
                register={register}
                message={errors.email?.message}
                placeholder="Điền email vào đây..."
              />
            </div>

            <div className={styles["input-container"]}>
              <label htmlFor="password">Password</label>
              <InputText
                type="password"
                register={register}
                message={errors.password?.message}
                placeholder="Điền password vào đây..."
              />
            </div>
            {errorMessage && (
              <span className={styles["error-message"]}>
                Thông tin đăng nhập ko chính xác
              </span>
            )}

            <div className={styles.buttons}>
              <Button
                className={styles.btn}
                type="submit"
                disabled={isSubmitting}
                SubmitButton
              >
                Đăng nhập
              </Button>
              <Button
                className={styles.btn}
                to={config.routes.register}
                SubmitButton
              >
                Đăng ký
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
