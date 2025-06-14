import React, { useState, useEffect } from 'react';
import './Carousel.css'; // 스타일 시트

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const features = [
  {
    title: '디자인 파일 업로드',
    description: '나만의 디자인 파일을 업로드하여 옷을 디자인하세요.',
    link: '/client/file-upload',
    image: '/image/banner-design file.png',
    backgroundColor: '#DAFFF1',
  },
  {
    title: '템플릿으로 디자인',
    description: '사이트에서 제공하는 템플릿을 선택하여 쉽게 디자인하세요.',
    link: '/client/clothes',
    image: '/image/banner-templet.png',
    backgroundColor: '#F3E7FF',
  },
];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + features.length) % features.length
    );
  };

  // 점 클릭 시 해당 슬라이드로 이동하는 함수
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

   // 자동 슬라이드 기능
   useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000); // 3초마다 슬라이드 변경

    // 컴포넌트가 언마운트될 때 interval을 정리
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="carousel-container" style={{ backgroundColor: features[currentIndex].backgroundColor }}>
      <div className="carousel">
        <div className="carousel-item">
          <img src={features[currentIndex].image} alt={features[currentIndex].title} />
          <div className="carousel-content">
            <h3>{features[currentIndex].title}</h3>
            <p>{features[currentIndex].description}</p>
            <a href={features[currentIndex].link} className="carousel-button">자세히 보기</a>

            {/* 페이지네이션 점 */}
            <div className="dots-container">
              {features.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
