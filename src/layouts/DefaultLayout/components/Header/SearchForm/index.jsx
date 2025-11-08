// SearchForm/index.jsx
import { useState, useEffect, useRef } from "react";
import useSearch from "@/Hooks/useSearch";
import styles from "./SearchForm.module.scss";

function SearchForm() {
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const wrapperRef = useRef(null);

  const {
    searchTerm,
    searchResults,
    isLoading,
    error,
    handleSearch,
    clearSearch,
  } = useSearch();

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    handleSearch(value, activeTab);
    setShowResults(value.length > 0);
  };

  const handleInputFocus = () => {
    if (searchTerm.length > 0) {
      setShowResults(true);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      console.log("Searching for:", searchTerm);
      setShowResults(false);
    }
  };

  const handleProductClick = (product) => {
    console.log("Product clicked:", product);
    setShowResults(false);
    window.location.href = `/products/${product.slug}`;
  };

  const handleArticleClick = (article) => {
    console.log("Article clicked:", article);
    setShowResults(false);
    window.location.href = `${article.link}`;
  };

  const handleTopicClick = (topic) => {
    const cleanTopic = topic.replace("#", "");
    handleSearch(cleanTopic, "all");
    setActiveTab("products"); // Chuyển sang tab sản phẩm khi click topic
    setShowResults(true);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (searchTerm && searchTerm.length >= 2) {
      const searchType =
        tab === "topics" ? "all" : tab === "blogs" ? "blogs" : tab;
      handleSearch(searchTerm, searchType);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Safe access to data
  const products = searchResults.products || { items: [], total: 0 };
  const blogs = searchResults.blogs || { items: [], total: 0 };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Tìm sản phẩm"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <button type="submit" className={styles.searchButton}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>

      {/* Search Results */}
      {showResults && (
        <div className={styles.searchResults}>
          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "products" ? styles.active : ""}`}
              onClick={() => handleTabChange("products")}
            >
              Sản phẩm ({products.total || 0})
            </button>
            <button
              className={`${styles.tab} ${activeTab === "blogs" ? styles.active : ""}`}
              onClick={() => handleTabChange("blogs")}
            >
              Bài viết ({blogs.total || 0})
            </button>
          </div>

          {/* Content */}
          <div className={styles.content}>
            {isLoading && (
              <div className={styles.loading}>
                <i className="fa-solid fa-spinner fa-spin"></i>
                Đang tìm kiếm...
              </div>
            )}

            {error && (
              <div className={styles.error}>
                <i className="fa-solid fa-exclamation-triangle"></i>
                {error}
              </div>
            )}

            {/* Products Tab */}
            {!isLoading && activeTab === "products" && (
              <div className={styles.section}>
                {products.items && products.items.length > 0 ? (
                  <div className={styles.productsList}>
                    {products.items?.map((product, index) => (
                      <div
                        key={product.id || index}
                        className={styles.productItem}
                        onClick={() => handleProductClick(product)}
                      >
                        <div className={styles.productImage}>
                          {product.mainImage && (
                            <img src={product.mainImage} alt={product.name} />
                          )}
                        </div>
                        <div className={styles.productInfo}>
                          <h4 className={styles.productName}>{product.name}</h4>
                          <div className={styles.productMeta}>
                            <span className={styles.productPrice}>
                              {formatPrice(product.price)}
                            </span>
                            {product.discount && (
                              <span className={styles.productDiscount}>
                                -{product.discount.discount_percent}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noResults}>
                    {searchTerm && searchTerm.length >= 2
                      ? "Không tìm thấy sản phẩm phù hợp"
                      : "Nhập ít nhất 2 ký tự để tìm kiếm"}
                  </div>
                )}
              </div>
            )}

            {/* Articles Tab */}
            {!isLoading && activeTab === "blogs" && (
              <div className={styles.section}>
                {blogs.items && blogs.items.length > 0 ? (
                  <div className={styles.blogsList}>
                    {blogs.items?.map((article) => (
                      <div
                        key={article.id}
                        className={styles.articleItem}
                        onClick={() => handleArticleClick(article)}
                      >
                        <div className={styles.articleImage}>
                          {article.thumbnail && (
                            <img src={article.thumbnail} alt={article.title} />
                          )}
                        </div>
                        <div className={styles.articleContent}>
                          <h4 className={styles.articleTitle}>
                            {article.title}
                          </h4>
                          <p className={styles.articleExcerpt}>
                            {article.content_text?.substring(0, 100)}...
                          </p>
                          <div className={styles.articleMeta}>
                            <span className={styles.articleType}>
                              #{article.type}
                            </span>
                            <span className={styles.articleDate}>
                              {new Date(article.created_at).toLocaleDateString(
                                "vi-VN",
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noResults}>
                    {searchTerm && searchTerm.length >= 2
                      ? "Không tìm thấy bài viết phù hợp"
                      : "Nhập ít nhất 2 ký tự để tìm kiếm"}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchForm;
