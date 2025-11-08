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
import { useCollectionSlideBySlug } from "@/hooks/useCollection";

function Home() {
  // Lấy dữ liệu electronic products
  const electronicQuery = useCollectionSlideBySlug(
    "cyberpunk-collection-phu-kien-scifi",
  );

  // Lấy dữ liệu accessory products
  const accessoryQuery = useCollectionSlideBySlug("nid-light");

  // Xử lý dữ liệu electronic products
  const electronicProducts =
    electronicQuery.data?.map((product) => ({
      ...product,
      variant: "default",
      show: true,
    })) || [];

  // Xử lý dữ liệu accessory products
  const accessoryProducts =
    accessoryQuery.data?.map((product) => ({
      ...product,
      variant: "default",
      show: true,
    })) || [];

  return (
    <div className={styles.wrapper}>
      {"BUILD MOIWS"}
      <Hero />
      <Carousel />
      <SlideImageDefault />
      {/* <Banner /> */}
      <SlideImageAlternative />
      <SlideHalfImageDefault />

      {/* Electronic Products Section với loading/error handling */}
      <ProductSection
        query={electronicQuery}
        products={electronicProducts}
        component={SlideHalfImageAlternative}
      />

      {/* Accessory Products Section với loading/error handling */}
      <ProductSection
        query={accessoryQuery}
        products={accessoryProducts}
        component={SlideHalfImageAlternative}
        props={{
          title: "PHỤ KIÊN ĐIỆN TỬ 2025",
          backGroundImage:
            "//theme.hstatic.net/1000069970/1001119059/14/block_home_category2.jpg?v=7149",
        }}
      />

      {/* <Workspace /> */}

      <Youtube />
      <Category />
      <Service />
      <BrandList />
      <Contact />
    </div>
  );
}

// Component helper để xử lý loading/error cho từng section
function ProductSection({ query, products, component: Component, props = {} }) {
  const { isLoading, error } = query;

  if (isLoading) {
    return (
      <div className={styles.sectionLoading}>
        <div className={styles.spinner}></div>
        <p>Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.sectionError}>
        <p>Không thể tải dữ liệu sản phẩm</p>
      </div>
    );
  }

  if (products.length === 0) {
    return null; // Ẩn section nếu không có sản phẩm
  }

  return <Component products={products} {...props} />;
}

export default Home;
