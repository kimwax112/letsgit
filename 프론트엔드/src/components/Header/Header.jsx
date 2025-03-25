import React from "react";
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <div className="LogoStuff" style={{ fontFamily: "'Pretendard', sans-serif" }}>
      <Link to="/client/Cosmain">  
        <img src="/image/image.png" alt="이미지없음" />
      </Link>
      <div className="Buttons1" style={{ marginLeft: 'auto', fontWeight: 400, fontSize: '16px' }}>
        Sample 님, 환영합니다!
        <button className="ButtonAtLogo" style={{ backgroundColor: '#2C2F31', fontWeight: 400, fontSize: '16px'}}>
          로그아웃
        </button>
        <button className="ButtonAtLogo" style={{ backgroundColor: '#4A6171', fontWeight: 400, fontSize: '16px' }}>
          고객센터
        </button>
        <Link to="/client/MyPage">
          <button className="ButtonAtLogo" style={{ backgroundColor: '#80A1BE', fontWeight: 400, fontSize: '16px' }}>
            마이페이지
          </button>
        </Link>
      </div>
    </div>
  );
}
