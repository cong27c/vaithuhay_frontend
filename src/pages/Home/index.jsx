import Banner from "./components/Banner";
import BrandList from "./components/BrandList";
import Carousel from "./components/Carousel";
import Category from "./components/Category";
import Hero from "./components/Hero";
import Service from "./components/Service";
import Slider1 from "./components/Slider1";
import Slider2 from "./components/Slider2";
import Slider3 from "./components/Slider3";
import Slider4 from "./components/Slider4";
import Slider5 from "./components/Slider5";
import Slider6 from "./components/Slider6";
// import Slider6 from "./components/Slider6";
import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.wrapper}>
      <Hero />
      <Carousel />
      <Slider1 />
      <Banner />
      <Slider2 />
      <Slider3 />
      <Slider4 />
      <Slider4
        title="ƯU ĐÃI ĐẦU NĂM – SĂN NGAY GIÁ SỐC"
        backGroundImage="//theme.hstatic.net/1000069970/1001119059/14/block_home_category2.jpg?v=7149"
      />
      <Slider5 />
      <Slider4
        title="SẢN PHẨM CHƯA TỪNG XUẤT HIỆN TRÊN THỊ TRƯỜNG"
        backGroundImage="//theme.hstatic.net/1000069970/1001119059/14/block_home_category3.jpg?v=7149"
      />
      <Slider6 />
      <Category />
      <Service />
      <BrandList />
    </div>
  );
}
export default Home;
