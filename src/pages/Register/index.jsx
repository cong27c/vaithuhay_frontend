// import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
// import { useState } from "react";
// import Loading from "~/layouts/DefaultLayout/components/Loading";
import config from "~/config";
// import { postUser } from "~/Services/authServices";
import Button from "~/components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "~/schema/registerSchema";
import * as yup from "yup";
import { useEffect, useState } from "react";
import InputText from "~/components/InputText";
import Loading from "~/layouts/DefaultLayout/components/Loading";
import { useNavigate } from "react-router-dom";
import authServices from "~/Services/authServices";
import useDebounce from "~/Hooks/useDebounce";

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [registerType, setRegisterType] = useState("email");

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(registerSchema),
    context: { registerType },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log(data);
    try {
      const payLoad = {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        password_confirmation: data.password_confirmation,
        [registerType]: registerType === "email" ? data.email : data.phone,
      };

      const res = await authServices.postUser("/auth/register", payLoad);
      console.log(res);
      localStorage.setItem("token", res.access_token);
      navigate(config.routes.home);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const emailValue = watch("email");
  const debouncedEmail = useDebounce(emailValue, 800);

  useEffect(() => {
    if (!debouncedEmail || registerType !== "email") return;

    const checkEmailExists = async () => {
      const isValid = await trigger("email");
      if (isValid) {
        try {
          const exists = await authServices.checkEmail(debouncedEmail);
          console.log(exists);
          if (exists) {
            setError("email", {
              type: "manual",
              message: "Email này đã tồn tại",
            });
          } else {
            clearErrors("email");
          }
        } catch (error) {
          console.error("Email check error:", error);
        }
      }
    };

    checkEmailExists();
  }, [debouncedEmail, trigger, setError, registerType, clearErrors]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Đăng ký tài khoản</h1>
        <p className={styles.desc}>
          Khách hàng đã mua hàng tại Vài Thứ Hay nên sử dụng Email/SĐT cũ để
          tham gia các chương trình tích điểm hấp dẫn
        </p>
        <div className={styles.checkList}>
          <div>
            <input
              type="radio"
              name="email"
              checked={registerType === "email"}
              onChange={() => setRegisterType("email")}
            />
            <label htmlFor="withEmail">Đăng ký bằng email</label>
          </div>
          <div>
            <input
              type="radio"
              name="phone"
              checked={registerType === "phone"}
              onChange={() => setRegisterType("phone")}
            />
            <label htmlFor="withNumber">Đăng ký bằng số điện thoại</label>
          </div>
        </div>
        <div className={styles.listInput}>
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="todoForm"
          >
            <div className={styles["input-container"]}>
              <label htmlFor="lastName">Họ</label>
              <InputText
                type="lastName"
                register={register}
                message={errors.lastName?.message}
              />
            </div>
            <div className={styles["input-container"]}>
              <label htmlFor="firstName">Tên</label>
              <InputText
                type="firstName"
                register={register}
                message={errors.firstName?.message}
              />
            </div>

            {registerType === "email" ? (
              <div className={styles["input-container"]}>
                <label htmlFor="email">Email</label>
                <InputText
                  type="email"
                  register={register}
                  message={errors.email?.message}
                />
              </div>
            ) : (
              <div className={styles["input-container"]}>
                <label htmlFor="phone">Số điện thoại</label>
                <InputText
                  type="phone"
                  register={register}
                  message={errors.phone?.message}
                />
              </div>
            )}

            <div className={styles["input-container"]}>
              <label htmlFor="password">Mật khẩu</label>
              <InputText
                type="password"
                register={register}
                message={errors.password?.message}
              />
            </div>
            <div className={styles["input-container"]}>
              <label htmlFor="password_confirmation">Xác nhận mật khẩu</label>
              <InputText
                type="password_confirmation"
                register={register}
                message={errors.password_confirmation?.message}
              />
            </div>
            <div className={styles.buttons}>
              <Button className={styles.btn} type="submit" SubmitButton>
                ĐĂNG KÝ
              </Button>
              <Button
                className={styles.btn}
                to={config.routes.login}
                SubmitButton
              >
                TRỞ VỀ
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
