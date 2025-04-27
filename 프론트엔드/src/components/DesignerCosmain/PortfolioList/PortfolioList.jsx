import React from "react";
import "./PortfolioList.css";

const portfolioData = [
  { title: "포트폴리오 제목", description: "나의 특성을 살린 작업입니다.", date: "2025-03-18" },
  { title: "포트폴리오 제목", description: "나의 특성을 살린 작업입니다.", date: "2025-03-18" },
  { title: "포트폴리오 제목", description: "나의 특성을 살린 작업입니다.", date: "2025-03-18" },
];

export default function PortfolioList() {
  return (
    <div className="portfolio-list">
      {portfolioData.map((item, index) => (
        <div key={index} className="portfolio-item">
          <div className="portfolio-image">
          </div>
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
