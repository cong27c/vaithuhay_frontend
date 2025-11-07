import adminHttpRequest from "@/utils/adminHttpRequest";

// 📦 Product CRUD Operations
const getAllProducts = async (params = {}) => {
  const response = await adminHttpRequest.get("/products", { params });
  return response.data;
};

const getProductById = async (id) => {
  const response = await adminHttpRequest.get(`/products/${id}`);
  return response.data;
};

const createProduct = async (productData) => {
  const response = await adminHttpRequest.post("/products", productData);
  return response.data;
};

const updateProduct = async (id, productData) => {
  const response = await adminHttpRequest.put(`/products/${id}`, productData);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await adminHttpRequest.del(`/products/${id}`);
  return response.data;
};

const createProductVariant = async (productId, variantData) => {
  const response = await adminHttpRequest.post(
    `/products/${productId}/variants`,
    variantData,
  );
  return response.data;
};

const updateProductVariant = async (variantId, variantData) => {
  const response = await adminHttpRequest.put(
    `/products/variants/${variantId}`,
    variantData,
  );
  return response.data;
};

const deleteProductVariant = async (variantId) => {
  const response = await adminHttpRequest.del(
    `/products/variants/${variantId}`,
  );
  return response.data;
};

// 🔍 GET Product Variant Functions
const getProductVariant = async (variantId, options = {}) => {
  try {
    const params = {};

    if (options.includeAttributes) {
      params.includeAttributes = true;
    }
    if (options.includeProduct) {
      params.includeProduct = true;
    }

    const response = await adminHttpRequest.get(`/variants/${variantId}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch product variant",
    );
  }
};

const getProductVariantsByProduct = async (productId, options = {}) => {
  try {
    const params = {};

    if (options.includeAttributes) {
      params.includeAttributes = true;
    }
    if (options.includeStock) {
      params.includeStock = true;
    }

    const response = await adminHttpRequest.get(
      `/products/variants/product/${productId}`,
      { params },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch product variants",
    );
  }
};

// 🖼️ Product Images Operations

// 🏷️ Product Collections Operations
const addProductToCollection = async (productId, collectionId) => {
  const response = await adminHttpRequest.post(
    `/products/${productId}/collections`,
    { collection_id: collectionId },
  );
  return response.data;
};

const removeProductFromCollection = async (productId, collectionId) => {
  const response = await adminHttpRequest.del(
    `/products/${productId}/collections/${collectionId}`,
  );
  return response.data;
};

const updateProductCollections = async (productId, collectionIds) => {
  // First remove all existing collections
  // Then add new ones
  // This would require knowing current collections first
  const response = await adminHttpRequest.put(
    `/products/${productId}/collections`,
    { collection_ids: collectionIds },
  );
  return response.data;
};

// 📊 Product Status Management
const updateProductStatus = async (productId, status) => {
  const response = await adminHttpRequest.patch(
    `/products/${productId}/status`,
    { status },
  );
  return response.data;
};

// 💰 Product Discount Operations
const createProductDiscount = async (productId, discountData) => {
  const response = await adminHttpRequest.post(
    `/products/${productId}/discounts`,
    discountData,
  );
  return response.data;
};

const updateProductDiscount = async (productId, discountData) => {
  const response = await adminHttpRequest.put(
    `/products/${productId}/discounts`,
    discountData,
  );
  return response.data;
};

const deleteProductDiscount = async (productId) => {
  const response = await adminHttpRequest.del(
    `/products/${productId}/discounts`,
  );
  return response.data;
};

// 🔍 Advanced Search
const searchProducts = async (filters = {}) => {
  const response = await adminHttpRequest.get("/products/search", {
    params: filters,
  });
  return response.data;
};

// 📦 Bulk Operations
const bulkUpdateProducts = async (productIds, updateData) => {
  const response = await adminHttpRequest.patch("/products/bulk/update", {
    product_ids: productIds,
    ...updateData,
  });
  return response.data;
};

const bulkDeleteProducts = async (productIds) => {
  const response = await adminHttpRequest.post("/products/bulk/delete", {
    product_ids: productIds,
  });
  return response.data;
};

// 🎯 Utility Functions
const transformProductForDisplay = (product) => {
  if (!product) return null;

  const mainImage =
    product.images?.find((img) => img.is_main) || product.images?.[0];
  const subImages = product.images?.filter((img) => !img.is_main) || [];

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    stock: product.stock,
    weight: product.weight,
    release_date: product.release_date,
    status: product.status,
    brand_id: product.brand_id,
    discount: product.discount?.discount_value || null,
    main_image: mainImage?.image_url || "",
    sub_images: subImages?.map((img) => img.image_url),
    variants: product.variants || [],
    detail: product.detail || null,
  };
};

const calculateFinalPrice = (product) => {
  if (!product) return 0;

  let finalPrice = product.price;

  // Apply product discount
  if (product.discount) {
    finalPrice = finalPrice * (1 - product.discount / 100);
  }

  // Apply collection discounts (if available in product data)
  if (product.collections && product.collections.length > 0) {
    // This would require fetching collection details to get their discounts
    // For now, we'll assume collections data includes discount info
    const collectionDiscounts = product.collections?.map(
      (collection) => collection.discount_value || 0,
    );

    const maxCollectionDiscount = Math.max(...collectionDiscounts);
    if (maxCollectionDiscount > 0) {
      finalPrice = finalPrice * (1 - maxCollectionDiscount / 100);
    }
  }

  return Math.round(finalPrice * 100) / 100; // Round to 2 decimal places
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductVariant,
  updateProductVariant,
  deleteProductVariant,
  addProductToCollection,
  removeProductFromCollection,
  updateProductCollections,
  updateProductStatus,
  createProductDiscount,
  updateProductDiscount,
  deleteProductDiscount,
  searchProducts,
  bulkUpdateProducts,
  bulkDeleteProducts,
  transformProductForDisplay,
  calculateFinalPrice,
  getProductVariant,
  getProductVariantsByProduct,
};
