import styles from "./JobListSection.module.scss";
import JobBenefitsSection from "./JobBenefitsSection";
import CurrentActivitiesSection from "./CurrentActivitiesSection";
import JobDescriptionSection from "./JobDescriptionSection";
import WorkspaceDevelopmentSection from "./WorkspaceDevelopmentSection";
import JobProgressionSection from "./JobProgressionSection";

function JobListSection({ sections = [] }) {
  return (
    <div className={styles.JobListSection}>
      {sections.map((section, index) => (
        <div key={index}>{section}</div>
      ))}
    </div>
  );
}

export default JobListSection;
