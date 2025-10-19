"use client";

import { useState } from "react";
import { Edit2, Trash2, Plus, Search } from "lucide-react";
import Card from "@/components/Admin/ui/Card";
import Button from "@/components/Admin/ui/Button";
import Input from "@/components/Admin/ui/Input";
import Modal from "@/components/Admin/ui/Modal";
import styles from "./Products.module.scss";

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: "$99.99",
      stock: 150,
      status: "In Stock",
    },
    {
      id: 2,
      name: "USB-C Cable",
      category: "Accessories",
      price: "$9.99",
      stock: 500,
      status: "In Stock",
    },
    {
      id: 3,
      name: "Phone Case",
      category: "Accessories",
      price: "$19.99",
      stock: 0,
      status: "Out of Stock",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const handleAddProduct = () => {
    if (formData.name && formData.price) {
      setProducts([
        ...products,
        {
          id: Date.now(),
          ...formData,
          status:
            Number.parseInt(formData.stock) > 0 ? "In Stock" : "Out of Stock",
        },
      ]);
      setFormData({ name: "", category: "", price: "", stock: "" });
      setIsModalOpen(false);
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={styles.productsPage}>
      <div className={styles.header}>
        <h1>Products Management</h1>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Add Product
        </Button>
      </div>

      <Card>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <span
                    className={`${styles.badge} ${styles[product.status.replace(" ", "").toLowerCase()]}`}
                  >
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleDeleteProduct(product.id)}
                      title="Delete"
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Product"
      >
        <div className={styles.form}>
          <Input
            label="Product Name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Category"
            placeholder="Enter category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
          <Input
            label="Price"
            placeholder="Enter price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <Input
            label="Stock"
            type="number"
            placeholder="Enter stock quantity"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
          />
        </div>
        <div className={styles.modalFooter}>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Products;
