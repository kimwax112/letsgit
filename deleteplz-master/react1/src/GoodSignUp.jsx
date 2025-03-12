import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import './GoodSignUpcss.css';

export default function GoodSignUp() {
      const navigate = useNavigate();
    
const [signupEmail, setSignupEmail] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  useEffect(() => {
    
    setSignupEmail(localStorage.getItem("signupEmail") || "이메일 없음");
    setSignupUsername(localStorage.getItem("signupUsername") || "아이디 없음");
  }, []);
  return (
    <div className='divmcover'>
    <div className='loginWrapper'>
    <div className='divm-wrapperr'>
      <div className='divmmm'>
      <p style={{ fontSize: "30px", textAlign: "center" }}>
              <span style={{ fontWeight: "bold" }}>환영합니다!</span>
              <br />
              <span style={{ fontSize: "20px" }}>
                디자인사이 계정 가입이 완료되었습니다.
                <br />
                디자인사이 하나로 다양한 서비스를 편리하게 이용해 보세요!
                <br />
              </span>
              <br />
              <div className="ProfileIcon"></div>
              <strong>{signupEmail}</strong> <br />
              <strong>{signupUsername}</strong>
            </p>
            <br />
            <div style={{ textAlign: "center", paddingRight: "50px", paddingLeft: "50px" }}>
              <font size="2">서비스를 의뢰하고 싶다면</font>
              <br />
              <button
                style={{ marginTop: "10px", backgroundColor: "#BFD7EE", width: "500px" }}
                className="mainbarooo" onClick={() => navigate('/CosMain')}
              >
                시작하기
              </button>
              <br />
            </div>
       

       
      </div>

    </div>
    </div>

  </div>
  )
}
