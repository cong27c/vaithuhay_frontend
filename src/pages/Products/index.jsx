import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "~/config";
import productService from "~/utils/productService";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await productService.getAll();
      console.log(res);
      setProducts(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`${config.routes.products}/${product.slug}`}>
              {product.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
