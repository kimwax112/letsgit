import React, { useState } from "react";
import MypageSidebar from "../../components/Mypage/MypageSidebar";   
import './MyPage.css'

const WrittenReviews = () => {

  return (
    <div className="mypage-container">
      <div className="mypage-sidebar">
        <MypageSidebar />  {/* 사이드바 컴포넌트 */}
      </div>

      <div className="mypage-content">
       </div>
    </div>
  );
};

export default WrittenReviews;
