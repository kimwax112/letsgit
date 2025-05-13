import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import './Welcomecss.css';

export default function Welcome() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const [message, setMessage] = useState("");

  const [isSignup, setIsSignup] = useState(false);
  const [confirmPasswd, setConfirmPasswd] = useState("");
  const [isidValid, setIsidValid] = useState(false);
  const [idCheckMessage, setidCheckMessage] = useState("");
  const [email, setEmail] = useState("");

  // ✅ 세션 확인 후 자동 로그인 처리
  const checkSession = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/session", {
        method: "POST",  // ✅ GET → POST로 변경
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.id) {
          sessionStorage.setItem("id", data.id);
          navigate("/CosMain");
        }
      }
    } catch (error) {
      console.error("세션 확인 실패:", error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // ✅ 로그인 요청 처리
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, passwd }),
      });
  
      // ✅ 서버 응답이 정상인지 확인
      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || "로그인 실패");
        return;
      }
  
      // ✅ JSON 데이터 파싱
      const data = await response.json();
      console.log("로그인 성공:", data);
  
      // ✅ 로그인 성공 시 로컬 스토리지에 저장 후 페이지 이동
      localStorage.setItem("id", data.id);
      localStorage.setItem("name", data.name);
      setMessage("로그인 성공!");
  
      if (data.usertype === "designer") {
        navigate("/designer/DesignerCosMain");
      } else if (data.usertype === "client") {
          navigate("/client/Cosmain");
      } else {
          navigate("/ChatRoomList"); // 기본 페이지
      }
    } catch (error) {
        console.error("로그인 요청 오류:", error);
        setMessage("로그인 요청에 실패했습니다.");
    }
  };

  // ✅ 회원가입 요청 처리
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!id.trim() || !passwd.trim()) {
      setMessage("회원가입 정보를 입력해 주십시오.");
      return;
    }

    if (passwd !== confirmPasswd) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    const response = await fetch("http://localhost:8081/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, passwd, email }),
    });

    const data = await response.json();
    if (response.ok && data.message === "회원가입 성공!") {
      setMessage(data.message);
      setIsSignup(false);
    } else {
      setMessage(data.message);
    }
  };

  // ✅ 아이디 중복 확인
  const handleCheckid = async () => {
    if (!id.trim()) {
      setidCheckMessage("입력 이후 중복확인을 진행하십시오");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/check-id/?id=${id}`
    );
    const data = await response.json();

    if (data.exists) {
      setIsidValid(false);
      setidCheckMessage("중복 Id입니다!");
    } else {
      setIsidValid(true);
      setidCheckMessage("사용 가능한 Id입니다.");
    }
  };

  return (
    <div>
      <div className='divmcover'>
        <div className='loginWrapper'>
          <div className='divm-wrapperr'>
            <div className='divmm'>
              <br/><br/>
              <p style={{textAlign:'left', fontSize:'30px'}}>
                어서오세요.<br/>
                디자인 사이입니다.
              </p>
              <p style={{ textAlign: 'left', fontSize: '15px', opacity: 0.8 }}>
                여러 옷들을 디자인 해보세요!
              </p>  
              <br/>
              <form className="form1" onSubmit={handleLoginSubmit}>
                <input  
                  value={id} 
                  className="loginput" 
                  type="text" 
                  placeholder="아이디 입력" 
                  onChange={(e) => setId(e.target.value)}
                />
                <br/>
                <input 
                  value={passwd} 
                  className="loginput" 
                  type="password" // ✅ 보안 강화
                  placeholder="   비밀번호 입력" 
                  onChange={(e) => setPasswd(e.target.value)}
                />
                <br/>
                <div style={{ display: 'flex', alignItems: 'center', textAlign:'left', marginTop: '10px'}}>
                  <input type="checkbox" />
                  <p style={{ marginLeft: '8px', fontSize: '15px'}}>아이디 저장</p>
                </div>
                <br/>
                <button 
                  type='submit' 
                  style={{marginTop:'10px', fontSize: '20px', boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.1)'}} 
                  className='mainbaroo'
                >
                  로그인
                </button>
              </form>
              <div className='MenuBarr'> 
                <nav>
                  <ul>
                    <li><a href='#'>아이디 찾기</a></li>
                    <li style={{paddingLeft:'5px',paddingRight:'5px'}}><a href='#'>비밀번호 찾기</a></li>
                    <li><a href='#'>회원가입</a></li>
                  </ul>
                </nav>            
              </div>
            </div>
          </div>

          <div className='extra-sectionn' style={{textAlign: "center"}}>
            <span style={{ margin: '0 10px', fontSize: '14px', textAlign: 'left', fontSize: '15px', opacity: 0.8 }}>
              SNS 계정으로 로그인<br/>{message}
            </span>
            <hr style={{ width: '70%', border: '1px solid #ccc', margin: '0 auto', marginTop:'5px'}} />
            
            <div className="extra-sectionn-btn">
              <button className='mainbaroo2' 
                style={{backgroundColor:'#03C75A', color:'white', marginRight: '20px'}}
              >Naver</button>      

              <button className='mainbaroo2' 
                style={{backgroundColor:'#FFE812', marginRight: '20px'}}
              >kakao</button>

              <button className='mainbaroo2' 
                style={{backgroundColor:'grey', color:'white', marginRight: '20px'}}
              >Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}