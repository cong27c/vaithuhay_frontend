// hooks/useSearch.js
import { useState, useRef, useCallback } from "react";
import {
  searchAll,
  searchProducts,
  searchBlogs,
} from "@/Services/searchService";

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    products: { items: [], total: 0 },
    blogs: { items: [], total: 0 },
    collections: { items: [], total: 0 },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounceRef = useRef();

  // Fetch hot topics on mount

  const performSearch = useCallback(async (keyword, type = "all") => {
    if (!keyword || keyword.trim().length < 2) {
      setSearchResults({
        products: { items: [], total: 0 },
        blogs: { items: [], total: 0 },
        collections: { items: [], total: 0 },
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let response;
      console.log("Search type:", type);

      if (type === "products") {
        response = await searchProducts(keyword, { limit: 10 });
      } else if (type === "blogs") {
        response = await searchBlogs(keyword, { limit: 10 });
      } else {
        response = await searchAll(keyword, { limit: 10 });
      }

      if (response.success) {
        // Xử lý response theo cấu trúc nested thực tế
        if (type === "all") {
          setSearchResults(response?.data);
        } else if (type === "products") {
          const productData = response.data?.products?.data || response.data;
          setSearchResults((prev) => ({
            ...prev,
            products: {
              items: productData?.items || [],
              total: productData?.total || productData?.pagination?.total || 0,
            },
          }));
        } else if (type === "blogs") {
          // searchBlogs trả về data chứa items và total
          const blogData = response.data?.blogs?.data || response.data;
          setSearchResults((prev) => ({
            ...prev,
            blogs: {
              items: blogData?.items || [],
              total: blogData?.total || 0,
            },
          }));
        }
      } else {
        setError(response.message || "Lỗi tìm kiếm");
      }
    } catch (err) {
      setError(err.message || "Lỗi kết nối server");
      console.error("Search error:", err);
      setSearchResults(getMockSearchResults(keyword, type));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(
    (keyword, type = "all") => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        performSearch(keyword, type);
      }, 500); // Giảm xuống 500ms như yêu cầu
    },
    [performSearch],
  );

  const handleSearch = useCallback(
    (keyword, type = "all") => {
      setSearchTerm(keyword);

      if (keyword.trim().length === 0) {
        setSearchResults({
          products: { items: [], total: 0 },
          blogs: { items: [], total: 0 },
          collections: { items: [], total: 0 },
        });
        return;
      }

      debouncedSearch(keyword, type);
    },
    [debouncedSearch],
  );

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setSearchResults({
      products: { items: [], total: 0 },
      blogs: { items: [], total: 0 },
      collections: { items: [], total: 0 },
    });
    setError(null);
  }, []);

  // Immediate search without debounce
  const searchImmediately = useCallback(
    (keyword, type = "all") => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      performSearch(keyword, type);
    },
    [performSearch],
  );

  // Mock data fallback
  const getMockSearchResults = (keyword, type) => {
    const mockProducts = [
      {
        id: 1,
        name: "Túi đựng bàn phím có - bảo vệ bàn phím chống số...",
        price: 79000,
        slug: "tui-dung-ban-phim",
        images: [{ image_url: "/images/product1.jpg" }],
        discount: null,
      },
      {
        id: 2,
        name: "Bàn phím cơ RGB cao cấp",
        price: 599000,
        slug: "ban-phim-co-rgb",
        images: [{ image_url: "/images/product2.jpg" }],
        discount: { discount_percent: 10 },
      },
    ];

    const mockBlogs = [
      {
        id: 1,
        title: "Hướng dẫn setup góc làm việc với đèn RGB",
        slug: "huong-dan-setup-goc-lam-viec",
        thumbnail: "/images/blog1.jpg",
        type: "setup-decor",
        created_at: new Date().toISOString(),
        content_text: "Cách tạo không gian làm việc sáng tạo với đèn RGB...",
      },
      {
        id: 2,
        title: "Công nghệ mới trong bàn phím cơ 2024",
        slug: "cong-nghe-moi-trong-ban-phim-co",
        thumbnail: "/images/blog2.jpg",
        type: "cong-nghe",
        created_at: new Date().toISOString(),
        content_text: "Những công nghệ mới nhất trong bàn phím cơ...",
      },
    ];

    const mockCollections = [
      {
        id: 1,
        name: "Bàn phím cơ",
        slug: "ban-phim-co",
        thumbnail: "/images/collection1.jpg",
      },
    ];

    if (type === "products") {
      return {
        products: {
          items: mockProducts.filter((p) =>
            p.name.toLowerCase().includes(keyword.toLowerCase()),
          ),
          total: 2,
        },
        blogs: { items: [], total: 0 },
        collections: { items: [], total: 0 },
      };
    } else if (type === "blogs") {
      return {
        products: { items: [], total: 0 },
        blogs: {
          items: mockBlogs.filter((b) =>
            b.title.toLowerCase().includes(keyword.toLowerCase()),
          ),
          total: 2,
        },
        collections: { items: [], total: 0 },
      };
    }

    return {
      products: {
        items: mockProducts.filter((p) =>
          p.name.toLowerCase().includes(keyword.toLowerCase()),
        ),
        total: 2,
      },
      blogs: {
        items: mockBlogs.filter((b) =>
          b.title.toLowerCase().includes(keyword.toLowerCase()),
        ),
        total: 2,
      },
      collections: {
        items: mockCollections.filter((c) =>
          c.name.toLowerCase().includes(keyword.toLowerCase()),
        ),
        total: 1,
      },
    };
  };
  return {
    searchTerm,
    searchResults,
    isLoading,
    error,
    handleSearch,
    clearSearch,
    performSearch: searchImmediately, // Sử dụng hàm không debounce
  };
};

export default useSearch;
