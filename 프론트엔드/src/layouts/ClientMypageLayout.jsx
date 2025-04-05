import React from "react";
import MypageSidebar from "../components/Mypage/MypageSidebar"
import "./ClientMypageLayout.css";

export default function ClientMypageLayout({ children }) {
    return (
      <div style={{ display: "flex" }}>
        <MypageSidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          {children}
        </div>
      </div>
    );
  }
