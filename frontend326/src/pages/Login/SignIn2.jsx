import React, { useState } from "react";
import './Signin2css.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SignIn2() {
    const navigate = useNavigate();
    const location = useLocation();
    const userType = location.state?.userType || "client"; // 기본값 설정

    const [username, setId] = useState("");
    const [password, setPasswd] = useState("");
    const [confirmPasswd, setConfirmPasswd] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [tel, setTel] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [message, setMessage] = useState("");
    const [isidValid, setIsidValid] = useState(false);
    const [idCheckMessage, setidCheckMessage] = useState("");

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            setMessage("회원가입 정보를 입력해 주십시오.");
            return;
        }

        if (password !== confirmPasswd) {
            setMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        const response = await fetch(`http://localhost:8081/api/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, email, birthdate, tel, name, gender, userType }),
            credentials: "include",
            mode: "cors",
        });

        const data = await response.json();
        if (response.ok && data.message === "회원가입 성공!") {
            localStorage.setItem("signupEmail", email);
            localStorage.setItem("signupid", username);
            localStorage.setItem("signupName", name);
            setMessage(data.message);
            setTimeout(() => {
                navigate('/');
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
                            <h2>필수정보 입력 ({userType === "client" ? "의뢰인" : "디자이너"})</h2>
                            <form className="form1" onSubmit={handleSignupSubmit}>
                                <div className="inputinfo">
                                    <label>아이디</label>
                                    <input type="text" className={`input-text ${!isidValid ? "invalid" : ""}`} value={username} onChange={(e) => setId(e.target.value)} />
                                    <span>{idCheckMessage}</span>
                                </div>
                                <div className="inputinfo">
                                    <label>비밀번호</label>
                                    <input type="passwd" className="input-passwd" value={password} onChange={(e) => setPasswd(e.target.value)} />
                                </div>
                                <div className="inputinfo">
                                    <label>비밀번호 확인</label>
                                    <input type="passwd" className="input-passwd" value={confirmPasswd} onChange={(e) => setConfirmPasswd(e.target.value)} />
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
                                        <option value="Male">남성</option>
                                        <option value="Female">여성</option>
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
