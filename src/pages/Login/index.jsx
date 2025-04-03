import styles from "./Login.module.scss";
import config from "~/config";
import useQuery from "~/Hooks/useQuery";
import { useNavigate } from "react-router-dom";
import { postUser } from "~/Services/authServices";
import Button from "~/components/Button";
import { useForm } from "react-hook-form";
import InputText from "~/components/InputText";
import loginSchema from "~/schema/loginSchema ";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

function Login() {
  const query = useQuery();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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

  const onSubmit = async (data) => {
    try {
      const res = await postUser("/auth/login", data);
      localStorage.setItem("token", res.access_token);
      navigate(query.get("continue") || config.routes.home);
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
