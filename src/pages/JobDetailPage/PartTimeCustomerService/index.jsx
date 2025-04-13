import React from "react";
import FounderIn4 from "~/components/JobsDetailPage/JobListSection/FounderIn4";
import JobDescriptionSection from "~/components/JobsDetailPage/JobListSection/JobDescriptionSection";
import WorkspaceDevelopmentSection from "~/components/JobsDetailPage/JobListSection/WorkspaceDevelopmentSection";

function PartTimeCustomerService() {
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
