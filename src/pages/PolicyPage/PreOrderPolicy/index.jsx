import React from "react";
import images from "~/assets/images";
import PolicySection from "~/components/PolicySection";

function PreOrderPolicy() {
  const slideImage = [
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-01_1e6c6f4c07b34e669507dda39563e3f9.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-02_0224cb15e9eb4905bbbfaa068469a4ae.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-03_1c83b09b86c74e63a52c1d046773258b.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-04_0cbf555805d64337b53eeffe7b63adbc.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-05_fcade420ee0e46818750d06223edfd85.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-06_0478c46a92b44bdaa7bcca8585b1a01b.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-08_be017780e74a4eebb2fa3866bae87032.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-09_9ee82176113d4d96b3af3508f4a1f562.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-10_c43f8eeb319e4da9a7be28951138f330.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-11_37a902b75d6e4d4585d5c59eb2352b9a.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-12_2f8364a5a7df43a58706613821e06880.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-13_7320ea635e0e40f3a9576ede612181b6.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-24_0bbec8548cfe46aab5578d776a947d4b.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-25_fba774c488704918af1817451197058d.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-26_2e98e27b85de4dff999a63d300aaa60a.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-27_1e25be45b1d243cb9540c2bc317e4fbb.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-28_d5852bc70ae3473da74c308bbfd30274.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-29_ca115bbfdb964f2ebda4c6ed21a99db1.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-30_4886fd36d19445739a2e6f5ea9ab36b3.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-31_52beb68defa64e60b67a59fb668f67b9.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-32_177c35a3f81942fc9414e906dbd1ed1c.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-33_37a231c549254008b4de176287d619f2.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-34_0e1e13ec5eac47f6ada948536a4eac5c.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-35_6ac91b37a5404042902efd6c99f492ed.png",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/file/chinh_sach_pre-order_vth-36_a6b4d7fa9f8049d8880f9acf98989e28.png",
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
        title="CHÍNH SÁCH PRE-ORDER TẠI VAITHUHAY"
      />
    </>
  );
}

export default PreOrderPolicy;
