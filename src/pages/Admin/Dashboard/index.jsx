import {
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiPackage,
} from "react-icons/fi";
import Card from "@/components/Admin/ui/Card";
import Button from "@/components/Admin/ui/Button";

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </p>
        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
        <p
          className={`text-sm ${change >= 0 ? "text-green-600" : "text-red-600"} mt-1`}
        >
          {change >= 0 ? "+" : ""}
          {change}% from last month
        </p>
      </div>
      <div className={`rounded-lg p-3 ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </Card>
);

const Dashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: 12.5,
      icon: FiDollarSign,
      color: "bg-green-500",
    },
    {
      title: "Orders",
      value: "1,234",
      change: 8.2,
      icon: FiShoppingCart,
      color: "bg-blue-500",
    },
    {
      title: "Customers",
      value: "8,567",
      change: 15.3,
      icon: FiUsers,
      color: "bg-purple-500",
    },
    {
      title: "Products",
      value: "2,345",
      change: -2.1,
      icon: FiPackage,
      color: "bg-yellow-500",
    },
  ];

  const topProducts = [
    { id: 1, name: "Wireless Headphones", sales: 234, revenue: "$12,345" },
    { id: 2, name: "Smart Watch", sales: 189, revenue: "$9,876" },
    { id: 3, name: "Laptop Stand", sales: 156, revenue: "$7,890" },
    { id: 4, name: "Phone Case", sales: 143, revenue: "$2,345" },
    { id: 5, name: "USB-C Cable", sales: 128, revenue: "$1,234" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <Button>Generate Report</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats?.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Chart Placeholder */}
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Revenue Overview
          </h3>
          <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              Line Chart Component
            </p>
          </div>
        </Card>

        {/* Orders Chart Placeholder */}
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Orders Status
          </h3>
          <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              Pie Chart Component
            </p>
          </div>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Top Selling Products
          </h3>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Sales
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {topProducts?.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {product.sales}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {product.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
