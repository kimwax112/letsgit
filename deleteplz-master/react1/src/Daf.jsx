import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import TopCop from './top/TopCop';


export default function Daf() {
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const [message, setMessage] = useState("");

 
  const [isSignup, setIsSignup] = useState(false);
  const [confirmPasswd, setConfirmPasswd] = useState("");
  const [isidValid, setIsIdValid] = useState(false);
  const [idCheckMessage, setIdCheckMessage] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch(`http://localhost:8081/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, passwd }),
    });
  
    let data;
    try {
        data = await response.json();
    } catch (error) {
        console.error("Invalid JSON response:", error);
        setMessage("로그인실패");//서버에서 아무것도 응답하지 않음
        return;
    }

    if (!response.ok) {
        setMessage(data.message || "로그인 실패");
        return;
    }

    console.log(data);
    localStorage.setItem("name", data.name);
    setMessage("로그인 성공!");
    navigate('/welcome');

    
    };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!id.trim() && !passwd.trim()) {
      setMessage("회원가입 정보를 입력해 주십시오.");
      return;
    }

    if (!id.trim()) {
      setMessage("아이디가 입력되지 않았습니다.");
      return;
    }

    if (!passwd.trim()) {
      setMessage("비밀번호가 입력되지 않았습니다.");
      return;
    }
    /*if (!isUsernameValid) {
      setMessage("아이디 중복확인을 해주십시오.");
      return;
    }*/

    if (passwd !== confirmPasswd) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    const response = await fetch(`http://localhost:8081/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, passwd, email}),
    });

    const data = await response.json();
    if (response.ok && data.message === "회원가입 성공!") {
      setMessage(data.message);
      setIsSignup(false);
    } else {
      setMessage(data.message);
    }
  };
   // 회원가입 화면으로 이동 시 초기화
   const handleGoToSignup = () => {
    setId("");
    setPasswd("");
    setMessage("");
    setIsSignup(true);
  };

  // 로그인 화면으로 이동 시 초기화
  const handleGoToLogin = () => {
    setId("");
    setPasswd("");
    setMessage("");
    setConfirmPasswd("");
    setIsSignup(false);
    setIdCheckMessage("");
  };

  const handleCheckid = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/check-id/?id=${id}`
    );
    const data = await response.json();
    if (!id.trim()) {
      setMessage("입력 이후 중복확인을 진행하십시오");
        return;
    } else {
      if(data.exists){ 
       
        setIsIdValid(false);
        setIdCheckMessage("중복 Id입니다!");
      }else{
      setIsIdValid(true);
      setIdCheckMessage("사용 가능한 Id입니다.");
      }
    }
  };

  return (
     <div className="active-login-container">
      <div className="login">
        <h1>{isSignup ? "회원가입" : "로그인"}</h1>
        {isSignup ? (
          <form className="form1" onSubmit={handleSignupSubmit}>
            <input
              type="text"
              className={`input-text ${!isidValid ? "invalid" : ""}`}
              placeholder="아이디 입력"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button
              type="button"
              className="dupcheck"
              onClick={handleCheckid}
            >
              중복 확인
            </button>
            <span>{idCheckMessage}</span>
            <br />
          
            <input
              type="passwd"
              className="input-passwd"
              placeholder="비밀번호 입력"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
            />
            <br />
            <input
              type="passwd"
              className="input-passwd"
              placeholder="비밀번호 확인"
              value={confirmPasswd}
              onChange={(e) => setConfirmPasswd(e.target.value)}
            />
            <br />
            <input
              type="email"
              className="input-email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            {message && <p style={{ color: "red" }}>{message}</p>}
            <button type="submit" className="mpbutton">
              회원가입
            </button>
            <button
              type="button"
              className="mpbutton"
              onClick={handleGoToLogin}
            >
              돌아가기
            </button>
          </form>
        ) : (
          <form className="form1" onSubmit={handleLoginSubmit}>
            <input
              type="text"
              className="input-text"
              placeholder="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <br />
            <input
              type="passwd"
              className="input-passwd"
              placeholder="Passwd"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
            />
            <br />
            <p>성공여부:{message}</p>
            <button type="submit" className="mpbutton">
              로그인
            </button>
            <button
              type="button"
              className="mpbutton"
              onClick={handleGoToSignup}
              
            >
              회원가입
            </button>
            
          </form>
        )}
        
      </div>
    </div>
  )
}