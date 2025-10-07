import React from "react";
import SvgIcon from "@/components/icons/SvgIcon";
import FounderIn4 from "@/components/JobsDetailPage/JobListSection/FounderIn4";
import JobDescriptionSection from "@/components/JobsDetailPage/JobListSection/JobDescriptionSection";
import WorkspaceDevelopmentSection from "@/components/JobsDetailPage/JobListSection/WorkspaceDevelopmentSection";

function PartTimeCustomerService() {
  const interest = [
    {
      title: "LƯƠNG THƯỞNG",
      desc1: `Thu nhập: 3-5M/Tháng.`,
      desc2: `- x2 lương vào ngày làm cuối tuần khi đạt KPI/ngày.`,
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
  ];
  const requireList = [
    {
      title: "YÊU CẦU ỨNG VIÊN",
      listDesc: [
        "- Trách nhiệm và kỷ luật",
        "-  Có laptop cá nhân",
        "- Làm việc được T7 , CN , Lễ , Tết",
      ],
    },
    {
      title: "CHÍNH SÁCH ĐÃI NGỘ",
      listDesc: [
        "- Hình thức làm việc:",
        "- sắp xếp linh động theo ca",
        "- Thưởng KPI theo quý",
      ],
    },
  ];
  return (
    <>
      <JobDescriptionSection requests={requireList} />
      <FounderIn4 />
      <WorkspaceDevelopmentSection />
    </>
  );
}

export default PartTimeCustomerService;
