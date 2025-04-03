import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import styles from "./UserInfo.module.scss";
import authServices from "~/Services/authServices";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import InputText from "~/components/InputText";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import { useAuth } from "~/contexts/AuthContext";
import useDebounce from "~/Hooks/useDebounce";
import { userInfoSchema } from "~/schema/userInfoSchema ";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function UserInfo() {
  const navigate = useNavigate();
  const { username: mainUserName } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const userIn4 = useAuth();
  const userId = userIn4.user?.id;
  const isCurrentUser = userIn4.user?.username === mainUserName;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userInfoSchema),
  });

  useEffect(() => {
    if (!mainUserName) return;
    const fetchUserData = async () => {
      try {
        const userData = await authServices.getUser(mainUserName);
        reset(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [mainUserName]);

  const debounceValues = {
    email: useDebounce(watch("email"), 800),
    phone: useDebounce(watch("phone"), 800),
    username: useDebounce(watch("username"), 800),
  };

  useEffect(() => {
    if (!isEditing) return;

    const checkDuplicates = async () => {
      for (const [field, value] of Object.entries(debounceValues)) {
        if (!value) continue;
        const isValid = await trigger(field);
        if (!isValid) continue;

        let endpoint = `/auth/check-${field}?${field}=${value}`;
        if (userId) endpoint += `&exclude_id=${userId}`;

        try {
          const exists = await authServices.checkDuplicate(endpoint);

          if (exists) {
            setError(field, {
              type: "manual",
              message: `${field} này đã tồn tại`,
            });
          } else {
            clearErrors(field);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    console.log("Checking duplicate for:", debounceValues.email);
    checkDuplicates();
  }, [
    debounceValues.email,
    debounceValues.phone,
    debounceValues.username,
    userId,
    setError,
    clearErrors,
    trigger,
    isEditing,
  ]);

  const onSubmit = async (data) => {
    if (data?.birthDate) {
      const date = new Date(data.birthDate);
      data.birthDate = date.toISOString().split("T")[0];
    }

    const filterData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== "" && value !== null
      )
    );

    console.log(filterData.id, filterData.username);
    try {
      await authServices.updateUser(mainUserName, filterData);
      toast.success("Cập nhật thành công!", { autoClose: 3000 });
      setIsEditing(false);
      reset(data);
      setTimeout(() => {
        navigate(`/account/info/p/${mainUserName}`);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <div className={styles.UserInfo}>
      <form className={styles.todoForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["form-group"]}>
          {/* Họ và tên */}
          <label htmlFor="username">Họ và tên</label>
          <InputText
            type="username"
            register={register}
            message={errors.username?.message}
            disabled={!isEditing}
            placeholder="Nhập họ và tên..."
          />
          {!watch("username") && (
            <span className={styles["error-message"]}>Chưa cập nhật</span>
          )}
        </div>
        {/* Giới tính  */}
        <div className={styles["form-group"]}>
          <label>Giới tính</label>
          <div className={styles["radio-group"]}>
            {["male", "female", "other"].map((gender) => (
              <div key={gender}>
                <input
                  type="radio"
                  id={gender}
                  value={gender}
                  {...register("gender")}
                  checked={watch("gender") === gender}
                  disabled={!isEditing}
                />
                <label htmlFor={gender}>
                  {gender === "male"
                    ? "Nam"
                    : gender === "female"
                    ? "Nữ"
                    : "Khác"}
                </label>
              </div>
            ))}
          </div>
          {!watch("gender") && (
            <span className={styles["error-message"]}>Chưa cập nhật</span>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label>Địa chỉ</label>
          <button className={styles["address-btn"]}>
            Xem & điều chỉnh địa chỉ của bạn
          </button>
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="email">Email</label>
          <InputText
            type="email"
            register={register}
            message={errors.email?.message}
            disabled={!isEditing}
            placeholder="Nhập email..."
          />
          <div className={styles["verification-status"]}>
            {watch("emailVerifiedAt")
              ? "Tài khoản đã được xác minh"
              : "Tài khoản chưa xác minh"}
          </div>
          {!watch("email") && (
            <span className={styles["error-message"]}>Chưa cập nhật</span>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="phone">Số điện thoại</label>

          <InputText
            type="phone"
            register={register}
            message={errors.phone?.message}
            disabled={!isEditing}
            placeholder="Nhập sđt..."
          />
          {!watch("phone") && (
            <span className={styles["error-message"]}>Chưa cập nhật</span>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="birthDate">Ngày sinh</label>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                id="birthDate"
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Chọn ngày sinh..."
                className={styles.datePicker}
                maxDate={new Date()}
                showYearDropdown
                disabled={!isEditing}
                dropdownMode="select"
              />
            )}
          />
          {errors.birthDate && (
            <span className={styles["error-message"]}>
              {errors.birthDate.message}
            </span>
          )}
          {!watch("birthDate") && (
            <span className={styles["error-message"]}>Chưa cập nhật</span>
          )}
        </div>

        {isCurrentUser &&
          (isEditing ? (
            <>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles["submit-btn"]}
              >
                CẬP NHẬT
              </button>
              <button
                type="button"
                className={styles["submit-btn"]}
                onClick={() => {
                  setIsEditing(false);
                  reset(); // Reset form về dữ liệu ban đầu nếu hủy
                }}
              >
                HỦY
              </button>
            </>
          ) : (
            <button
              className={styles["submit-btn"]}
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Chỉnh sửa
            </button>
          ))}
      </form>
    </div>
  );
}

export default UserInfo;
