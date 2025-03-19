import React from "react";
import { Link } from "react-router-dom";
import "./MypageSidebar.css";

export default function MypageSidebar() {
  return (
    <div className="sidebar">
      <h2 style={{color:'#799FC4'}}>마이페이지</h2>
      <hr />
      <ul>
        <li>
          <Link to="/MyPage">내 정보</Link>
        </li>
        <li>
          <Link to="/design-request">디자인&의뢰</Link>
        </li>
        <li>
          <Link to="/progress-history">진행내역 조회</Link>
        </li>
        <li>
          <Link to="/written-reviews">작성한 후기</Link>
        </li>
        <li>
          <Link to="/liked-designers">찜한 디자이너</Link>
        </li>
      </ul>
    </div>
  );
}
