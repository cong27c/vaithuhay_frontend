"use client";

import { useState } from "react";
import { Edit2, Trash2, Plus, Search } from "lucide-react";
import Card from "@/components/Admin/ui/Card";
import Button from "@/components/Admin/ui/Button";
import styles from "./Vouchers.module.scss";

const Vouchers = () => {
  const [vouchers] = useState([
    {
      id: 1,
      code: "SAVE10",
      discount: "10%",
      usage: "150/500",
      status: "Active",
    },
    {
      id: 2,
      code: "SUMMER20",
      discount: "20%",
      usage: "300/1000",
      status: "Active",
    },
    {
      id: 3,
      code: "EXPIRED",
      discount: "15%",
      usage: "500/500",
      status: "Expired",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVouchers = vouchers.filter((voucher) =>
    voucher.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={styles.vouchersPage}>
      <div className={styles.header}>
        <h1>Vouchers Management</h1>
        <Button variant="primary">
          <Plus size={18} /> Add Voucher
        </Button>
      </div>

      <Card>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search vouchers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Discount</th>
              <th>Usage</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVouchers.map((voucher) => (
              <tr key={voucher.id}>
                <td>{voucher.code}</td>
                <td>{voucher.discount}</td>
                <td>{voucher.usage}</td>
                <td>
                  <span
                    className={`${styles.badge} ${styles[voucher.status.toLowerCase()]}`}
                  >
                    {voucher.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} title="Edit">
                      <Edit2 size={16} />
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

export default Vouchers;
