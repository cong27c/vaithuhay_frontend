import * as httpRequest from "@/utils/httpRequest";

// 📦 Product CRUD Operations
const getAllProducts = async (params = {}) => {
  const response = await httpRequest.get("/api/v1/products", { params });
  return response.data;
};

const getProductById = async (id) => {
  const response = await httpRequest.get(`/api/v1/products/${id}`);
  return response.data;
};

const createProduct = async (productData) => {
  // Transform data to match backend structure
  const transformedData = {
    name: productData.name,
    slug: productData.slug,
    description: productData.description,
    price: parseFloat(productData.price),
    stock: parseInt(productData.stock),
    weight: parseFloat(productData.weight),
    release_date: productData.release_date,
    status: productData.status,
    brand_id: parseInt(productData.brand_id),

    // Handle images
    images: [
      // Main image
      ...(productData.main_image
        ? [
            {
              image_url: productData.main_image,
              is_main: true,
            },
          ]
        : []),

      // Sub images
      ...(productData.sub_images?.map((image_url) => ({
        image_url,
        is_main: false,
      })) || []),
    ],

    // Handle discount
    ...(productData.discount && {
      discount: {
        discount_type: "percentage",
        discount_value: parseFloat(productData.discount),
        start_date: new Date().toISOString().split("T")[0],
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 30 days from now
        status: "active",
      },
    }),

    // Handle detail
    detail: {
      title: productData.name,
      long_description: productData.description,
      specifications: {},
      highlights: [],
      care_instructions: "",
      origin: "",
      material: "",
    },
  };

  const response = await httpRequest.post("/api/v1/products", transformedData);
  return response.data;
};

const updateProduct = async (id, productData) => {
  // Transform data for update
  const transformedData = {
    name: productData.name,
    slug: productData.slug,
    description: productData.description,
    price: parseFloat(productData.price),
    stock: parseInt(productData.stock),
    weight: parseFloat(productData.weight),
    release_date: productData.release_date,
    status: productData.status,
    brand_id: parseInt(productData.brand_id),

    // For images and discount, we might need separate API calls
    // as they have their own models
  };

  const response = await httpRequest.put(
    `/api/v1/products/${id}`,
    transformedData,
  );
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await httpRequest.delete(`/api/v1/products/${id}`);
  return response.data;
};

// 🔄 Product Variant Operations
const createProductVariant = async (productId, variantData) => {
  const transformedVariantData = {
    name: variantData.name,
    sku: variantData.sku,
    price: parseFloat(variantData.price),
    stock: parseInt(variantData.stock),
    image_url: variantData.image_url,
    // Transform variant attributes to match backend structure
    variant_attributes: Object.entries(variantData.variant_type || {}).map(
      ([key, value]) => ({
        attribute_type: key,
        attribute_value: variantData.variant_value?.[key] || value,
      }),
    ),
  };

  const response = await httpRequest.post(
    `/api/v1/products/${productId}/variants`,
    transformedVariantData,
  );
  return response.data;
};

const updateProductVariant = async (variantId, variantData) => {
  const transformedVariantData = {
    name: variantData.name,
    sku: variantData.sku,
    price: parseFloat(variantData.price),
    stock: parseInt(variantData.stock),
    image_url: variantData.image_url,
    variant_attributes: Object.entries(variantData.variant_type || {}).map(
      ([key, value]) => ({
        attribute_type: key,
        attribute_value: variantData.variant_value?.[key] || value,
      }),
    ),
  };

  const response = await httpRequest.put(
    `/api/v1/products/variants/${variantId}`,
    transformedVariantData,
  );
  return response.data;
};

const deleteProductVariant = async (variantId) => {
  const response = await httpRequest.delete(
    `/api/v1/products/variants/${variantId}`,
  );
  return response.data;
};

// 🖼️ Product Images Operations

// 🏷️ Product Collections Operations
const addProductToCollection = async (productId, collectionId) => {
  const response = await httpRequest.post(
    `/api/v1/products/${productId}/collections`,
    { collection_id: collectionId },
  );
  return response.data;
};

const removeProductFromCollection = async (productId, collectionId) => {
  const response = await httpRequest.delete(
    `/api/v1/products/${productId}/collections/${collectionId}`,
  );
  return response.data;
};

const updateProductCollections = async (productId, collectionIds) => {
  // First remove all existing collections
  // Then add new ones
  // This would require knowing current collections first
  const response = await httpRequest.put(
    `/api/v1/products/${productId}/collections`,
    { collection_ids: collectionIds },
  );
  return response.data;
};

// 📊 Product Status Management
const updateProductStatus = async (productId, status) => {
  const response = await httpRequest.patch(
    `/api/v1/products/${productId}/status`,
    { status },
  );
  return response.data;
};

// 💰 Product Discount Operations
const createProductDiscount = async (productId, discountData) => {
  const response = await httpRequest.post(
    `/api/v1/products/${productId}/discounts`,
    discountData,
  );
  return response.data;
};

const updateProductDiscount = async (productId, discountData) => {
  const response = await httpRequest.put(
    `/api/v1/products/${productId}/discounts`,
    discountData,
  );
  return response.data;
};

const deleteProductDiscount = async (productId) => {
  const response = await httpRequest.delete(
    `/api/v1/products/${productId}/discounts`,
  );
  return response.data;
};

// 🔍 Advanced Search
const searchProducts = async (filters = {}) => {
  const response = await httpRequest.get("/api/v1/products/search", {
    params: filters,
  });
  return response.data;
};

// 📦 Bulk Operations
const bulkUpdateProducts = async (productIds, updateData) => {
  const response = await httpRequest.patch("/api/v1/products/bulk/update", {
    product_ids: productIds,
    ...updateData,
  });
  return response.data;
};

const bulkDeleteProducts = async (productIds) => {
  const response = await httpRequest.post("/api/v1/products/bulk/delete", {
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
    sub_images: subImages.map((img) => img.image_url),
    collections: product.collections?.map((col) => col.id) || [],
    variants: product.variants || [],
    images: product.images || [],
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
    const collectionDiscounts = product.collections.map(
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
};
