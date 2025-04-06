import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import './Welcomecss.css';

export default function Welcome() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);  // ✅ 아이디 저장 체크 여부

  // ✅ 세션 확인 후 자동 로그인 처리
  const checkSession = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/session", {
        method: "GET",  // ✅ GET 방식으로 변경
        credentials: "include",
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.id) {
          sessionStorage.setItem("id", data.id);  // ✅ 세션 유지 시 sessionStorage 사용
          navigate("/CosMain");
        }
      }
    } catch (error) {
      console.error("세션 확인 실패:", error);
    }
  };

  useEffect(() => {
    checkSession();
    
    // ✅ 저장된 ID가 있으면 자동 입력
    const savedId = localStorage.getItem("savedId");
    if (savedId) {
      setId(savedId);
      setRememberMe(true);
    }
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

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || "로그인 실패");
        return;
      }

      const data = await response.json();
      console.log("로그인 성공:", data);

      // ✅ 로그인 성공 시 sessionStorage에 저장
      sessionStorage.setItem("id", data.id);
      sessionStorage.setItem("name", data.name);

      // ✅ 아이디 저장 체크 시 로컬 스토리지에도 저장
      if (rememberMe) {
        localStorage.setItem("savedId", id);
      } else {
        localStorage.removeItem("savedId");
      }

      setMessage("로그인 성공!");
      setTimeout(() => {
        navigate('/CosMain');
      }, 1000);
    } catch (error) {
      console.error("로그인 요청 실패:", error);
      setMessage("서버 오류: 로그인할 수 없습니다.");
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
                  type="password"
                  placeholder="   비밀번호 입력" 
                  onChange={(e) => setPasswd(e.target.value)}
                />
                <br/>
                <div style={{ display: 'flex', alignItems: 'center', textAlign:'left', marginTop: '10px'}}>
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={() => setRememberMe(!rememberMe)} 
                  />
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
