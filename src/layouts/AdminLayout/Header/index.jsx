"use client";

import { useState } from "react";
import { Search, Bell, Moon, Sun, LogOut } from "lucide-react";
import styles from "../AdminLayout.module.scss";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

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
              <button className={styles.dropdownItem}>
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
