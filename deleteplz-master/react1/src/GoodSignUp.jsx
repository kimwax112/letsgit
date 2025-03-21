import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import './GoodSignUpcss.css';

export default function GoodSignUp() {
      const navigate = useNavigate();
    
const [signupEmail, setSignupEmail] = useState("");
  const [signupName, setSignupName] = useState("");
  useEffect(() => {
    const storedEmail = localStorage.getItem("signupEmail") || "이메일 없음";
    const storedName = localStorage.getItem("signupName") || "이름 없음";
  
    setSignupEmail(storedEmail);
    setSignupName(storedName);
  
    // ✅ 사용자 이름을 localStorage에 저장 (헤더에서 사용)
    localStorage.setItem("name", storedName);
  }, []);
  return (
    <div className='divmcover'>
    <div className='loginWrapper'>
    <div className='divm-wrapperr'>
      <div className='divmmm'>
      <div style={{ textAlign: "center" }}>
  <p style={{ fontSize: "30px" }}>
    <span style={{ fontWeight: "bold" }}>환영합니다!</span>
  </p>
  <p style={{ fontSize: "20px" }}>
    디자인사이 계정 가입이 완료되었습니다.
    <br />
    디자인사이 하나로 다양한 서비스를 편리하게 이용해 보세요!
  </p>
  
  {/* ✅ div를 p 태그 바깥으로 이동 */}
  <div className="ProfileIcon"></div>  
  <strong>{signupEmail}</strong> <br />
  <strong>{signupName}</strong>
  
  <div style={{ textAlign: "center", paddingRight: "50px", paddingLeft: "50px" }}>
    <font size="2">서비스를 의뢰하고 싶다면</font>
    <br />
    <button
      style={{ marginTop: "10px", backgroundColor: "#BFD7EE", width: "500px" }}
      className="mainbarooo" 
      onClick={() => navigate('/CosMain')}
    >
      시작하기
    </button>
  </div>
</div>

       

       
      </div>

    </div>
    </div>

  </div>
  )
}
