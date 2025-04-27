import React from "react";
import "./DesignerContractList.css";

import clientImage1 from "../../../assets/desiner.png"; 
import clientImage2 from "../../../assets/desiner.png"; 

const DesignerContractList = () => {
  // 임시 계약서 데이터 (각 계약별 이미지 URL 추가)
  const contracts = [
    {
      status: "진행중",
      clientName: "김클라이언트",
      content: "로고 리디자인 작업",
      date: "2025.04.11",
      period: "2025.04.01 ~ 2025.04.30",
      amount: "2,000,000원",
      imageUrl: clientImage1, // 이미지 URL
    },
    {
      status: "완료됨",
      clientName: "박클라이언트",
      content: "웹사이트 제작",
      date: "2025.03.20",
      period: "2025.03.01 ~ 2025.03.15",
      amount: "3,500,000원",
      imageUrl: clientImage2, // 다른 이미지 URL
    },
    {
      status: "미송신",
      clientName: "유클라이언트",
      content: "웹사이트 제작",
      date: "2025.03.15",
      period: "2025.03.01 ~ 2025.03.15",
      amount: "200,000원",
      imageUrl: clientImage2,
    },
  ];

  return (
    <div className="contract-list">
      {contracts.map((contract, index) => (
        <div key={index} className="contract-item">
          <div
            className={`status ${
              contract.status === "진행중"
                ? "ongoing"
                : contract.status === "완료됨"
                ? "completed"
                : contract.status === "미송신"
                ? "unsent"
                : contract.status === "미수신"
                ? "unsent-cancelled"
                : contract.status === "진행중(수정완료)"
                ? "in-progress"
                : contract.status === "수정건의"
                ? "needs-modification"
                : contract.status === "해지요청"
                ? "cancel-request"
                : contract.status === "해지됨"
                ? "cancelled"
                : ""
            }`}
          >
            {contract.status}
          </div>
          <div className="profile-picture">
            <img src={contract.imageUrl} alt="Client" />
          </div>
          <div className="info">
            <div className="client-name">{contract.clientName}</div>
            <div className="content">
              {contract.content.length > 20 ? contract.content.slice(0, 20) + "..." : contract.content}
            </div>
            <div className="dates">
              <div className="date">
                <span>계약일</span> {contract.date}
              </div>
              <div className="period">
                <span>계약 기간</span> {contract.period}
              </div>
              <div className="amount">
                <span>계약금</span> {contract.amount}
              </div>
            </div>
          </div>
          <div className="action-button">
            {/* 상태에 따라 버튼 이름 다르게 */}
            {contract.status === "미송신" ? (
              <button>송신</button>
            ) : contract.status === "미수신" ? (
              <button>송신취소</button>
            ) : contract.status === "진행중" ? (
              <>
                <button>해지요청</button>
                <button>수정건의</button>
              </>
            ) : contract.status === "수정건의" ? (
              <button>수정건의 취소</button>
            ) : contract.status === "진행중(수정완료)" ? (
              <>
                <button>해지요청</button>
                <button>수정건의</button>
              </>
            ) : contract.status === "해지요청" ? (
              <button>해지요청 취소</button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DesignerContractList;
