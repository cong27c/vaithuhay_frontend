import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Card from "@/components/Admin/ui/Card";
import styles from "./Dashboard.module.scss";

const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 2000 },
  { month: "Apr", revenue: 2780 },
  { month: "May", revenue: 1890 },
  { month: "Jun", revenue: 2390 },
  { month: "Jul", revenue: 3490 },
];

const orderStatusData = [
  { name: "Completed", value: 400 },
  { name: "Pending", value: 300 },
  { name: "Cancelled", value: 100 },
  { name: "Shipped", value: 200 },
];

const COLORS = ["#4CAF50", "#FF9800", "#F44336", "#2196F3"];

const ChartSection = () => {
  return (
    <div className={styles.chartsGrid}>
      <Card title="Revenue Trend" className={styles.chartCard}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="month" stroke="#999" />
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
              dataKey="revenue"
              stroke="#FFD700"
              strokeWidth={2}
              dot={{ fill: "#FFD700" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Order Status Distribution" className={styles.chartCard}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={orderStatusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {orderStatusData?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#2A2A2A",
                border: "1px solid #555",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default ChartSection;
