import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // 스타일 파일을 유지

const Navbar = () => {
  return (
    <header className="navbar">
      <nav className="nav-menu">
        <div className="dropdown">
          <a href="#">직접 의류 디자인</a>
          <div className="dropdown-menu">
            <Link to="/clothes">사이트 제공 템플릿으로 디자인</Link>
            <a href="#">디자인 파일 업로드</a>
            <a href="#">브랜드 디자인 검색</a>
          </div>
        </div>
        <a href="#">제작 의뢰 맡기기</a>
        <a href="#">대화방</a>
        <a href="#">계약 관리</a>
      </nav>
      <div className="buttons">
        <button>로그아웃</button>
        <button>고객센터</button>
      </div>
    </header>
  );
};

export default Navbar;
