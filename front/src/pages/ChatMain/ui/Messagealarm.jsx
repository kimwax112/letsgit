import React from "react";
import { useLocation } from "react-router-dom"; // react-router-dom에서 useLocation 임포트

export default function Messagealarm() {
  const location = useLocation();
  const messageText = location.state?.messageText || "기본메시지"; // messageText 변수로 사용

  return (
    <div>
      <h6>주문자명</h6>
      <p>주문상품명 : {messageText}</p>
      <p>총주문금액 / 희망기한</p>
    </div>
  );
}