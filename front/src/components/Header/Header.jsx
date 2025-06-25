import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");

  useEffect(() => {
    // localStorage에서 의뢰인 이름 가져오기
    const name = localStorage.getItem("name") || "Sample";
    setClientName(name);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("name");
        localStorage.removeItem("usertype");
        navigate("/");
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
        {clientName} 님, 환영합니다!
        <button
          className="ButtonAtLogo"
          style={{
            backgroundColor: '#2C2F31',
            fontWeight: 400,
            fontSize: '16px',
            width: '113.6px',
            height: '42.79px'
          }}
          onClick={handleLogout}
        >
          로그아웃
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
