import React from "react";
import { useNavigate } from "react-router-dom";
import "./Message.css";

export default function Message({ id, contract, content, time, designer }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/client/contract/MessageDetailpage/${id}`);
  };

  return (
    <div className="message-container" onClick={handleClick}>
      <div className="contract-title">{contract || "계약 정보 없음"}</div>
       <div className="design-name">{designer || "디자이너 정보 없음"}</div>
      <div className="contract-detail">{content || "보낸 메시지 미리보기"}</div>
      <div className="contract-date">{time || "날짜 없음"}</div>
    </div>
  );
}
