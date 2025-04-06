import React from "react";
import "./RecommendedDesign.css";

const RecommendedDesign = () => {
    const imageSrc = ""; // 이미지 경로가 없을 경우 빈 문자열

    return (
        <div className="RecommDes">
            <div className="RecommDesImg">
                {/* 이미지 경로가 없을 경우 기본 이미지로 대체 */}
                <img src={imageSrc || "/images/default-image.jpg"} alt="추천 디자인 이미지" />
            </div>
            <div className="RecommDes2">
                <h3 className="RecommDes-title">상의 디자인</h3>
                <p className="RecommDes-text">
                    #상의 #자켓 #원단
                </p>
            </div>
        </div>
    );
};

export default RecommendedDesign;
