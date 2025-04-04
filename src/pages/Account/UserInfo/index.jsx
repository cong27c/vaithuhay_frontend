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
import { useLoading } from "~/contexts/LoadingContext ";

function UserInfo() {
  const { username: mainUserName } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const userIn4 = useAuth();
  const userId = userIn4.user?.id;
  const isCurrentUser = userIn4.user?.username === mainUserName;
  const [preview, setPreview] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const { loading, setLoading } = useLoading();

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
    setLoading(true);
    const fetchUserData = async () => {
      try {
        const userData = await authServices.getUser(mainUserName);
        reset(userData);
        console.log(userData);
        if (userData.image) {
          setOriginalImage(userData.image);
          setPreview(userData.image);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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
    console.log(data);
    if (data?.birthDate) {
      const date = new Date(data.birthDate);
      data.birthDate = date.toISOString().split("T")[0];
    }

    const formData = new FormData();

    if (fileImage) {
      data.image = fileImage;
    }

    const filterData = Object.entries(data).filter(
      ([_, value]) => value !== "" && value !== null
    );
    for (const [field, value] of filterData) {
      formData.append(field, value);
    }
    console.log(formData);

    try {
      if (fileImage) {
        await authServices.updateImage(userId, formData);
      }
      await authServices.updateUser(mainUserName, formData);
      toast.success("Cập nhật thành công!", { autoClose: 3000 });
      reset(data);
      setOriginalImage(fileImage);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật thất bại! Vui lòng thử lại.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFileImage(file);
      setPreview(previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleCancel = () => {
    setIsEditing(false);
    setPreview(originalImage);
    setFileImage(null);
    reset();
  };

  return (
    <div className={styles.UserInfo}>
      <form className={styles.todoForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["form-group"]}>
          {/* Image */}
          <img
            className={styles.imageFile}
            src={preview || originalImage}
            alt=""
          />
          <input
            type="file"
            accept="image/*"
            disabled={!isEditing}
            onChange={handleImageChange}
          />
        </div>

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
                onClick={handleCancel}
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
