import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "~/Services/productService";

function ProductDetail() {
  const [product, setProduct] = useState({});

  const params = useParams();

  useEffect(() => {
    (async () => {
      const res = await getOne(params.slug);
      setProduct(res);
    })();
  }, [params.slug]);
  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt="" />
    </div>
  );
}

export default ProductDetail;
