import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import share from '../../../assets/share.png';
import print from '../../../assets/print.png';


export default function MessageDetail({ onToggleStar }) {
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    // 로컬스토리지에서 드래프트 요청 데이터를 읽어옵니다
    const raw = localStorage.getItem("dratfRequest");
    if (!raw) return;
    try {
      const { contractMessage } = JSON.parse(raw);
      setDetail(contractMessage);
      // 한 번 읽고 나서 삭제하려면 아래 주석 해제
      // localStorage.removeItem("dratfRequest");
    } catch (e) {
      console.error("dratfRequest 파싱 오류:", e);
    }
  }, []);

  if (!detail) {
    return <div className="message-detail-container">메시지 정보를 찾을 수 없습니다.</div>;
  }

  const { contract, content, time, id } = detail;
  const toggleOpen = () => setIsOpen(prev => !prev);

  return (
    <div className="Detailcontainer">
      <div className="Detailtitle">
        <span>보낸 메시지</span>
      </div>

      <div className="HeaderContainer">
        <div className="DetailHeaderContainer">
          <div className="DetailHeader">
            <span
              style={{ cursor: 'pointer', marginLeft: '10px' }}
              onClick={() => onToggleStar && onToggleStar(detail)}
            >
              {contract.isStarred ? <FaStar color="#FFD700" /> : <FaRegStar />}
            </span>
            <span>계약 이름: {contract.title}</span>
            <div className="SharePrint">
              <button>공유</button>
              <img src={share} alt="공유 아이콘" />
              <button>인쇄</button>
              <img src={print} alt="인쇄 아이콘" />
            </div>
          </div>
        </div>

        <div className="TitleContent">
          <p>보낸사람: {contract.sender || "미지정"}</p>
          <p>받는사람: {contract.recipient || "미지정"}</p>
          <p style={{ fontSize: '12px' }}>{time}</p>
        </div>
      </div>

      <button
        onClick={toggleOpen}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '10px'
        }}
      >
        {isOpen ? <FaChevronUp size={24} color="#333" /> : <FaChevronDown size={24} color="#333" />}
        <p>계약내용 보기</p>
      </button>

      {isOpen && (
        <div
          className="DetailContent"
          style={{
            marginTop: '20px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            height: '400px',
            overflowY: 'auto'
          }}
        >
          <p>{contract.content || '상세 계약 내용입니다'}</p>
        </div>
      )}
    </div>
  );
}
