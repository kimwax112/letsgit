import React from "react";
import "./DesignerPortfolio.css";

const DesignerPortfolio = () => {
    const imageSrc = ""; // 이미지 경로가 없을 경우 빈 문자열

    return (
        <div className="DesignerPorfol">
            <div className="DesignerImg">
                {/* imageSrc가 없을 경우 기본 이미지 사용 */}
                <img src={imageSrc || "/images/default-image.jpg"} alt="디자이너 이미지" />
            </div>
            <h3 className="DesignerPorfol-title">누구누구 디자이너님</h3>
            <p className="DesignerPorfol-text">
                #상의 #하의 #자켓
            </p>
        </div>
    );
};

export default DesignerPortfolio;
