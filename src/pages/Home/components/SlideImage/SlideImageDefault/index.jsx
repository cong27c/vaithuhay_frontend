import Slider from "@/components/Slider";
import styles from "./SlideImageDefault.module.scss";
import Button from "@/components/Button";
import { usePreOrderCampaigns } from "@/Hooks/usePreorder";

function SlideImageDefault() {
  const {
    data: campaignsData,
    isLoading: loading,
    error: queryError,
    refetch,
  } = usePreOrderCampaigns();

  // Lấy danh sách campaigns từ data
  const campaigns = campaignsData || [];

  // Xử lý lỗi
  const error = queryError
    ? "Không thể tải danh sách sản phẩm sắp mở bán"
    : null;

  // Hàm retry khi có lỗi
  const handleRetry = () => {
    refetch();
  };

  if (loading) {
    return <div className={styles.loading}>Đang tải...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        {error}
        <Button onClick={handleRetry} style={{ marginLeft: "10px" }}>
          Thử lại
        </Button>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return null;
  }

  return (
    <>
      <div className={styles.Slider}>
        <h2 className={styles.title}>
          CÙNG VAITHUHAY ĐẶT HÀNG VỀ TAY SỚM NHẤT
        </h2>
        <div className={styles["list-bar"]}>
          <Button tabButton size="small">{`DỰ ÁN THỊNH HÀNH`}</Button>
          <Button tabButton size="small">{`MỚI RA MẮT`}</Button>
          <Button tabButton size="small">{`MỞ BÁN ĐỢT 2`}</Button>
          <Button tabButton size="small">{`SẮP KẾT THÚC`}</Button>
          <Button tabButton size="small">{`SẮP VỀ HÀNG`}</Button>
          <Button tabButton size="small">{`XEM TẤT CẢ `}</Button>
        </div>

        <Slider slides={campaigns} type="image" />
      </div>
    </>
  );
}

export default SlideImageDefault;
