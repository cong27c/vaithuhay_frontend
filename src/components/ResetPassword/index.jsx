import styles from "./ResetPassword.module.scss";
import config from "@/config";
import useQuery from "@/Hooks/useQuery";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { resetPasswordSchema } from "@/schema/ressetPassword";
import { resetPassword } from "@/Services/authServices";
import { toast } from "react-toastify";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const query = useQuery();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (currentUser) {
      navigate(query.get("continue") || config.routes.home);
    }
  }, [currentUser, navigate, query]);

  const onSubmit = async (data) => {
    try {
      const res = await resetPassword({ ...data, token });
      if (res.status == 200) {
        toast.success("Khôi phục mật khẩu thành công!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Khôi phục mật khẩu thất bại!");
      console.log(error);
      setErrorMessage(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Quên mật khẩu</h1>
        <div className={styles.listInput}>
          <form
            action=""
            className="todoForm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles["input-container"]}>
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="Điền mật khẩu vào đây..."
                className={errors.password ? styles.error : ""}
              />
              {errors.password && (
                <p className={styles.errorMessage}>{errors.password.message}</p>
              )}
            </div>
            <div className={styles["input-container"]}>
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
                placeholder="Điền xác nhận mật khẩu vào đây..."
                className={errors.confirmPassword ? styles.error : ""}
              />
              {errors.confirmPassword && (
                <p className={styles.errorMessage}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className={styles.buttons}>
              <Button
                className={styles.btn}
                type="submit"
                disabled={isSubmitting}
                SubmitButton
              >
                Gửi
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
