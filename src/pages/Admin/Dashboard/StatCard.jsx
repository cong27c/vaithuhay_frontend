import { ArrowUp, ArrowDown } from "lucide-react";
import Card from "@/components/Admin/ui/Card";
import styles from "./Dashboard.module.scss";

const StatCard = ({ title, value, change, icon: Icon, trend = "up" }) => {
  return (
    <Card className={styles.statCard}>
      <div className={styles.statHeader}>
        <div>
          <p className={styles.statTitle}>{title}</p>
          <h3 className={styles.statValue}>{value}</h3>
        </div>
        <div className={`${styles.statIcon} ${styles[trend]}`}>
          <Icon size={28} />
        </div>
      </div>
      <div className={`${styles.statChange} ${styles[trend]}`}>
        {trend === "up" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        <span>{change}% from last month</span>
      </div>
    </Card>
  );
};

export default StatCard;
