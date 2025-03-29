import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Welcomecss.css';

export default function Welcome({ onSignupClick }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleLoginSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const response = await fetch(`http://localhost:8081/api/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password }),
              credentials: "include", // ✅ 세션 쿠키 포함
          });
  
          if (!response.ok) {
              setMessage("로그인 실패");
              return;
          }
  
          const data = await response.json(); // JSON 데이터 가져오기
          setMessage(data.message);
  
          // ✅ usertype에 따라 페이지 이동
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
  

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    return (
        <div>
            <div className='divmcover'>
                <div className='loginWrapper'>
                    <div className='divm-wrapperr'>
                        <div className='divmm'>
                            <p style={{textAlign:'center', fontSize:'50px'}}>
                                Login
                            </p>
                            <form className="form1" onSubmit={handleLoginSubmit}>
                                <input  
                                    value={username} 
                                    className="loginput" 
                                    type="text" 
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username" 
                                />
                                <br/>
                                <input 
                                    value={password} 
                                    className="loginput" 
                                    type="password" 
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                                <br/>
                                <div style={{textAlign:'left'}}>
                                    <input 
                                        type="checkbox" 
                                        checked={rememberMe}
                                        onChange={handleRememberMeChange}
                                    />
                                    아이디 저장
                                </div>
                                
                                <br/>
                                <button type='submit' style={{marginTop: '10px'}} className='mainbaroo'>
                                    Sign in
                                </button>
                            </form>
                            {message && <div style={{color: 'red', textAlign: 'center'}}>{message}</div>}
                            <div className='MenuBarr'>
                                <nav>
                                    <ul>
                                        <li><a href='#'>아이디 찾기</a></li>
                                        <li style={{ paddingLeft: '5px', paddingRight: '5px' }}><a href='#'>비밀번호 찾기</a></li>
                                        <li><a href='#' onClick={() => navigate('/Sign')}>회원가입</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
