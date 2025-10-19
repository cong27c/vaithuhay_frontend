"use client";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Ticket,
  CreditCard,
  Star,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "../AdminLayout.module.scss";
import config from "@/config";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: config.adminRoutes.dashboard,
    },
    { label: "Users", icon: Users, path: config.adminRoutes.users },
    { label: "Products", icon: Package, path: config.adminRoutes.products },
    { label: "Orders", icon: ShoppingCart, path: config.adminRoutes.orders },
    { label: "Vouchers", icon: Ticket, path: config.adminRoutes.vouchers },
    { label: "Payments", icon: CreditCard, path: config.adminRoutes.payments },
    { label: "Reviews", icon: Star, path: config.adminRoutes.reviews },
    { label: "Analytics", icon: BarChart3, path: config.adminRoutes.analytics },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.sidebarHeader}>
        <h1 className={styles.logo}>Admin</h1>
        <button className={styles.toggleBtn} onClick={toggleSidebar}>
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className={styles.menu}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.menuItem} ${isActive(item.path) ? styles.active : ""}`}
            >
              <Icon size={20} className={styles.icon} />
              {isOpen && <span className={styles.label}>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
