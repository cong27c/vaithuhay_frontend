"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/Admin/ui/Button";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import VariantManagement from "./VariantManagement";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  transformProductForDisplay,
} from "@/services/productAdminService";
import {
  uploadMainProductImage,
  uploadSubProductImage,
  deleteProductImage,
  deleteAllProductImages,
} from "@/services/productImageService";
import styles from "./Products.module.scss";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState({});
  const [productImages, setProductImages] = useState({});
  const [tempImageFiles, setTempImageFiles] = useState({
    main: null,
    sub: [],
  });

  // Thêm state để lưu trữ URLs tạm thời
  const [tempImageUrls, setTempImageUrls] = useState({
    main: null,
    sub: [],
  });

  // Fetch products từ API
  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  // Clean up URLs khi component unmount
  useEffect(() => {
    return () => {
      if (tempImageUrls.main) {
        URL.revokeObjectURL(tempImageUrls.main);
      }
      tempImageUrls.sub.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts({
        page: 1,
        limit: 50,
        search: searchTerm || undefined,
      });

      const transformedProducts = response.products.map(
        transformProductForDisplay,
      );
      setProducts(transformedProducts);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetProductForm = useCallback(() => {
    setEditingProduct(null);

    // Clean up URLs
    if (tempImageUrls.main) {
      URL.revokeObjectURL(tempImageUrls.main);
    }
    tempImageUrls.sub.forEach((url) => URL.revokeObjectURL(url));

    // Reset states
    setTempImageFiles({ main: null, sub: [] });
    setTempImageUrls({ main: null, sub: [] });
  }, [tempImageUrls]);

  // 🖼️ Xử lý upload ảnh
  const handleMainImageUpload = async (productId, file) => {
    if (!file) return;
    setUploadingImages((prev) => ({ ...prev, main: true }));
    try {
      const response = await uploadMainProductImage(productId, file);
      setProductImages((prev) => ({
        ...prev,
        [productId]: {
          main: response,
          sub: prev[productId]?.sub || [],
        },
      }));
      return response;
    } catch (error) {
      console.error("Lỗi upload ảnh chính:", error);
      throw error;
    } finally {
      setUploadingImages((prev) => ({ ...prev, main: false }));
    }
  };

  const handleSubImageUpload = async (productId, file) => {
    if (!file) return;
    setUploadingImages((prev) => ({ ...prev, sub: true }));
    try {
      const response = await uploadSubProductImage(productId, file);
      setProductImages((prev) => ({
        ...prev,
        [productId]: {
          main: prev[productId]?.main || null,
          sub: [...(prev[productId]?.sub || []), response],
        },
      }));
      return response;
    } catch (error) {
      console.error("Lỗi upload ảnh phụ:", error);
      throw error;
    } finally {
      setUploadingImages((prev) => ({ ...prev, sub: false }));
    }
  };

  // 🗑️ Xử lý xóa ảnh
  const handleDeleteImage = async (
    productId,
    imageId,
    imageType,
    imageIndex = null,
  ) => {
    if (!confirm("Bạn có chắc chắn muốn xóa ảnh này?")) return;
    try {
      await deleteProductImage(productId, imageId);
      if (imageType === "main") {
        setProductImages((prev) => ({
          ...prev,
          [productId]: { ...prev[productId], main: null },
        }));
      } else if (imageType === "sub" && imageIndex !== null) {
        setProductImages((prev) => ({
          ...prev,
          [productId]: {
            ...prev[productId],
            sub:
              prev[productId]?.sub?.filter((img) => img.id !== imageId) || [],
          },
        }));
      }
      alert("Xóa ảnh thành công");
    } catch (error) {
      console.error("Lỗi xóa ảnh:", error);
      alert("Xóa ảnh thất bại");
    }
  };

  const handleDeleteAllImages = async (productId) => {
    if (!confirm("Bạn có chắc chắn muốn xóa tất cả ảnh của sản phẩm này?"))
      return;
    try {
      await deleteAllProductImages(productId);
      setProductImages((prev) => ({
        ...prev,
        [productId]: { main: null, sub: [] },
      }));
      alert("Xóa tất cả ảnh thành công");
    } catch (error) {
      console.error("Lỗi xóa ảnh:", error);
      alert("Xóa ảnh thất bại");
    }
  };

  // 📤 Xử lý file input change - ĐÃ SỬA
  const handleFileChange = (type, event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file ảnh");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước file không được vượt quá 5MB");
        return false;
      }
      return true;
    });

    if (!validFiles.length) return;

    if (type === "main") {
      const file = validFiles[0]; // vẫn chỉ lấy 1 file chính
      const previewUrl = URL.createObjectURL(file);
      setTempImageFiles((prev) => ({ ...prev, main: file }));
      setTempImageUrls((prev) => ({ ...prev, main: previewUrl }));
    } else {
      // nhiều ảnh phụ
      const previewUrls = validFiles.map((file) => URL.createObjectURL(file));
      setTempImageFiles((prev) => ({
        ...prev,
        sub: [...prev.sub, ...validFiles],
      }));
      setTempImageUrls((prev) => ({
        ...prev,
        sub: [...prev.sub, ...previewUrls],
      }));
    }

    event.target.value = ""; // reset input để có thể upload lại file giống nhau
  };

  // 📝 Xử lý form
  const handleFormSubmit = async (formData) => {
    setSubmitting(true);
    try {
      if (editingProduct) {
        await handleUpdateProduct(formData);
      } else {
        await handleCreateProduct(formData);
      }
    } catch (error) {
      console.error("Lỗi khi gửi sản phẩm:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateProduct = async (formData) => {
    try {
      const productData = {
        ...formData,
        main_image: "",
        sub_images: [],
      };

      const newProduct = await createProduct(productData);

      // Upload ảnh sau khi tạo sản phẩm
      if (tempImageFiles.main) {
        await handleMainImageUpload(newProduct.id, tempImageFiles.main);
      }

      if (tempImageFiles.sub.length > 0) {
        for (const file of tempImageFiles.sub) {
          await handleSubImageUpload(newProduct.id, file);
        }
      }

      await fetchProducts();
      setIsProductModalOpen(false);
      resetProductForm();
      alert("Tạo sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
      alert("Lỗi khi tạo sản phẩm");
    }
  };

  const handleUpdateProduct = async (formData) => {
    try {
      const updatedProduct = await updateProduct(editingProduct.id, formData);
      const transformedProduct = transformProductForDisplay(updatedProduct);

      setProducts(
        products.map((product) =>
          product.id === editingProduct.id ? transformedProduct : product,
        ),
      );

      setIsProductModalOpen(false);
      resetProductForm();
      alert("Cập nhật sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      alert("Lỗi khi cập nhật sản phẩm");
    }
  };

  // 🎯 Các hàm xử lý sự kiện
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      alert("Xóa sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Lỗi khi xóa sản phẩm");
    }
  };

  const openVariantModal = (product) => {
    setSelectedProduct(product);
    setIsVariantModalOpen(true);
  };

  const handleVariantUpdate = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
  };

  // 🧮 Utility functions
  const formatVND = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const calculateProductFinalPrice = (product) => {
    let price = product.price;
    if (product.discount) {
      price = price * (1 - product.discount / 100);
    }
    return price;
  };

  return (
    <div className={styles.productsPage}>
      <div className={styles.header}>
        <h1>Quản lý Sản phẩm</h1>
        <Button
          variant="primary"
          onClick={() => {
            resetProductForm();
            setIsProductModalOpen(true);
          }}
        >
          <Plus size={18} /> Thêm sản phẩm
        </Button>
      </div>

      <ProductList
        products={products}
        loading={loading}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        onOpenVariantModal={openVariantModal}
        formatVND={formatVND}
        calculateProductFinalPrice={calculateProductFinalPrice}
      />

      <ProductForm
        editingProduct={editingProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          resetProductForm();
        }}
        onSubmit={handleFormSubmit}
        submitting={submitting}
        productImages={productImages}
        uploadingImages={uploadingImages}
        tempImageFiles={tempImageFiles}
        tempImageUrls={tempImageUrls}
        onFileChange={handleFileChange}
        onDeleteImage={handleDeleteImage}
        onDeleteAllImages={handleDeleteAllImages}
        resetForm={resetProductForm}
      />

      {selectedProduct && (
        <VariantManagement
          isOpen={isVariantModalOpen}
          onClose={() => {
            setIsVariantModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          onUpdate={handleVariantUpdate}
        />
      )}
    </div>
  );
};

export default ProductManagement;
