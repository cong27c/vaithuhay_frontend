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
  getProductById, // 🎯 THÊM IMPORT NÀY
} from "@/Services/productAdminService";
import {
  uploadMainProductImage,
  uploadSubProductImage,
  deleteProductImage,
  deleteAllProductImages,
} from "@/Services/productImageService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  // 🎯 THÊM: State để quản lý loading khi fetch product detail
  const [loadingProductDetail, setLoadingProductDetail] = useState(false);

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

      const transformedProducts = response.products?.map(
        transformProductForDisplay,
      );
      setProducts(transformedProducts);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      toast.error("Lỗi khi tải danh sách sản phẩm");
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

  // 🎯 SỬA HOÀN TOÀN HÀM handleEditProduct
  const handleEditProduct = async (product) => {
    const loadingToast = toast.loading("Đang tải dữ liệu sản phẩm...");
    setLoadingProductDetail(true);

    try {
      // 🎯 Gọi API lấy chi tiết sản phẩm
      const fullProduct = await getProductById(product.id);

      // 🎯 Transform dữ liệu để chuẩn hóa
      const transformedProduct = transformProductForDisplay(fullProduct);

      // 🎯 Set editing product với đầy đủ dữ liệu
      setEditingProduct(transformedProduct);

      // 🎯 Mở modal edit
      setIsProductModalOpen(true);

      toast.update(loadingToast, {
        render: "Tải dữ liệu sản phẩm thành công!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Lỗi khi tải chi tiết sản phẩm:", error);
      toast.update(loadingToast, {
        render: "Không thể tải dữ liệu sản phẩm!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoadingProductDetail(false);
    }
  };

  // 🎯 THÊM HÀM MỞ MODAL CREATE MỚI
  const handleOpenCreateModal = () => {
    resetProductForm();
    setIsProductModalOpen(true);
  };

  // 🎯 SỬA HÀM ĐÓNG MODAL
  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    resetProductForm();
  };

  // 🖼️ Xử lý upload ảnh - CHẠY NGẦM (không hiển thị toast)
  const handleMainImageUpload = async (productId, file) => {
    if (!file) return null;

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
      // KHÔNG hiển thị toast để tránh làm phiền người dùng
      return null;
    } finally {
      setUploadingImages((prev) => ({ ...prev, main: false }));
    }
  };

  const handleSubImageUpload = async (productId, file) => {
    if (!file) return null;

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
      // KHÔNG hiển thị toast
      return null;
    } finally {
      setUploadingImages((prev) => ({ ...prev, sub: false }));
    }
  };

  // 🆕 Hàm upload nhiều ảnh phụ cùng lúc - CHẠY NGẦM
  const handleMultipleSubImagesUpload = async (productId, files) => {
    if (!files.length) return [];

    const uploadPromises = files?.map(async (file) => {
      try {
        return await handleSubImageUpload(productId, file);
      } catch (error) {
        console.error(`Lỗi upload ảnh phụ: ${file.name}`, error);
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter((result) => result !== null);

    // Log kết quả upload nhưng không hiển thị toast

    return successfulUploads;
  };

  // 🗑️ Xử lý xóa ảnh - VẪN HIỂN THỊ THÔNG BÁO (vì là hành động chủ động)
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
      toast.success("Xóa ảnh thành công");
    } catch (error) {
      console.error("Lỗi xóa ảnh:", error);
      toast.error("Xóa ảnh thất bại");
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
      toast.success("Xóa tất cả ảnh thành công");
    } catch (error) {
      console.error("Lỗi xóa ảnh:", error);
      toast.error("Xóa ảnh thất bại");
    }
  };

  // 📤 Xử lý file input change - VẪN HIỂN THỊ LỖI VALIDATION
  const handleFileChange = (type, event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Vui lòng chọn file ảnh");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Kích thước file không được vượt quá 5MB");
        return false;
      }
      return true;
    });

    if (!validFiles.length) return;

    if (type === "main") {
      const file = validFiles[0];
      const previewUrl = URL.createObjectURL(file);
      setTempImageFiles((prev) => ({ ...prev, main: file }));
      setTempImageUrls((prev) => ({ ...prev, main: previewUrl }));
    } else {
      const previewUrls = validFiles?.map((file) => URL.createObjectURL(file));
      setTempImageFiles((prev) => ({
        ...prev,
        sub: [...prev.sub, ...validFiles],
      }));
      setTempImageUrls((prev) => ({
        ...prev,
        sub: [...prev.sub, ...previewUrls],
      }));
    }

    event.target.value = "";
  };

  // 📝 Xử lý form
  const handleFormSubmit = async (formData) => {
    setSubmitting(true);
    console.log("handleFormSubmit", formData);

    try {
      if (editingProduct) {
        await handleUpdateProduct(formData);
      } else {
        await handleCreateProduct(formData);
      }
    } catch (error) {
      console.error("Lỗi khi gửi sản phẩm:", error);
      toast.error("Có lỗi xảy ra khi xử lý sản phẩm");
    } finally {
      setSubmitting(false);
    }
  };

  const handleHighlightImageUpload = async (productId, file) => {
    if (!file) return;

    try {
      const result = await uploadSubProductImage(productId, file);
      console.log("handleHighlightImageUpload", result);
      const imageUrl = result?.url || result?.image_url || "";

      if (!imageUrl) throw new Error("Không nhận được URL ảnh từ server");

      await updateProduct(productId, {
        detail: {
          highlights: {
            img: imageUrl,
            highlights_html: [],
          },
        },
      });

      return result;
    } catch (error) {
      console.error("Lỗi upload highlight image:", error);
      // KHÔNG hiển thị toast, lỗi sẽ được xử lý ở hàm chính
      throw error;
    }
  };

  const handleCreateProduct = async (formData) => {
    const createToast = toast.loading("Đang tạo sản phẩm...");

    try {
      // Chuẩn bị data đúng structure cho API
      const productData = {
        name: formData.name,
        slug: formData.slug,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        weight: parseFloat(formData.weight) || 0,
        release_date: formData.release_date,
        status: formData.status,
        brand_id: formData.brand_id ? parseInt(formData.brand_id) : null,

        detail: {
          title: formData.title || formData.name,
          long_description: formData.long_description || "",
          specifications: formData.specifications || "",
          highlights: formData.highlights || { img: "", highlights_html: [] },
          care_instructions: formData.care_instructions || "",
          origin: formData.origin || "",
          material: formData.material || "",
        },

        main_image: "",
        sub_images: [],
      };

      console.log("Creating product with data:", productData);

      const newProduct = await createProduct(productData);

      // 🔄 UPLOAD ẢNH NGẦM - không hiển thị thông báo
      // Tạo mảng các promise upload ảnh
      const uploadPromises = [];

      if (tempImageFiles.main) {
        uploadPromises.push(
          handleMainImageUpload(newProduct.id, tempImageFiles.main),
        );
      }

      if (tempImageFiles.sub.length > 0) {
        uploadPromises.push(
          handleMultipleSubImagesUpload(newProduct.id, tempImageFiles.sub),
        );
      }

      if (formData.highlight_image_file) {
        uploadPromises.push(
          handleHighlightImageUpload(
            newProduct.id,
            formData.highlight_image_file,
          ),
        );
      }

      // Chờ tất cả upload hoàn thành NGẦM
      // Không cần await, để chạy background
      if (uploadPromises.length > 0) {
        Promise.all(uploadPromises)
          .then((results) => {
            console.log("Upload ảnh hoàn tất:", results);
            // Tự động refresh danh sách sản phẩm để hiển thị ảnh mới
            fetchProducts();
          })
          .catch((error) => {
            console.error("Lỗi khi upload ảnh ngầm:", error);
            // KHÔNG hiển thị toast lỗi cho người dùng
          });
      }

      await fetchProducts();
      setIsProductModalOpen(false);
      resetProductForm();

      toast.update(createToast, {
        render: "Tạo sản phẩm thành công!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
      toast.update(createToast, {
        render: "Lỗi khi tạo sản phẩm: " + error.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      throw error;
    }
  };

  const handleUpdateProduct = async (formData) => {
    const updateToast = toast.loading("Đang cập nhật sản phẩm...");

    try {
      const updateData = {
        name: formData.name,
        slug: formData.slug,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        weight: parseFloat(formData.weight) || 0,
        release_date: formData.release_date,
        status: formData.status,
        brand_id: formData.brand_id ? parseInt(formData.brand_id) : null,

        detail: {
          title: formData.title || formData.name,
          long_description: formData.long_description || "",
          specifications: formData.specifications || "",
          highlights: formData.highlights || { img: "", highlights_html: [] },
          care_instructions: formData.care_instructions || "",
          origin: formData.origin || "",
          material: formData.material || "",
        },
      };

      console.log("Updating product with data:", updateData);

      const updatedProduct = await updateProduct(editingProduct.id, updateData);
      const transformedProduct = transformProductForDisplay(updatedProduct);

      setProducts(
        products?.map((product) =>
          product.id === editingProduct.id ? transformedProduct : product,
        ),
      );

      // Upload highlight image nếu có - CHẠY NGẦM
      if (formData.highlight_image_file) {
        handleHighlightImageUpload(
          editingProduct.id,
          formData.highlight_image_file,
        ).catch((error) => {
          console.error("Lỗi upload highlight image ngầm:", error);
        });
      }

      setIsProductModalOpen(false);
      resetProductForm();

      toast.update(updateToast, {
        render: "Cập nhật sản phẩm thành công!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      toast.update(updateToast, {
        render: "Lỗi khi cập nhật sản phẩm: " + error.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      throw error;
    }
  };

  // 🎯 Các hàm xử lý sự kiện
  const handleDeleteProduct = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

    const deleteToast = toast.loading("Đang xóa sản phẩm...");

    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));

      toast.update(deleteToast, {
        render: "Xóa sản phẩm thành công!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      toast.update(deleteToast, {
        render: "Lỗi khi xóa sản phẩm",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const openVariantModal = (product) => {
    setSelectedProduct(product);
    setIsVariantModalOpen(true);
  };

  const handleVariantUpdate = (updatedProduct) => {
    setProducts(
      products?.map((product) =>
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
        {/* 🎯 SỬA NÚT THÊM SẢN PHẨM */}
        <Button variant="primary" onClick={handleOpenCreateModal}>
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

      {/* 🎯 THÊM PROP loadingProductDetail VÀO ProductForm */}
      <ProductForm
        editingProduct={editingProduct}
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
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
        loadingProductDetail={loadingProductDetail} // 🎯 THÊM PROP NÀY
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
