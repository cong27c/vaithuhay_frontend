"use client";

import { useState } from "react";
import { Eye, Trash2, Search } from "lucide-react";
import Card from "@/components/Admin/ui/Card";
import styles from "./Orders.module.scss";

const Orders = () => {
  const [orders] = useState([
    {
      id: "ORD001",
      customer: "John Doe",
      amount: "$299.99",
      status: "Completed",
      date: "2024-01-15",
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      amount: "$149.99",
      status: "Pending",
      date: "2024-01-16",
    },
    {
      id: "ORD003",
      customer: "Bob Johnson",
      amount: "$499.99",
      status: "Shipped",
      date: "2024-01-17",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={styles.ordersPage}>
      <div className={styles.header}>
        <h1>Orders Management</h1>
      </div>

      <Card>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders?.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.amount}</td>
                <td>
                  <span
                    className={`${styles.badge} ${styles[order.status.toLowerCase()]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} title="View">
                      <Eye size={16} />
                    </button>
                    <button className={styles.actionBtn} title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Orders;
