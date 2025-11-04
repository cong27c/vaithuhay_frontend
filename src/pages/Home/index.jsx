import Banner from "./components/Banner";
import BrandList from "./components/BrandList";
import Carousel from "./components/Carousel";
import Category from "./components/Category";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Service from "./components/Service";
import SlideImageDefault from "./components/SlideImage/SlideImageDefault";
import styles from "./Home.module.scss";
import SlideHalfImageDefault from "./components/SlideHalfImages/SlideHalfImageDefault";
import SlideHalfImageAlternative from "./components/SlideHalfImages/SlideHalfImageAlternative";
import Workspace from "./components/Workspace";
import SlideImageAlternative from "./components/SlideImage/SlideImageAlternative";
import Youtube from "./components/Youtube";
import { useEffect, useState } from "react";
import { getByProductsSlug } from "@/Services/collectionService";

function Home() {
  const [electronicProducts, setElectronicProducts] = useState([]);
  const [accessoryProducts, setAccessoryProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const slug = "cyberpunk-collection-phu-kien-scifi";
      const data = await getByProductsSlug(slug);

      // Thêm field variant cho mỗi sản phẩm
      const updatedProducts = data?.map((product) => ({
        ...product,
        variant: "default",
        show: true,
      }));

      console.log(updatedProducts);
      setElectronicProducts(updatedProducts);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const slug = "nid-light";
      const data = await getByProductsSlug(slug);

      const updatedProducts = data?.map((product) => ({
        ...product,
        variant: "default",
        show: true,
      }));

      setAccessoryProducts(updatedProducts);
    };

    fetchData();
  }, []);
  return (
    <div className={styles.wrapper}>
      <Hero />
      <Carousel />
      <SlideImageDefault />
      <Banner />
      <SlideImageAlternative />
      <SlideHalfImageDefault />
      <SlideHalfImageAlternative products={electronicProducts} />
      <SlideHalfImageAlternative
        title="PHỤ KIÊN ĐIỆN TỬ 2025"
        backGroundImage="//theme.hstatic.net/1000069970/1001119059/14/block_home_category2.jpg?v=7149"
        products={accessoryProducts}
      />
      <Workspace />
      <SlideHalfImageAlternative
        title="SẢN PHẨM CHƯA TỪNG XUẤT HIỆN TRÊN THỊ TRƯỜNG"
        backGroundImage="//theme.hstatic.net/1000069970/1001119059/14/block_home_category3.jpg?v=7149"
      />
      <Youtube />
      <Category />
      <Service />
      <BrandList />
      <Contact />
    </div>
  );
}
export default Home;
