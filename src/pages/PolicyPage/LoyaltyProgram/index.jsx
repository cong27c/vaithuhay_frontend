import React from "react";
import images from "@/assets/images";
import PolicySection from "@/components/PolicySection";

function LoyaltyProgram() {
  const slideImage = [
    {
      image:
        "https://file.hstatic.net/1000069970/file/loyaly_vaithuhay_5f80096a77b74fb692b97bf60e6ff242.jpg",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chuong_trinh_loyalty-02_04c59af3a0dc4dc1b040f4a12df68eee_1024x1024.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chuong_trinh_loyalty-03_3f777e7f0ba941c88491f8a8f2ccb0d6_1024x1024.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chuong_trinh_loyalty-04_7f00af4eb6ae4f14b28b3e86e94eccf6_1024x1024.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chuong_trinh_loyalty-05_5f976e555f5f4cf1889eb44efcc6d7f4_1024x1024.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chuong_trinh_loyalty-06_ae1cb66166cd46f0aff929044ed40af7_1024x1024.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chuong_trinh_loyalty-07_203828486aae4922a15e223111de5305_1024x1024.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chuong_trinh_loyalty-08_428a09a8db09494a9c9cdaf37ffa40d4_1024x1024.png",
    },
  ];
  const listItem = [
    {
      image:
        "https://file.hstatic.net/1000069970/article/dien-thoai-man-hinh-e-ink-kingrow-k1__3__d4dd888acc664a3dad23233b127cae59_medium.png",
      desc: "Điện thoại màn hình E-ink Kingrow K1 có chức năng bảo vệ mắt",
    },
    {
      image: "https://file.hstatic.net/1000069970/article/3_medium.jpg",
      desc: "Ốp lưng điện thoại EYE Smartcase - Biến iPhone thành Android",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/article/e_pad_may_tinh_bang_android_e_ink3_fd92e8450922408dbf9bb7ce83662ad9_medium.jpg",
      desc: "Tính năng thông minh của máy tính bảng màn hình E-Ink E-PAD",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/article/narwal1_a353728f8eab4e70970f64d9fb75145e_medium.jpg",
      desc: "Review Robot hút bụi lau nhà Narwal đáng mua",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/article/xit-chong-tham-cho-giay_ff893b7842a7446884327fdcfdfafe0d_medium.jpg",
      desc: "Mách bạn cách bảo quản giày da an toàn và hiệu quả",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/article/2_3707fe29830f4ea9b47499adb0cdace3_medium.jpg",
      desc: "Lộ diện xúc xắc dạ quang đèn LED chất nhất quả đất",
    },
    {
      image: "https://file.hstatic.net/1000069970/article/sneakers_medium.jpg",
      desc: "Bảo vệ giày dép bằng bọc giày đi mưa cho ngày mưa dễ dàng",
    },
  ];

  const slidesData = [
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course2,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course1,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course4,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course5,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course5,
      variant: "default",
    },
  ];
  return (
    <>
      <PolicySection
        slideImage={slideImage}
        listItem={listItem}
        slidesData={slidesData}
        title="Chương trình thành viên Loyalty tại Vaithuhay"
      />
    </>
  );
}

export default LoyaltyProgram;
