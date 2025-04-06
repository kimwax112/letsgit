import React from "react";
import MypageSidebar from "../components/Mypage/MypageSidebar"
import "./ClientMypageLayout.css";

const ClientMypageLayout = ({ children }) => {
  return (
    <div className="flex">
      <MypageSidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default ClientMypageLayout;