import React from "react";
import FounderIn4 from "~/components/JobsDetailPage/JobListSection/FounderIn4";
import JobDescriptionSection from "~/components/JobsDetailPage/JobListSection/JobDescriptionSection";
import WorkspaceDevelopmentSection from "~/components/JobsDetailPage/JobListSection/WorkspaceDevelopmentSection";

function AffiliateOperation() {
  const requireList = [
    {
      title: "YÊU CẦU ỨNG VIÊN",
      listDesc: [
        "- Sinh viên các ngành Truyền thông, PR, Marketing .. . Hoặc yêu thích các công việc truyền thông, sáng tạo.",
        "- Thích, thường xuyên xem các nội dung trên Douyin, TikTok",
        "-  Có kỹ năng mềm: gửi email, kỹ năng đàm phán,...",
        "- Chủ động giao tiếp trong công việc",
        "-  Có laptop để làm việc.",
        "- Chịu khó, chịu được áp lực và đồng hành cùng doanh nghiệp.",
        "- Làm việc tối thiểu 7 buổi 1 tuần.",
        "- Biết quản lý kế hoạch, sắp xếp mức độ ưu tiên công việc.",
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

export default AffiliateOperation;
