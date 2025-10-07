import styles from "./Login.module.scss";
import config from "@/config";
import useQuery from "@/Hooks/useQuery";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import InputText from "@/components/InputText";
import loginSchema from "@/schema/loginSchema ";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, loginUser } from "@/features/auth/authAsync";

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
      const res = await dispatch(loginUser(data)).unwrap();
      if (res?.access_token) {
        await dispatch(getCurrentUser()).unwrap();
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>Vaithuhay</div>
        <h1 className={styles.title}>Chào mừng trở lại</h1>
        <p className={styles.subtitle}>
          Đăng nhập để tiếp tục sử dụng dịch vụ của chúng tôi
        </p>
      </div>
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
