import React from "react";
import { Link , useNavigate } from "react-router-dom";

import axios from "axios";
import { useState, useEffect} from "react";


export default function DesignerHeader() {
  const navigate = useNavigate();
  const [designerName, setDesignerName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name") || "Sample";
    setDesignerName(name);
  }, []);


  const handleLogout = async () => {
    try {
        const response = await fetch("http://localhost:8081/api/logout", {
            method: "POST",
            credentials: "include", // ✅ 세션 유지
        });

        if (response.ok) {
            localStorage.removeItem("id");
            localStorage.removeItem("name");
            localStorage.removeItem("usertype");
            navigate("/"); // ✅ 로그인 페이지로 이동
        } else {
            console.error("로그아웃 실패:", await response.text());
        }
    } catch (error) {
        console.error("로그아웃 요청 오류:", error);
    }
};
  return (
    <div className="LogoStuff" style={{ fontFamily: "'Pretendard', sans-serif" }}>
      <Link to="/designer/DesignerCosMain">  
        <img src="/image/image.png" alt="이미지없음" />
      </Link>
      <div className="Buttons1" style={{ marginLeft: 'auto', fontWeight: 400, fontSize: '16px' }}>
        {designerName} 디자이너님, 환영합니다!
        <button className="ButtonAtLogo" style={{ backgroundColor: '#2C2F31', fontWeight: 400, fontSize: '16px'}} onClick={handleLogout}>
          로그아웃
        </button>
        <Link to="/designer/DMyPage">
          <button className="ButtonAtLogo" style={{ backgroundColor: '#80A1BE', fontWeight: 400, fontSize: '16px' }}>
            마이페이지
          </button>
        </Link>
      </div>
    </div>
  );
}
