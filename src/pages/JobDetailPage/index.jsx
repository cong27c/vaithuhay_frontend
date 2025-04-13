import { JobFooterSection, JobIntroSection } from "~/components/JobsDetailPage";
import { Outlet } from "react-router-dom";
import SvgIcon from "~/components/icons/SvgIcon";

function JobDetailPage() {
  const interest = [
    {
      title: "LƯƠNG THƯỞNG",
      listDesc: [
        `- Thỏa thuận tùy theo kinh nghiệm, trình độ và năng suất lao động.`,
        `- Thưởng lễ, Tết ( lương T13), KPI, Best Seller... và các thưởng khác theo quy định Công ty.`,
      ],
      icon: SvgIcon.icon1,
    },
    {
      title: "ĐIỀU KIỆN VÀ NƠI LÀM VIỆC",
      listDesc: [
        `- Môi trường làm việc thân thiện, chia sẻ và có nhiều cơ hội thăng tiến.`,
        `- Nơi làm việc: Vaithuhay, 26 đường c12, phường 13, quận Tân Bình, Thành phố Hồ Chí Minh`,
      ],
      icon: SvgIcon.icon3,
    },
    {
      title: "CHẾ ĐỘ CHÍNH SÁCH",
      listDesc: [
        `- Được tham gia đầy đủ BHXH, BHYT, BHTN theo Luật Lao động hiện hành, chia sẻ và có nhiều cơ hội thăng tiến.`,
        `- Thưởng lễ, tết và thưởng khác theo quy định của Công ty.`,
      ],
      icon: SvgIcon.icon2,
    },
    {
      title: "THỜI GIAN LÀM VIỆC",
      listDesc: [
        `- Toàn thời gian cố định:`,
        `- Ngày làm việc 8 tiếng các ngày trong tuần từ thứ 2 đến thứ 6 (8h30 đến 17h30), thứ 7 từ 8h30 đến 12h, Chủ nhật nghỉ.`,
        `- Nghỉ các ngày lễ, Tết theo quy định của nhà nước.`,
      ],
      icon: SvgIcon.icon4,
    },
  ];
  return (
    <div>
      <JobIntroSection array={interest} />
      <main>
        <Outlet />
      </main>
      <JobFooterSection />
    </div>
  );
}

export default JobDetailPage;
