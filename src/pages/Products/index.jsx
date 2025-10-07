import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "@/config";
import { getAll } from "@/Services/productService";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getAll();
      setProducts(res.data);
    })();
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
