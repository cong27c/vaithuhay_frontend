"use client";

import { useState } from "react";
import { Eye, Search } from "lucide-react";
import Card from "@/components/Admin/ui/Card";
import styles from "./Payments.module.scss";

const Payments = () => {
  const [payments] = useState([
    {
      id: "PAY001",
      orderId: "ORD001",
      amount: "$299.99",
      method: "Credit Card",
      status: "Completed",
      date: "2024-01-15",
    },
    {
      id: "PAY002",
      orderId: "ORD002",
      amount: "$149.99",
      method: "PayPal",
      status: "Pending",
      date: "2024-01-16",
    },
    {
      id: "PAY003",
      orderId: "ORD003",
      amount: "$499.99",
      method: "Bank Transfer",
      status: "Completed",
      date: "2024-01-17",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPayments = payments.filter(
    (payment) =>
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={styles.paymentsPage}>
      <div className={styles.header}>
        <h1>Payments Management</h1>
      </div>

      <Card>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Order ID</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.orderId}</td>
                <td>{payment.amount}</td>
                <td>{payment.method}</td>
                <td>
                  <span
                    className={`${styles.badge} ${styles[payment.status.toLowerCase()]}`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td>{payment.date}</td>
                <td>
                  <button className={styles.actionBtn} title="View">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Payments;
