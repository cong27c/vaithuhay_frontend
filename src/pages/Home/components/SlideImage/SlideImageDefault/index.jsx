import Slider from "@/components/Slider";
import styles from "./SlideImageDefault.module.scss";
import images from "@/assets/images";
import Button from "@/components/Button";
import { getPreOrderCampaigns } from "@/Services/preOrderService";
import { useEffect, useState } from "react";

function SlideImageDefault() {
  const slidesData = [
    {
      title: "Blindbox Natra 2 Popmart - Hộp mù Natra 2 Ma động náo hải",
      status: "Số lượng đã đặt: 23/360",
      date: "Chiến dịch kết thúc: 12/04/2025",
      description: "",
      image: images.course4,
      variant: "default",
    },
    {
      title: "Blindbox Natra 3 Popmart - Hộp mù Natra 2 Ma động náo hải",
      status: "Số lượng đã đặt: 23/360",
      date: "Chiến dịch kết thúc: 12/04/2025",
      description: "",
      image: images.course1,
      variant: "default",
    },
    {
      title: "Blindbox Natra 2 Popmart - Hộp mù Natra 2 Ma động náo hải",
      status: "Số lượng đã đặt: 23/360",
      date: "Chiến dịch kết thúc: 12/04/2025",
      description: "",
      image: images.course2,
      variant: "default",
    },
    {
      title: "Blindbox Natra 2 Popmart - Hộp mù Natra 2 Ma động náo hải",
      status: "Số lượng đã đặt: 23/360",
      date: "Chiến dịch kết thúc: 12/04/2025",
      description: "",
      image: images.course3,
      variant: "default",
    },
    {
      title: "Blindbox Natra 2 Popmart - Hộp mù Natra 2 Ma động náo hải",
      status: "Số lượng đã đặt: 23/360",
      date: "Chiến dịch kết thúc: 12/04/2025",
      description: "",
      image: images.course5,
      variant: "default",
    },
    {
      title: "Blindbox Natra 2 Popmart - Hộp mù Natra 2 Ma động náo hải",
      status: "Số lượng đã đặt: 23/360",
      date: "Chiến dịch kết thúc: 12/04/2025",
      description: "",
      image: images.course2,
      variant: "default",
    },
    {
      title: "Blindbox Natra 2 Popmart - Hộp mù Natra 2 Ma động náo hải",
      status: "Số lượng đã đặt: 23/360",
      date: "Chiến dịch kết thúc: 12/04/2025",
      description: "",
      image: images.course3,
      variant: "default",
    },
    {
      title: "Blindbox Natra 3 Popmart - Hộp mù Natra 2 Ma động náo hải",
      status: "Số lượng đã đặt: 23/360",
      date: "Chiến dịch kết thúc: 12/04/2025",
      description: "",
      image: images.course1,
      variant: "default",
    },
  ];

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const data = await getPreOrderCampaigns();
        console.log("API Data:", data);

        setCampaigns(data || []);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Không thể tải danh sách sản phẩm sắp mở bán");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Đang tải...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
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
