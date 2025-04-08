import Header from "./Header";
import { Outlet } from "react-router-dom";
import SvgIcon from "../icons/SvgIcon";

function JobsDetailPage() {
  const interest = [
    {
      title: "LƯƠNG THƯỞNG",
      desc1: `- Thỏa thuận tùy theo kinh nghiệm, trình độ và năng suất lao động.`,
      desc2: `Thưởng lễ, Tết ( lương T13), KPI, Best Seller... và các thưởng khác theo quy định Công ty.`,
      desc3: null,
      desc4: null,
      icon: SvgIcon.icon1,
    },
    {
      title: "ĐIỀU KIỆN VÀ NƠI LÀM VIỆC",
      desc1: `- Môi trường làm việc thân thiện, chia sẻ và có nhiều cơ hội thăng tiến.`,
      desc2: `- Nơi làm việc: Vaithuhay, 26 đường c12, phường 13, quận Tân Bình, Thành phố Hồ Chí Minh`,
      desc3: null,
      desc4: null,
      icon: SvgIcon.icon3,
    },
    {
      title: "CHẾ ĐỘ CHÍNH SÁCH",
      desc1: `- Được tham gia đầy đủ BHXH, BHYT, BHTN theo Luật Lao động hiện hành`,
      desc2: `- Thưởng lễ, tết và thưởng khác theo quy định của Công ty.`,
      desc3: null,
      desc4: null,
      icon: SvgIcon.icon2,
    },
    {
      title: "THỜI GIAN LÀM VIỆC",
      desc1: `Toàn thời gian cố định:`,
      desc2: `- Ngày làm việc 8 tiếng các ngày trong tuần từ thứ 2 đến thứ 6 (8h30 đến 17h30), thứ 7 từ 8h30 đến 12h, Chủ nhật nghỉ.`,
      desc3: `- Nghỉ các ngày lễ, Tết theo quy định của nhà nước.`,
      desc4: null,
      icon: SvgIcon.icon4,
    },
  ];

  return (
    <>
      <div>
        <Header array={interest} />
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default JobsDetailPage;
