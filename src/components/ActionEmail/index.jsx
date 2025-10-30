import styles from "./ActionEmail.module.scss";
import config from "@/config";
import useQuery from "@/Hooks/useQuery";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import InputText from "@/components/InputText";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { verifyEmail } from "@/Services/authServices";
import { forgotSchema } from "@/schema/forgotPassword";
import { toast } from "react-toastify";

function ActionEmail() {
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
      email: "",
    },
    resolver: yupResolver(forgotSchema),
  });

  useEffect(() => {
    if (currentUser) {
      navigate(query.get("continue") || config.routes.home);
    }
  }, [currentUser, navigate, query]);

  const onSubmit = async (data) => {
    try {
      const res = await verifyEmail(data);
      if (res?.data?.message) {
        toast.success(res?.data?.message || `Vui lòng check mail để xác thực`);
      }
      console.log("verifyEmail", res);
    } catch (error) {
      toast.error("Xác thực thất bại");

      console.log(error);
      setErrorMessage(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>XÁC THỰC EMAIL</h1>
        <div className={styles.listInput}>
          <form
            action=""
            className="todoForm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles["input-container"]}>
              <label htmlFor="email">Email</label>
              <InputText
                type="email"
                register={register}
                message={errors.email?.message}
                placeholder="Điền email vào đây..."
              />
            </div>
            {errorMessage && (
              <span className={styles["error-message"]}>Email ko tồn tại</span>
            )}

            <div className={styles.buttons}>
              <Button
                className={styles.btn}
                type="submit"
                disabled={isSubmitting}
                SubmitButton
              >
                XÁC THỰC{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ActionEmail;
