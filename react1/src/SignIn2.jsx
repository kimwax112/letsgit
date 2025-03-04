import React, { useState, useEffect } from "react";
import './Signin2css.css';
import { useNavigate } from 'react-router-dom';

export default function SignIn2() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [usernameCheckMessage, setUsernameCheckMessage] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [tel, setTel] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            setMessage("회원가입 정보를 입력해 주십시오.");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        const response = await fetch(`http://localhost:8081/api/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, email, birthdate, tel, name, gender }),
            mode: "cors",
        });

        const data = await response.json();
        if (response.ok && data.message === "회원가입 성공!") {
            localStorage.setItem("signupEmail", email);
            localStorage.setItem("signupUsername", username);
            setMessage(data.message);
            setTimeout(() => {
                navigate('/GoodSign');
            }, 1000);
        } else {
            setMessage(data.message);
        }
    };

    return (
        <div className='divmcover'>
            <div className='loginWrapper'>
                <div className='divm-wrapperr'>
                    <div className='divmmmm'>
                        <div className="login">
                            <h2>필수정보 입력</h2>
                            <form className="form1" onSubmit={handleSignupSubmit}>
                                <div className="inputinfo">
                                    <label>아이디</label>
                                    <input type="text" className={`input-text ${!isUsernameValid ? "invalid" : ""}`} value={username} onChange={(e) => setUsername(e.target.value)} />
                                    <span>{usernameCheckMessage}</span>
                                </div>
                                <div className="inputinfo">
                                    <label>비밀번호</label>
                                    <input type="password" className="input-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="inputinfo">
                                    <label>비밀번호 확인</label>
                                    <input type="password" className="input-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <div className="inputinfo">
                                    <label>이메일 입력</label>
                                    <input type="email" className="input-email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="inputinfo">
                                    <label>생년월일</label>
                                    <input type="date" className="input-birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                                </div>
                                <div className="inputinfo">
                                    <label>전화번호</label>
                                    <input type="tel" className="input-tel" value={tel} onChange={(e) => setTel(e.target.value)} />
                                </div>
                                <div className="inputinfo">
                                    <label>이름</label>
                                    <input type="text" className="input-name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="inputinfo">
                                    <label>성별</label>
                                    <select className="input-gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="">선택하세요</option>
                                        <option value="남성">남성</option>
                                        <option value="여성">여성</option>
                                    </select>
                                </div>
                                {message && <p style={{ color: "red" }}>{message}</p>}
                                <button type="submit" className="mpbutton">다음</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
