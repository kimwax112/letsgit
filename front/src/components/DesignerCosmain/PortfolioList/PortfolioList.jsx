import React from "react";
import "./PortfolioList.css";

const portfolioData = [
  { 
    title: "모던 자켓 디자인", 
    description: "스타일리시한 모던 자켓 디자인 프로젝트", 
    date: "2025-03-18", 
    image: "/image/RecommendDesign/추천디자인1.jpg" 
  },
  { 
    title: "캐주얼 후디 컬렉션", 
    description: "편안하고 트렌디한 후디 디자인", 
    date: "2025-04-01", 
    image: "/image/RecommendDesign/추천디자인2.jpg" 
  },
  { 
    title: "오버핏 셔츠 디자인", 
    description: "자유로운 느낌의 오버핏 셔츠 디자인", 
    date: "2025-02-15", 
    image: "/image/RecommendDesign/추천디자인3.jpg" 
  },
];

export default function PortfolioList() {
  return (
    <div className="portfolio-list">
      {portfolioData.map((item, index) => (
        <div key={index} className="portfolio-item" style={{ backgroundImage: `url(${item.image})` }}>
          <div className="portfolio-content">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="date">{item.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
