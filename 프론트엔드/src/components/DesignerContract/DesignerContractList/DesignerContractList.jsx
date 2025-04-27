import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DesignerContractList.css";
import clientImage from "../../../assets/desiner.png";

const DesignerContractList = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/designer/contract")
      .then((response) => {
        const fetchedContracts = response.data.map((contract) => ({
          status: convertStatus(contract.status),
          clientName: contract.contractTitle,
        //   content: contract.contractTitle,
          date: formatDate(contract.dueDate),
          period: calculatePeriod(contract.dueDate),
          amount: formatAmount(contract.requestFee),
          imageUrl: clientImage,
        }));
        setContracts(fetchedContracts);
      })
      .catch((error) => {
        console.error("계약서 목록 불러오기 실패:", error);
      });
  }, []);

  const convertStatus = (status) => {
    if (status === "진행중") return "진행중";
    if (status === "완료") return "완료됨";  
    if (status === "해지") return "해지됨";  
    if (status === "미송신") return "미송신";
    if (status === "미수신") return "미수신";
    if (status === "수정건의") return "수정건의";
    if (status === "해지요청") return "해지요청";
    return status;
  };
  
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0].replace(/-/g, '.');
  };

  const calculatePeriod = (dueDate) => {
    const startDate = new Date(dueDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 30);
    return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
  };

  const formatAmount = (amount) => {
    return amount.toLocaleString() + "원";
  };

  return (
    <div className="contract-list">
      {contracts.map((contract, index) => (
        <div key={index} className="contract-item">
          {/* 상태 뱃지 */}
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

          {/* 프로필 사진 */}
          <div className="profile-picture">
            <img src={contract.imageUrl} alt="Client" />
          </div>

          {/* 계약 정보 */}
          <div className="info">
            <div className="client-name">{contract.clientName}</div>
            {/* <div className="content">
              {contract.content.length > 20
                ? contract.content.slice(0, 20) + "..."
                : contract.content}
            </div> */}
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

          {/* 버튼 영역 */}
          <div className="action-button">
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
