import Card from "@/components/Admin/ui/Card";
import styles from "./Dashboard.module.scss";

const topProducts = [
  { id: 1, name: "Wireless Headphones", sales: 1250, revenue: "$12,500" },
  { id: 2, name: "USB-C Cable", sales: 980, revenue: "$4,900" },
  { id: 3, name: "Phone Case", sales: 750, revenue: "$3,750" },
  { id: 4, name: "Screen Protector", sales: 620, revenue: "$1,860" },
  { id: 5, name: "Power Bank", sales: 540, revenue: "$5,400" },
];

const TopProducts = () => {
  return (
    <Card title="Top Selling Products" className={styles.topProductsCard}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Sales</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {topProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.sales}</td>
              <td className={styles.revenue}>{product.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default TopProducts;
