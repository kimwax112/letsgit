import React, { useRef, useState } from "react";
import "./DesignerCosMain.css";
import DesignerLayout from "../../DesignerLayout";
import { MainBanner } from "../index"; 
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
    <DesignerLayout>
      <div className="WholeWrapper">
        <MainBanner />
        <ProcessSteps />
        <PortfolioList />
      </div>
    </DesignerLayout>
  );
};

export default DesignerMain;