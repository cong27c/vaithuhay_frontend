import React from "react";
import CurrentActivitiesSection from "~/components/JobsDetailPage/JobListSection/CurrentActivitiesSection";
import FounderIn4 from "~/components/JobsDetailPage/JobListSection/FounderIn4";
import JobDescriptionSection from "~/components/JobsDetailPage/JobListSection/JobDescriptionSection";
import WorkspaceDevelopmentSection from "~/components/JobsDetailPage/JobListSection/WorkspaceDevelopmentSection";

function MarketingExecutive() {
  const requireList = [
    {
      title: "YÊU CẦU ỨNG VIÊN",
      listDesc: [
        "- Có cam kết thời gian gắn bó tối thiểu tại công ty 1 năm",
        "-   Cam kết hoàn thành nhiệm vụ trong thời gian được giao khi nhận việc tại Vaithuhay, sẵn sàng sửa sai & nhận trách nhiệm về mình",
        "- Ưu tiên 1: <strong>Thái độ</strong> Ưu tiên 2: <strong>Tư duy</strong> Ưu tiên 3: <strong>Kỹ năng</strong>",
        "- <strong>Quan trọng</strong>: Xác định được mong muốn - mục tiêu khi đi làm ở Vaithuhay là gì & trình bày trung thực nó cho người phỏng vấn để hai bên nắm vấn đề.",
        "-  Ưu tiên là sinh viên các ngành Truyền thông, PR, Marketing, QTKD. Thích & thường xuyên xem các nội dung quảng cáo. Có kỹ năng mềm: gửi email, excel, trình bày, kỹ năng đàm phán, nắm bắt được tâm lý khách hàng, chủ động giao tiếp trong công việc",
      ],
    },
  ];
  return (
    <>
      <JobDescriptionSection btnDownLoad={true} requests={requireList} />
      <FounderIn4 backGround={true} />
      <CurrentActivitiesSection />
      <WorkspaceDevelopmentSection backGround={true} />
    </>
  );
}

export default MarketingExecutive;
