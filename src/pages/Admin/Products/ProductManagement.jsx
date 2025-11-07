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
  getProductById,
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
  const [tempImageUrls, setTempImageUrls] = useState({
    main: null,
    sub: [],
  });

  const [loadingProductDetail, setLoadingProductDetail] = useState(false);

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

  // 🎯 Hàm xử lý edit product
  const handleEditProduct = async (product) => {
    const loadingToast = toast.loading("Đang tải dữ liệu sản phẩm...");
    setLoadingProductDetail(true);

    try {
      const fullProduct = await getProductById(product.id);
      const transformedProduct = transformProductForDisplay(fullProduct);
      console.log("fullProduct", fullProduct);

      // Cập nhật state productImages với thông tin ảnh từ API
      setProductImages((prev) => ({
        ...prev,
        [product.id]: {
          main: fullProduct.main_image
            ? {
                data: {
                  id: fullProduct.main_image.id,
                  image_url: fullProduct.main_image.image_url,
                },
              }
            : null,
          sub:
            fullProduct.sub_images?.map((img) => ({
              data: {
                id: img.id,
                image_url: img.image_url,
              },
            })) || [],
        },
      }));

      setEditingProduct(transformedProduct);
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

  // 🎯 Hàm mở modal create mới
  const handleOpenCreateModal = () => {
    resetProductForm();
    setIsProductModalOpen(true);
  };

  // 🎯 Hàm đóng modal
  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    resetProductForm();
  };

  // 🖼️ Xử lý upload ảnh
  const handleMainImageUpload = async (productId, file) => {
    if (!file) return null;
    console.log("handleMainImageUpload", productId);

    setUploadingImages((prev) => ({ ...prev, main: true }));
    try {
      const response = await uploadMainProductImage(productId, file);

      setProductImages((prev) => ({
        ...prev,
        [productId]: {
          ...prev[productId],
          main: {
            data: {
              id: response.id,
              image_url: response.image_url,
            },
          },
          sub: prev[productId]?.sub || [],
        },
      }));
      return response;
    } catch (error) {
      console.error("Lỗi upload ảnh chính:", error);
      return null;
    } finally {
      setUploadingImages((prev) => ({ ...prev, main: false }));
    }
  };

  const handleSubImageUpload = async (productId, file) => {
    if (!file) return null;
    console.log("handleSubImageUpload", productId);

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
      return null;
    } finally {
      setUploadingImages((prev) => ({ ...prev, sub: false }));
    }
  };

  // 🆕 Hàm upload nhiều ảnh phụ cùng lúc
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
    return results.filter((result) => result !== null);
  };

  // 🗑️ Xử lý xóa ảnh
  const handleDeleteImage = async (productId, imageId, imageType) => {
    if (!confirm("Bạn có chắc chắn muốn xóa ảnh này?")) return;

    const deleteToast = toast.loading("Đang xóa ảnh...");
    try {
      await deleteProductImage(productId, imageId);

      setProductImages((prev) => {
        const updatedImages = { ...prev };
        if (imageType === "main") {
          if (updatedImages[productId]?.main?.data?.id === imageId) {
            delete updatedImages[productId].main;
          }
        } else if (imageType === "sub") {
          if (updatedImages[productId]?.sub) {
            updatedImages[productId].sub = updatedImages[productId].sub.filter(
              (img) => img.data.id !== imageId,
            );
          }
        }
        return updatedImages;
      });

      toast.update(deleteToast, {
        render: "Xóa ảnh thành công!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Lỗi xóa ảnh:", error);
      toast.update(deleteToast, {
        render: "Xóa ảnh thất bại!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  // 🗑️ Xử lý xóa ảnh tạm (chưa upload)
  const handleDeleteTempImage = (imageType, index = null) => {
    if (imageType === "main") {
      if (tempImageUrls.main) {
        URL.revokeObjectURL(tempImageUrls.main);
      }
      setTempImageFiles((prev) => ({ ...prev, main: null }));
      setTempImageUrls((prev) => ({ ...prev, main: null }));
    } else if (imageType === "sub" && index !== null) {
      const newSubUrls = [...tempImageUrls.sub];
      const newSubFiles = [...tempImageFiles.sub];

      if (newSubUrls[index]) {
        URL.revokeObjectURL(newSubUrls[index]);
      }

      newSubUrls.splice(index, 1);
      newSubFiles.splice(index, 1);

      setTempImageUrls((prev) => ({ ...prev, sub: newSubUrls }));
      setTempImageFiles((prev) => ({ ...prev, sub: newSubFiles }));
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

  // 📤 Xử lý file input change
  const handleFileChange = (type, event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;
    console.log("handleFileChange", files);

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
      throw error;
    }
  };

  const handleCreateProduct = async (formData) => {
    const createToast = toast.loading("Đang tạo sản phẩm...");

    try {
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

      const newProduct = await createProduct(productData);

      setProductImages((prev) => ({
        ...prev,
        [newProduct.id]: {
          main: null,
          sub: [],
        },
      }));

      // 🔄 UPLOAD ẢNH NGẦM
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

      if (uploadPromises.length > 0) {
        Promise.all(uploadPromises)
          .then((results) => {
            console.log("Upload ảnh hoàn tất:", results);
            fetchProducts();
          })
          .catch((error) => {
            console.error("Lỗi khi upload ảnh ngầm:", error);
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

      const updatedProduct = await updateProduct(editingProduct.id, updateData);
      const transformedProduct = transformProductForDisplay(updatedProduct);

      setProducts(
        products?.map((product) =>
          product.id === editingProduct.id ? transformedProduct : product,
        ),
      );

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
      updatedProduct?.map((product) =>
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
        onDeleteTempImage={handleDeleteTempImage}
        onDeleteAllImages={handleDeleteAllImages}
        resetForm={resetProductForm}
        loadingProductDetail={loadingProductDetail}
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
