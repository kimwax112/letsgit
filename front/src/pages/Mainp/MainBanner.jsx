// MainBanner.js
import React, { useState, useEffect } from "react";
import { Carousel, Carousel2 } from "../../components";// 첫 번째 배너 컴포넌트, 두 번째 배너 컴포넌트


const MainBanner = ({ selectedItem }) => {
  const [bannerVersion, setBannerVersion] = useState(1);

  useEffect(() => {
    const randomVersion = Math.random() < 0.5 ? 1 : 2;
    setBannerVersion(randomVersion);
  }, []);

  return (
    <>
      {bannerVersion === 1 ? <Carousel /> : <Carousel2 selectedItem={selectedItem} />}
    </>
  );
};

export default MainBanner;