"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Edit2, Trash2, Plus, Search } from "lucide-react";

import Card from "@/components/Admin/ui/Card";
import Button from "@/components/Admin/ui/Button";
import Modal from "@/components/Admin/ui/Modal";
import styles from "./Users.module.scss";
import { userSchema } from "./userSchema";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/Services/userService";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [modalMode, setModalMode] = useState("create");
  const [loading, setLoading] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const defaultValues = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    avatar: "",
    status: "active",
    password: "",
    role: "customer", // 🟢 Thêm trường role với giá trị mặc định
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const formValues = watch();

  // 🟢 Load danh sách user
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      if (res.success) {
        setUsers(res.data);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      toast.error(error.message || "Lỗi khi tải danh sách user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🟢 Submit form
  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);

      // Nếu đang edit mà không tích "Đổi mật khẩu" => bỏ trường password
      if (modalMode === "edit" && !changePassword) {
        delete data.password;
      }

      const res =
        modalMode === "create"
          ? await createUser(data)
          : await updateUser(editingUser.id, data);

      if (res.success) {
        toast.success(
          modalMode === "create"
            ? "Tạo user thành công"
            : "Cập nhật user thành công",
        );
        handleCloseModal();
        fetchUsers();
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      toast.error(
        error.message ||
          `Lỗi khi ${modalMode === "create" ? "tạo" : "cập nhật"} user`,
      );
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Đóng modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    reset(defaultValues);
    setEditingUser(null);
    setModalMode("create");
    setChangePassword(false);
  }, [reset, defaultValues]);

  // 🟢 Mở modal thêm mới
  const openAddModal = useCallback(() => {
    setModalMode("create");
    reset(defaultValues);
    setIsModalOpen(true);
    setChangePassword(false);
  }, [reset, defaultValues]);

  // 🟢 Mở modal chỉnh sửa
  const openEditModal = useCallback(
    (user) => {
      setEditingUser(user);
      setModalMode("edit");
      reset();
      Object.keys(defaultValues).forEach((key) => {
        if (key !== "password") setValue(key, user[key] || defaultValues[key]);
      });
      setChangePassword(false);
      setIsModalOpen(true);
    },
    [reset, setValue, defaultValues],
  );

  // 🟢 Xóa user
  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
      setLoading(true);
      const res = await deleteUser(id);

      if (res.success) {
        toast.success("Xóa user thành công");
        fetchUsers();
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      toast.error(error.message || "Lỗi khi xóa user");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={styles.usersPage}>
      <div className={styles.header}>
        <h1>Users Management</h1>
        <Button variant="primary" onClick={openAddModal}>
          <Plus size={18} /> Add User
        </Button>
      </div>

      <Card>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Role</th> {/* 🟢 Thêm cột Role */}
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user.id}>
                <td>{`${user.first_name || ""} ${user.last_name || ""}`}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.phone || "-"}</td>
                <td>
                  <span className={styles.roleBadge}>
                    {user.role || "customer"}
                  </span>
                </td>
                <td>
                  <span
                    className={`${styles.badge} ${
                      styles[user.status?.toLowerCase()] || ""
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionBtn}
                      title="Edit"
                      onClick={() => openEditModal(user)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className={styles.actionBtn}
                      title="Delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* 🟢 Modal thêm / sửa */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalMode === "edit" ? "Edit User" : "Add New User"}
      >
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
          {/* --- Các trường thông tin cơ bản --- */}
          <div className={styles.formGroup}>
            <label className={styles.label}>First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
              className={`${styles.input} ${errors.first_name ? styles.errorInput : ""}`}
              {...register("first_name", userSchema.first_name)}
            />
            {errors.first_name && (
              <span className={styles.errorText}>
                {errors.first_name.message}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              className={styles.input}
              {...register("last_name")}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className={`${styles.input} ${errors.username ? styles.errorInput : ""}`}
              {...register("username", userSchema.username)}
            />
            {errors.username && (
              <span className={styles.errorText}>
                {errors.username.message}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className={`${styles.input} ${errors.email ? styles.errorInput : ""}`}
              {...register("email", userSchema.email)}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email.message}</span>
            )}
          </div>

          {/* 🟢 Mật khẩu */}
          {modalMode === "create" ? (
            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className={`${styles.input} ${errors.password ? styles.errorInput : ""}`}
                {...register("password", userSchema.password)}
              />
              {errors.password && (
                <span className={styles.errorText}>
                  {errors.password.message}
                </span>
              )}
            </div>
          ) : (
            <>
              <div className={styles.formGroupCheckbox}>
                <input
                  type="checkbox"
                  id="changePassword"
                  checked={changePassword}
                  onChange={(e) => setChangePassword(e.target.checked)}
                />
                <label htmlFor="changePassword">Đổi mật khẩu</label>
              </div>

              {changePassword && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className={`${styles.input} ${errors.password ? styles.errorInput : ""}`}
                    {...register("password", userSchema.password)}
                  />
                  {errors.password && (
                    <span className={styles.errorText}>
                      {errors.password.message}
                    </span>
                  )}
                </div>
              )}
            </>
          )}

          {/* --- Các trường khác --- */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone</label>
            <input
              type="text"
              placeholder="Enter phone"
              className={`${styles.input} ${errors.phone ? styles.errorInput : ""}`}
              {...register("phone", userSchema.phone)}
            />
            {errors.phone && (
              <span className={styles.errorText}>{errors.phone.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Avatar URL</label>
            <input
              type="text"
              placeholder="Enter avatar URL"
              className={styles.input}
              {...register("avatar")}
            />
          </div>

          {/* 🟢 Thêm trường Role */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Role</label>
            <select {...register("role")} className={styles.select}>
              <option value="customer">Khách hàng</option>
              <option value="staff">Nhân viên</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Status</label>
            <select {...register("status")} className={styles.select}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <div className={styles.modalFooter}>
            <Button
              variant="secondary"
              type="button"
              onClick={handleCloseModal}
              disabled={loading || isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={loading || isSubmitting}
            >
              {loading || isSubmitting
                ? "Loading..."
                : modalMode === "edit"
                  ? "Save Changes"
                  : "Add User"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Users;
