import React from "react";
import { useLocation } from "react-router-dom"; // react-router-dom에서 useLocation 임포트

export default function Messagealarm() {
  const location = useLocation();
  const messageText = location.state?.messageText || "기본메시지"; // messageText 변수로 사용

  return (
    <div>
      <h3>알림 컴포넌트</h3>
      <p>받은 메시지: {messageText}</p>
    </div>
  );
}