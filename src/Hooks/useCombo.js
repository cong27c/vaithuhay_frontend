import { useQuery } from "@tanstack/react-query";
import {
  getAllComboDetail,
  getAllCombos,
  getComboProducts,
} from "@/Services/stuffService";

export function useAllCombos() {
  return useQuery({
    queryKey: ["allCombos"],
    queryFn: async () => {
      const response = await getAllCombos("/combos");
      console.log("allCombos", response?.combos);
      return response?.combos;
    },
    staleTime: 1000 * 60 * 60 * 24 * 10,
    cacheTime: 1000 * 60 * 60 * 24 * 10,
    refetchOnWindowFocus: false,
  });
}

// Lấy chi tiết tất cả combo
export function useAllComboDetail() {
  return useQuery({
    queryKey: ["allComboDetail"],
    queryFn: async () => {
      const response = await getAllComboDetail("/combos/detail");

      return response;
    },

    staleTime: 1000 * 60 * 60 * 24 * 10,
    cacheTime: 1000 * 60 * 60 * 24 * 10,
    refetchOnWindowFocus: false,
  });
}

// Lấy danh sách sản phẩm trong combo
export function useComboProducts(comboId) {
  return useQuery({
    queryKey: ["comboProducts", comboId],
    queryFn: async () => {
      const response = await getComboProducts(`/combos/${comboId}/products`);
      return response.data;
    },
    enabled: !!comboId,

    staleTime: 1000 * 60 * 60 * 24 * 10,
    cacheTime: 1000 * 60 * 60 * 24 * 10,
    refetchOnWindowFocus: false,
  });
}
