import React from "react";
import FounderIn4 from "~/components/JobsDetailPage/JobListSection/FounderIn4";
import JobDescriptionSection from "~/components/JobsDetailPage/JobListSection/JobDescriptionSection";
import JobProgressionSection from "~/components/JobsDetailPage/JobListSection/JobProgressionSection";
import WorkspaceDevelopmentSection from "~/components/JobsDetailPage/JobListSection/WorkspaceDevelopmentSection";

function ContentCreator() {
  const requireList = [
    {
      title: "YÊU CẦU ỨNG VIÊN",
      listDesc: [
        "- Thành thạo 1 trong số các công cụ thiết kế như: Photoshop, AI, Canva,...",
        "- Có khả năng chỉnh sửa Video là một lợi thế.",
        "- Có mắt thẩm mỹ, am hiểu về các quy luật thiết kế cơ bản.",
        "- Làm việc cẩn thận, tỉ mỉ, cầu toàn.",
        "- Có tinh thần cầu tiến, không ngại tiếp cận cái mới.",
        "- Tôn trọng deadline.",
        "- Có laptop riêng.",
      ],
    },
  ];
  return (
    <>
      <JobProgressionSection />
      <JobDescriptionSection requests={requireList} />
      <FounderIn4 backGround={true} />
      <WorkspaceDevelopmentSection />
    </>
  );
}

export default ContentCreator;
