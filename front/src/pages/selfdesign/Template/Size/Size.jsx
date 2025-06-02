import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Fabric/Fabric.css";
import Sizespec from "./Sizespec";
import Sizespecbutton from "./Sizespecbutton";
import { Sidebar, BreadCrumb } from "../../../../components";
import axios from "axios";  // Axios 임포트
import SizeBottom from "./SizeBottom";

const Size = () => {
  const [selectedSize, setSelectedSize] = useState(null);  // 선택된 사이즈
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  // "저장하기" 버튼 클릭 시
  const handleSave = async () => {
    if (!selectedSize) {
      alert("사이즈를 선택하시오");
    } else {
      // 선택한 사이즈를 세션에 저장
      sessionStorage.setItem("selectedSize", selectedSize);
      
      try {
        alert(`${selectedSize} 사이즈가 선택되었습니다.`);
        navigate("/client/FinalConfirmation");
      } catch (error) {
        console.error("저장 실패:", error);
        alert("저장에 실패했습니다.");
      }
    }
  };

  // localStorage에서 선택된 카테고리 읽기
  useEffect(() => {
    const storedClothing = localStorage.getItem("selectedClothing");
    if (storedClothing) {
      try {
        const clothing = JSON.parse(storedClothing);
        setCategory(clothing.category);
      } catch (e) {
        console.error("selectedClothing 파싱 오류:", e);
      }
    }
  }, []);

  // 카테고리에 따라 적절한 Size 컴포넌트 렌더링
  const renderSizeComponent = () => {
    switch (category) {
      case "상의": 
        return <Sizespec selectedSize={selectedSize} setSelectedSize={setSelectedSize} />;
      case "바지":
        return <SizeBottom selectedSize={selectedSize} setSelectedSize={setSelectedSize} />;
      case "아우터":
        // return <SizeOuter selectedSize={selectedSize} setSelectedSize={setSelectedSize} />;
      // 추가 카테고리
      case "원피스":
        return <div>원피스용 사이즈 입력 (구현 필요)</div>;
      case "스커트":
        return <div>스커트용 사이즈 입력 (구현 필요)</div>;
      default:
        return <div>선택된 카테고리가 없습니다.</div>;
    }
  };

  return (
    <div className="clothes-container">
      <div className="layout1">
        <div className="layout1">
          <aside>
            <Sidebar activePage={3} />
          </aside>

          <div className="content1">
            <BreadCrumb activePage={3} />
            <h3>3. 사이즈 스펙 입력</h3>
            <hr />
            <br />
            <br />

            {/* 사이즈 스펙 */}
            {renderSizeComponent()}
            
            <div className="footer button_size">
              <Sizespecbutton label="초기화" style={{ cursor: "pointer" }} onClick={() => setSelectedSize(null)} />
              <Sizespecbutton label="이전" onClick={() => navigate(-1)} />
              <Sizespecbutton label="저장하기" onClick={handleSave} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Size;