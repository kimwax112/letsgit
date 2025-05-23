import React, { useRef, useState } from "react";
import "./DesignerCosMain.css";
import DesignerLayout from "../../DesignerLayout";
import { MainBanner } from "../index"; 
import DesignerBanner from "../../components/DesignerCosmain/DesignerBanner/DesignerBanner";
import ProcessSteps from "../../components/DesignerCosmain/ProcessSteps/ProcessSteps";
import PortfolioList from "../../components/DesignerCosmain/PortfolioList/PortfolioList";

const DesignerMain = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX;
    const walk = (startX - x) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft + walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
      <div className="WholeWrapper">
        <DesignerBanner />
        <ProcessSteps />
        <div className="porfollist" style={{marginTop:'50px', marginBottom:'50px'}}>
          <h3>My PORTFOLIO</h3>
          <p style={{marginBottom:'40px'}}>나의 포트폴리오를 추가해 나의 특성을 나타내고 의뢰인에게 어필해보세요!</p>
          <PortfolioList />
        </div>
      </div>
  );
};

export default DesignerMain;