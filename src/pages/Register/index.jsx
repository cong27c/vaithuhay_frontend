import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import { useState } from "react";
import Loading from "~/layouts/DefaultLayout/components/Loading";
import config from "~/config";

function Register() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const setFormValue = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const splitFullName = (fullName) => {
    const parts = fullName.trim().split(" ");
    return {
      firstName: parts.pop(),
      lastName: parts.join(" "),
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { firstName, lastName } = splitFullName(formValues.fullName);

    fetch("https://api01.f8team.dev/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email: formValues.email,
        password: formValues.password,
        password_confirmation: formValues.password_confirmation,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.errors) {
          const newErrors = {};
          Object.entries(data.errors).forEach(([fieldName, [message]]) => {
            newErrors[fieldName] = message;
          });
          if (newErrors.email && newErrors.email.includes("takens")) {
            newErrors.email =
              " Email này đã được sử dụng. Vui lòng sử dụng email khác.";
          }

          setErrors(newErrors);
        } else {
          localStorage.setItem("token", data.access_token);
          navigate(config.routes.home);
        }
      })
      .catch((error) => console.error("Lỗi khi gửi dữ liệu:", error))
      .finally(() => setIsLoading(false));
  };

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
            <input type="radio" name="withEmail" />
            <label htmlFor="withEmail">Đăng ký bằng email</label>
          </div>
          <div>
            <input type="radio" name="withNumber" />
            <label htmlFor="withNumber">Đăng ký bằng số điện thoại</label>
          </div>
        </div>
        <div className={styles.listInput}>
          <form action="" className="todoForm" onSubmit={handleSubmit}>
            <div className={styles["input-container"]}>
              <label htmlFor="fullName">Họ và Tên</label>
              <input
                type="text"
                value={formValues.firstName}
                onChange={setFormValue}
                name="fullName"
              />
              {errors.fullName && (
                <p className="error-message">{errors.fullName}</p>
              )}
            </div>

            {/* <div className={styles["input-container"]}>
              <label htmlFor="number">Số điện thoại</label>
              <input
                type="text"
                value={formValues.number}
                onChange={setFormValue}
                name="number"
              />
            </div> */}
            <div className={styles["input-container"]}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                value={formValues.email}
                onChange={setFormValue}
                name="email"
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className={styles["input-container"]}>
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                value={formValues.password}
                onChange={setFormValue}
                name="password"
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>
            <div className={styles["input-container"]}>
              <label htmlFor="password_confirmation">Xác nhận mật khẩu</label>
              <input
                type="password"
                value={formValues.password_confirmation}
                onChange={setFormValue}
                name="password_confirmation"
              />
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>
            <div className={styles.buttons}>
              <button className={styles.btn}>ĐĂNG KÝ</button>
              <Link to={config.routes.login}>
                <button className={styles.btn}>TRỞ VỀ</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
