import { FaStar, FaRegStar } from "react-icons/fa"; // 별 아이콘
import share from '../../../assets/share.png';  
import print from '../../../assets/print.png';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";


export default function DetailList({onToggleStar, contract, content, time, id }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!contract) {
    return <div>계약서 데이터를 찾을 수 없습니다.</div>;
  }
    const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="Detailcontainer">
      <div className="Detailtitle">
        <span>보낸 메시지</span>
      </div>
      <div className="HeaderContainer">
        <div className="DetailHeaderContainer">
          <div className="DetailHeader">
            <span style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={onToggleStar}>
              {contract.isStarred ? <FaStar color="#FFD700" /> : <FaRegStar />}
            </span>
            <span>계약 이름: {contract.title}</span> {/* contract.title 사용 */}
            <div className="SharePrint">
              <button>공유</button>
              <img src={share} alt="공유 아이콘" />
              <button>인쇄</button>
              <img src={print} alt="인쇄 아이콘" />
            </div>
          </div>
        </div>

        <div className="TitleContent">
          <p>보낸사람: {contract.sender || "미지정"}</p> {/* contract.sender 추가 (데이터에 없으므로 기본값) */}
          <p>받는사람: {contract.recipient || "미지정"}</p> {/* contract.recipient 추가 (데이터에 없으므로 기본값) */}
          <p style={{ fontSize: '12px' }}>{time}</p> {/* contract.date 사용  계약한 날짜인듯*/}
        </div>
      </div>

      <button
        onClick={toggleOpen}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {isOpen ? (
          <FaChevronUp size={24} color="#333" />
        ) : (
          <FaChevronDown size={24} color="#333" />
        )}
        <p>계약내용 보기</p>

      </button>

      {isOpen && (
        <div
          className="DetailContent"
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            height: "400px",
            overflowY: "auto",
          }}
        >
          <p> {contract.content || "상세 계약 내용입니다"} </p>

          <p></p>
        </div>
      )}
    </div>
  );
}