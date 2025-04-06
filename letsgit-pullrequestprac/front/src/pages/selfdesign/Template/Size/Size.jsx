import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Fabric/Fabric.css";
import Sizespec from "./Sizespec";
import Sizespecbutton from "./Sizespecbutton";
import { Sidebar, BreadCrumb } from "../../../../components";
import axios from "axios";  // Axios 임포트

const Size = () => {
  const [selectedSize, setSelectedSize] = useState(null);  // 선택된 사이즈
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
        navigate("/FinalConfirmation");
      } catch (error) {
        console.error("저장 실패:", error);
        alert("저장에 실패했습니다.");
      }
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
            <Sizespec selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
            
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
