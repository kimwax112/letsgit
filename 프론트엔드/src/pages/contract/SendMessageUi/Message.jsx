import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Message.css';

export default function Message() {
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    // 예시용 하드코딩 데이터
    const contracts = [
      { id: "1", title: "디자인 계약서 1", preview: "3페이지 분량 / 클라이언트 서명 완료", status: "진행중", date: "2025.04.11" },
      { id: "2", title: "위탁계약서", preview: "초안 전달 / 검토 중", status: "완료", date: "2025.04.05" },
      { id: "3", title: "프로젝트 계약서", preview: "계약 해지 요청 / 내용 확인 필요", status: "해지", date: "2025.03.30" },
    ];
    const contract1 = contracts.find(c => c.id === "1");
    setContract(contract1);
  }, []);

  if (!contract) return null;

  const handleClick = () => {
    navigate(`/client/contract/MessageDetail/${contract.id}`, {
      state: { contract }
    });
  };

  return (
    
    <div className="message-container" onClick={handleClick}>
      <div className="contract-title">{contract.title}</div>
      <div className="design-name">{contract.designer || "디자이너 없음"}</div>
      <div className="contract-detail">보낸 메시지 미리보기</div>
      <div className="contract-date">{contract.date}</div>
    </div>
    
  );
}