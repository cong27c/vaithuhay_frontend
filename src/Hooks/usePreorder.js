import { useQuery } from "@tanstack/react-query";
import {
  getPreOrderCampaigns,
  getUpcomingCampaigns,
} from "@/Services/preOrderService";

// Lấy danh sách các chiến dịch sắp tới
export function useUpcomingCampaigns() {
  return useQuery({
    queryKey: ["upcomingCampaigns"],
    queryFn: async () => {
      const response = await getUpcomingCampaigns("/preorder/upcoming");
      return response;
    },
    staleTime: 1000 * 60 * 60 * 24 * 10,
    cacheTime: 1000 * 60 * 60 * 24 * 10,
    refetchOnWindowFocus: false,
  });
}

// Lấy danh sách các chiến dịch preorder
export function usePreOrderCampaigns() {
  return useQuery({
    queryKey: ["preOrderCampaigns"],
    queryFn: async () => {
      const response = await getPreOrderCampaigns(
        "/preorder/preorderCampaigns",
      );
      return response;
    },
    staleTime: 1000 * 60 * 60 * 24 * 10,
    cacheTime: 1000 * 60 * 60 * 24 * 10,
    refetchOnWindowFocus: false,
  });
}
