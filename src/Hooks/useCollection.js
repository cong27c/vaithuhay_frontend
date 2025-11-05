import {
  getByProductsSlug,
  getCollections,
  getProductsByCollectionSlug,
} from "@/Services/collectionService";
import { useQuery } from "@tanstack/react-query";

// Hook lấy danh sách collections
export function useCollections() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
    staleTime: 1000 * 60 * 60 * 24 * 10,
    cacheTime: 1000 * 60 * 60 * 24 * 10, // 5 phút
    refetchOnWindowFocus: false,
  });
}

// Hook lấy sản phẩm theo collection slug (có phân trang và sắp xếp)
export function useProductsByCollectionSlug(
  slug,
  page = 1,
  limit = 12,
  sort = "newest",
) {
  return useQuery({
    queryKey: ["collection-products", slug, page, limit, sort],
    queryFn: () => getProductsByCollectionSlug(slug, page, limit, sort),
    enabled: !!slug, // Chỉ chạy khi có slug
    staleTime: 1000 * 60 * 60 * 24 * 10,
    cacheTime: 1000 * 60 * 60 * 24 * 10,
    refetchOnWindowFocus: false,
  });
}

// Hook lấy slide collection theo slug
export function useCollectionSlideBySlug(slug) {
  return useQuery({
    queryKey: ["collection-slide", slug],
    queryFn: () => getByProductsSlug(slug),
    enabled: !!slug, // Chỉ chạy khi có slug
    staleTime: 1000 * 60 * 60 * 24 * 10,
    cacheTime: 1000 * 60 * 60 * 24 * 10,
    refetchOnWindowFocus: false,
  });
}

// Export tất cả hooks dưới dạng object (tuỳ chọn)
export const useCollection = {
  useCollections,
  useProductsByCollectionSlug,
  useCollectionSlideBySlug,
};
