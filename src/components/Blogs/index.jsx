import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleList from "../ArticleList";
import Pagination from "../Pagination";
import styles from "./Blogs.module.scss";
import PropTypes from "prop-types";
import { getBlogsByType } from "@/Services/blogService";

function Blogs({ title = "Setup Decor", type = "setup-decor" }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    itemsPerPage: 9,
    hasNext: false,
    hasPrev: false,
  });
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  // Fetch blogs khi type hoặc currentPage thay đổi

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const result = await getBlogsByType(type, 1, 4); // Luôn lấy 4 bài đầu tiên từ trang 1
        const blogsData = result.blogs || result.data || [];

        const processedFeaturedBlogs = blogsData?.map((blog, index) => ({
          id: blog.id || `featured-${index}`,
          title: blog.title || "Không có tiêu đề",
          author: blog.author || "Jaithubay.com",
          date: blog.created_at || "01.01.2024",
          image: blog.thumbnail || "",
          slug: blog.slug || blog.id,
          type: blog.type || type,
          ...blog,
        }));

        setFeaturedBlogs(processedFeaturedBlogs);
      } catch (error) {
        console.error("Error fetching featured blogs:", error);
      }
    };

    fetchFeaturedBlogs();
  }, [type]); // Chỉ phụ thuộc vào type

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const result = await getBlogsByType(type, currentPage, 9);
        console.log("API Response:", result);

        // Sửa: Truy xuất đúng cấu trúc response
        const blogsData = result.blogs || result.data || [];
        const paginationData = result.pagination || {};
        // Xử lý tất cả blogs từ API
        const processedBlogs = blogsData?.map((blog, index) => ({
          id: blog.id || `blog-${currentPage}-${index}`,
          title: blog.title || "Không có tiêu đề",
          author: blog.author || "Jaithubay.com",
          date: blog.created_at || "01.01.2024",
          image: blog.thumbnail || "",
          slug: blog.slug || blog.id,
          type: blog.type || type,
          ...blog,
        }));

        setBlogs(processedBlogs);
        // Cập nhật thông tin phân trang
        setPagination({
          totalItems: paginationData.totalItems || 0,
          totalPages: paginationData.totalPages || 1,
          itemsPerPage: paginationData.itemsPerPage || 9,
          hasNext: paginationData.hasNext || false,
          hasPrev: paginationData.hasPrev || false,
        });
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [type, currentPage]);

  // Xử lý khi chuyển trang
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // SỬA: Ở trang 1, ArticleList hiển thị TẤT CẢ blogs (9 blog)
  // Ở các trang khác cũng hiển thị tất cả blogs (9 blog)
  const articleListBlogs = blogs;

  if (loading) {
    return <div className={styles.loading}>Đang tải...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles["header-section"]}>
        <div className={styles.title}>{title}</div>

        {/* Chỉ hiển thị banner ở trang 1 */}
        {
          <div className={styles.banner}>
            {featuredBlogs.length > 0
              ? featuredBlogs?.map((blog, index) => {
                  const classParticular =
                    index === 0
                      ? styles.first
                      : index === 1
                        ? styles.second
                        : index === 2
                          ? styles.third
                          : styles.fourth;

                  return (
                    <Link
                      key={blog.id}
                      to={`/blogs/${blog.type}/${blog.slug}`}
                      className={styles.blogLink}
                    >
                      <div className={`${styles.item} ${classParticular}`}>
                        <img src={blog.image} alt={blog.title} />
                        <div className={styles.overlay}>
                          <p>{blog.title}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })
              : blogs.length === 0 && (
                  <div className={styles.noBlogs}>Không có bài viết nào</div>
                )}
          </div>
        }
      </div>

      <div className={styles["footer-section"]}>
        {/* SỬA: Hiển thị tất cả 9 blog trong ArticleList */}
        <ArticleList articles={articleListBlogs} />

        {/* Hiển thị Pagination nếu có nhiều hơn 1 trang */}
        {pagination.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalItems={pagination.totalItems}
            itemsPerPage={pagination.itemsPerPage}
            onPageChange={handlePageChange}
            size={40}
            fontSize={14}
            gap={8}
            prevNextWidth="auto"
            prevNextPadding="0 15px"
          />
        )}
      </div>
    </div>
  );
}

Blogs.propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf(["setup-decor", "technology", "product", "cong-nghe"]),
};

export default Blogs;
