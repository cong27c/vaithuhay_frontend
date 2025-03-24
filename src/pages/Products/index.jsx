import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "~/config";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://api01.f8team.dev/api/products`)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => console.log(error));
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
