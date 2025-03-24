import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const [product, setProduct] = useState({});

  const params = useParams();

  console.log(params.slug);
  useEffect(() => {
    fetch(`https://api01.f8team.dev/api/products/${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.log(error));
  }, [params.slug]);
  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt="" />
    </div>
  );
}

export default ProductDetail;
