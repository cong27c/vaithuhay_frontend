"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Card from "@/components/Admin/ui/Card";
import styles from "./Analytics.module.scss";

const analyticsData = [
  { date: "Jan 1", visitors: 400, pageViews: 2400, bounceRate: 24 },
  { date: "Jan 2", visitors: 300, pageViews: 1398, bounceRate: 22 },
  { date: "Jan 3", visitors: 200, pageViews: 9800, bounceRate: 29 },
  { date: "Jan 4", visitors: 278, pageViews: 3908, bounceRate: 20 },
  { date: "Jan 5", visitors: 189, pageViews: 4800, bounceRate: 22 },
];

const Analytics = () => {
  return (
    <div className={styles.analyticsPage}>
      <div className={styles.header}>
        <h1>Analytics</h1>
        <p>Track your website performance and user behavior</p>
      </div>

      <div className={styles.chartsGrid}>
        <Card title="Visitors & Page Views" className={styles.chartCard}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="date" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2A2A2A",
                  border: "1px solid #555",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#FFD700"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="pageViews"
                stroke="#2196F3"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Bounce Rate Trend" className={styles.chartCard}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="date" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2A2A2A",
                  border: "1px solid #555",
                }}
              />
              <Legend />
              <Bar dataKey="bounceRate" fill="#FF9800" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
