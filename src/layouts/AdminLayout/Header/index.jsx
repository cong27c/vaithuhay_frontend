"use client";

import { useState } from "react";
import { Search, Bell, Moon, Sun, LogOut } from "lucide-react";
import styles from "../AdminLayout.module.scss";
import { logoutAdmin } from "@/Services/adminAuthService";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const logout = async () => {
    try {
      // Gọi API logout
      const response = await logoutAdmin();

      // QUAN TRỌNG: Xóa access token khỏi localStorage/sessionStorage
      localStorage.removeItem("admin_access_token");
      // Hoặc nếu dùng sessionStorage:
      // sessionStorage.removeItem("admin_access_token");

      // Xóa token khỏi cookies (nếu có)
      document.cookie =
        "admin_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Redirect về trang login
      window.location.href = "/admin/login";

      return response.data;
    } catch (error) {
      console.error("Logout failed:", error);
      // Vẫn xóa token ngay cả khi API call thất bại
      localStorage.removeItem("admin_access_token");
      window.location.href = "/admin/login";
    }
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.headerRight}>
        <button
          className={styles.iconBtn}
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={20} />
          <span className={styles.badge}>3</span>
        </button>

        <button
          className={styles.iconBtn}
          onClick={toggleDarkMode}
          title={isDarkMode ? "Light Mode" : "Dark Mode"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className={styles.userMenu}>
          <button
            className={styles.avatar}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <img src="/admin-avatar.png" alt="Admin" />
          </button>

          {showUserMenu && (
            <div className={styles.dropdown}>
              <a href="#profile" className={styles.dropdownItem}>
                Profile
              </a>
              <a href="#settings" className={styles.dropdownItem}>
                Settings
              </a>
              <hr className={styles.divider} />
              <button className={styles.dropdownItem} onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
