"use client";

import { useState } from "react";
import { Trash2, Search, Star } from "lucide-react";
import Card from "@/components/Admin/ui/Card";
import styles from "./Reviews.module.scss";

const Reviews = () => {
  const [reviews] = useState([
    {
      id: 1,
      product: "Wireless Headphones",
      author: "John Doe",
      rating: 5,
      comment: "Excellent product!",
      status: "Approved",
    },
    {
      id: 2,
      product: "USB-C Cable",
      author: "Jane Smith",
      rating: 4,
      comment: "Good quality",
      status: "Approved",
    },
    {
      id: 3,
      product: "Phone Case",
      author: "Bob Johnson",
      rating: 3,
      comment: "Average",
      status: "Pending",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReviews = reviews.filter(
    (review) =>
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.author.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={styles.reviewsPage}>
      <div className={styles.header}>
        <h1>Reviews Management</h1>
      </div>

      <Card>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Author</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews?.map((review) => (
              <tr key={review.id}>
                <td>{review.product}</td>
                <td>{review.author}</td>
                <td>
                  <div className={styles.rating}>
                    {[...Array(review.rating)]?.map((_, i) => (
                      <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                    ))}
                  </div>
                </td>
                <td>{review.comment}</td>
                <td>
                  <span
                    className={`${styles.badge} ${styles[review.status.toLowerCase()]}`}
                  >
                    {review.status}
                  </span>
                </td>
                <td>
                  <button className={styles.actionBtn} title="Delete">
                    <Trash2 size={16} />
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

export default Reviews;
