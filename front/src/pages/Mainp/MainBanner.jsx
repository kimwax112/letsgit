// MainBanner.js
import React, { useState, useEffect } from "react";
import { Carousel, Carousel2 } from "../../components";// 첫 번째 배너 컴포넌트, 두 번째 배너 컴포넌트


const MainBanner = ({ selectedItem }) => {
  const [bannerVersion, setBannerVersion] = useState(1);

  useEffect(() => {
    const randomVersion = Math.random() < 0.5 ? 1 : 2;
    setBannerVersion(randomVersion);
  }, []);

    const bannerItems = [
    {
      title: '최신 디자인 보러가기: 디자인 파일 업로드',
      description: '업로드한 파일로 제작된 디자인을 확인해보세요!',
      link: '/client/clothing-order',
      imageUrl: '/image/banner2-fileuploaddesign.png',
      designName: '(제목)원피스 디자인했던거 ㆍ 2025.02.11',
      backgroundColor: '#DAFFF1',
    },
    {
      title: selectedItem?.title || '최신 디자인 보러가기: 템플릿으로 디자인',
      description: selectedItem?.description || '템플릿을 이용해 제작한 디자인들을 살펴보세요!',
      link: selectedItem?.link || '/client/customer-support',
      imageUrl: selectedItem?.imageUrl || '/image/banner2-templatedesign.png',
      designName: selectedItem?.designName || '(제목)살랑 원피스 디자인들 ㆍ 2025.02.11',
      backgroundColor: selectedItem?.backgroundColor || '#F3E7FF',
    },
  ];

  return (
    <>
      {bannerVersion === 1 ? <Carousel /> : <Carousel2 selectedItem={selectedItem} />}
    </>
  );
};

export default MainBanner;