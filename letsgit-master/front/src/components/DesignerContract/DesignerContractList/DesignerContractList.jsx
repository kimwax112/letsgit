// DesignerContractList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DesignerContractList.css";
import clientImage from "../../../assets/desiner.png";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 임포트 확인 (Link는 사용하지 않을 경우 제거 가능)

const DesignerContractList = () => {
  const navigate = useNavigate(); // ⭐ 1. useNavigate 훅 사용
  const [contracts, setContracts] = useState([]);
  const [editingStatusIndex, setEditingStatusIndex] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const statusOptions = [
    "진행중", "완료", "해지", "미송신", "미수신", "수정건의", "해지요청"
  ];
  
  // ⭐ 2. 데이터를 불러오는 함수를 useEffect 밖으로 빼내서 재사용 가능하도록 합니다.
  const fetchContracts = () => {
    axios
      .get("http://localhost:8081/designer/contracts")
      .then((response) => {
        const fetchedContracts = response.data.map((contract) => ({
          contractId: contract.contractId, // <-- contractId가 꼭 포함되어야 합니다.
          status: convertStatus(contract.status),
          clientName: contract.contractTitle,
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
  };

  useEffect(() => {
    fetchContracts(); // 컴포넌트 마운트 시 초기 데이터 로드
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
  
  const handleStatusSave = (contractId) => {
    axios.post("http://localhost:8081/api/StatusChange", {
      contractId: contractId,
      status: selectedStatus,
    })
    .then((res) => {
      alert("상태가 성공적으로 변경되었습니다!");
      setEditingStatusIndex(null);
      // ⭐ 3. 상태 업데이트를 위해 데이터 다시 로드 (페이지 새로고침 대신)
      fetchContracts(); 
    })
    .catch((err) => {
      console.error("상태 변경 실패:", err);
      alert("상태 변경에 실패했습니다.");
    });
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

  // ⭐ 4. 계약 항목 클릭 시 상세 페이지로 이동하는 함수 추가
  const handleContractClick = (contractId) => {
    // '/designer/contract-detail/:roomId' 경로로 이동시킬 것
    navigate(`/designer/contract-detail/${contractId}`); 
  };

  return (
    <div className="contract-list">
      {contracts.map((contract, index) => (
        // ⭐ 5. 각 계약 항목 div에 onClick 이벤트 추가
        <div 
          key={index} 
          className="contract-item" 
          onClick={() => handleContractClick(contract.contractId)} // 클릭 시 페이지 이동 함수 호출
          style={{ cursor: 'pointer' }} // 마우스 오버 시 포인터 변경 (클릭 가능 시각화)
        >
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
            {/* ⭐ 6. 버튼 클릭 시 페이지 이동 방지 (e.stopPropagation() 추가) */}
            {contract.status === "미송신" ? (
              <button onClick={(e) => e.stopPropagation()}>송신</button> 
            ) : contract.status === "미수신" ? (
              <button onClick={(e) => e.stopPropagation()}>송신취소</button>
            ) : contract.status === "진행중" ? (
              <>
                <button onClick={(e) => e.stopPropagation()}>해지요청</button>
                <button onClick={(e) => e.stopPropagation()}>수정건의</button>
              </>
            ) : contract.status === "수정건의" ? (
              <button onClick={(e) => e.stopPropagation()}>수정건의 취소</button>
            ) : contract.status === "진행중(수정완료)" ? (
              <>
                <button onClick={(e) => e.stopPropagation()}>해지요청</button>
                <button onClick={(e) => e.stopPropagation()}>수정건의</button>
              </>
            ) : contract.status === "해지요청" ? (
              <button onClick={(e) => e.stopPropagation()}>해지요청 취소</button>
            ) : null}
            {/* 상태 수정 버튼 */}
            <button onClick={(e) => { // ⭐ e.stopPropagation() 추가
              e.stopPropagation(); 
              setEditingStatusIndex(index);
              setSelectedStatus(contract.status); // 기본값 선택
            }}>상태 수정</button>
            {/* 상태 드롭다운 및 저장 */}
      {editingStatusIndex === index && (
        <div className="status-edit" onClick={(e) => e.stopPropagation()}> {/* ⭐ e.stopPropagation() 추가 */}
          {statusOptions.map((status) => (
            <label key={status}>
              <input
                type="radio"
                name={`status-${index}`}
                value={status}
                checked={selectedStatus === status}
                onChange={() => setSelectedStatus(status)}
              />
              {status}
            </label>
          ))}
          <button onClick={() => handleStatusSave(contract.contractId)}>저장</button>
        </div>
      )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DesignerContractList;