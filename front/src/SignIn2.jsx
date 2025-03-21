import React, { useState, useEffect } from "react";
import './Signin2css.css';
import { useNavigate } from 'react-router-dom';

export default function SignIn2({ onSignupSuccess ,  onGoToLogin }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [message, setMessage] = useState("");
    
     
      const [isSignup, setIsSignup] = useState(false);
      const [confirmPassword, setConfirmPassword] = useState("");
      const [isUsernameValid, setIsUsernameValid] = useState(false);
      const [usernameCheckMessage, setUsernameCheckMessage] = useState("");
      const [email, setEmail] = useState("");
    
    
    
      const handleLoginSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch(`http://localhost:8081/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
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
        localStorage.setItem("username", data.username);
        setMessage("로그인 성공!");
        navigate('/');
    
        
        };
    
        const handleSignupSubmit = async (e) => {
          e.preventDefault();
      
          if (!username.trim() || !password.trim() || !email.trim()) {
              setMessage("모든 필드를 입력해 주세요.");
              return;
          }
      
          if (password !== confirmPassword) {
              setMessage("비밀번호가 일치하지 않습니다.");
              return;
          }
      
          try {
              const response = await fetch(`http://localhost:8081/api/signup`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ username, password, email }),
                  credentials: "include", // ✅ 세션 유지
              });
      
              const data = await response.json();
      
              if (response.ok) {
                  setMessage("회원가입 성공! 자동 로그인 중...");
                  
                  // ✅ 회원가입 후 자동 로그인
                  const loginResponse = await fetch(`http://localhost:8081/api/login`, {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ username, password }),
                      credentials: "include",
                  });
      
                  if (loginResponse.ok) {
                      navigate("/ChatRoomList"); // ✅ 로그인 후 채팅방 페이지로 이동
                  } else {
                      setMessage("회원가입은 성공했지만 로그인에 실패했습니다. 다시 로그인하세요.");
                      navigate("/"); // ✅ 로그인 페이지로 이동
                  }
              } else {
                  setMessage(data.message);
              }
          } catch (error) {
              console.error("회원가입 오류:", error);
              setMessage("회원가입 중 오류가 발생했습니다.");
          }
      };
      
       // 회원가입 화면으로 이동 시 초기화
       const handleGoToSignup = () => {
        setUsername("");
        setPassword("");
        setMessage("");
        setIsSignup(true);
      };
    
      // 로그인 화면으로 이동 시 초기화
      const handleGoToLogin = () => {
        setUsername("");
        setPassword("");
        setMessage("");
        setConfirmPassword("");
        setIsSignup(false);
        setUsernameCheckMessage("");
      };
    
      const handleCheckUsername = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/check-username/?username=${username}`
        );
        const data = await response.json();
        if (!username.trim()) {
          setMessage("입력 이후 중복확인을 진행하십시오");
            return;
        } else {
          if(data.exists){ 
           
            setIsUsernameValid(false);
            setUsernameCheckMessage("중복 Id입니다!");
          }else{
          setIsUsernameValid(true);
          setUsernameCheckMessage("사용 가능한 Id입니다.");
          }
        }
      };
  return (
    <div>
        <div className='divmcover'>
        <div className='loginWrapper'>
        <div className='divm-wrapperr'>
          <div className='divmmmm'>
            <p style={{fontSize:'30px'}}>
            <div className="login">
                필수정보 입력
        
            <form className="form1" onSubmit={handleSignupSubmit}>
            <div className="inputinfo">
            아이디
            <br/>
                <input
                type="text"
                className={`input-text ${!isUsernameValid ? "invalid" : ""}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                
                />
                {/*<button
                type="button"
                className="dupcheck"
                onClick={handleCheckUsername}
                >
                중복 확인
                </button>*/}
            <span>{usernameCheckMessage}</span>
            </div>
            <div  className="inputinfo" >
            비밀번호
            <br/>

            <input
              type="password"
              className="input-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
                        </div>

            <div  className="inputinfo">
            비밀번호 확인
            <br/>

            <input
              type="password"
              className="input-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
                        </div>

            <div  className="inputinfo">
            이메일 입력
            <br/>

            <input
              type="email"
              className="input-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
                        </div>

            {message && <p style={{ color: "red" }}>{message}</p>}
            <button type="submit" className="mpbutton">
              다음
            </button>
            <button type="button" onClick={() => navigate('/')}> {/* 버튼 추가 */}
                로그인 화면으로 돌아가기
            </button>
            {/*
            <button
              type="button"
              className="mpbutton"
              onClick={handleGoToLogin}
            >
              돌아가기
            </button>*/}
            </form>
        
        
            </div>
            </p>
          

           
          </div>

        </div>
        </div>

      </div>


        

    </div>
  )
}
