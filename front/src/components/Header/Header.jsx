import React from "react";
import { Link , useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import axios from "axios";


export default function Header() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
        const response = await fetch("http://localhost:8081/api/logout", {
            method: "POST",
            credentials: "include", // ✅ 세션 유지
        });

        if (response.ok) {
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
      <Link to="/client/Cosmain">  
        <img src="/image/image.png" alt="이미지없음" />
      </Link>
      <div className="Buttons1" style={{ marginLeft: 'auto', fontWeight: 400, fontSize: '16px' }}>
        Sample 님, 환영합니다!
        <button className="ButtonAtLogo" style={{ backgroundColor: '#2C2F31', fontWeight: 400, fontSize: '16px'}} onClick={handleLogout}>
          로그아웃
        </button>
        <button className="ButtonAtLogo" style={{ backgroundColor: '#4A6171', fontWeight: 400, fontSize: '16px' }}>
          고객센터
        </button>
        <Link to="/client/MyInfo">
          <button className="ButtonAtLogo" style={{ backgroundColor: '#80A1BE', fontWeight: 400, fontSize: '16px' }}>
            마이페이지
          </button>
        </Link>
      </div>
    </div>
  );
}
