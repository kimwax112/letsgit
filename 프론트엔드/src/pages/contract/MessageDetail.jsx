import { useState } from "react";
import { useLocation } from "react-router-dom";
import ContractLayout from "../../layouts/ContractLayout";
import MessageHeader from "./SendMessageUi/MessageHeader";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // 화살표 아이콘 추가!

export default function MessageDetail() {
  const { state } = useLocation();
  const contract = state?.contract;
  const [isOpen, setIsOpen] = useState(false); // 펼침/접힘 상태

  if (!contract) {
    return <div>계약서 데이터를 찾을 수 없습니다.</div>;
  }

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <ContractLayout>
      <MessageHeader />
      <div className="Detailcontainer">

        <div className="Detailtitle">
          
          <span style={{ marginLeft: "10px" }}>계약 이름: {contract.title}</span>
        </div>

        <div className="HeaderContainer">
          <div className="DetailHeaderContainer">
            <div className="DetailHeader">
              <p>상태: {contract.status || "미지정"}</p>
              <p>날짜: {contract.date}</p>
              <p>미리보기: {contract.preview || "미리보기 없음"}</p>
            </div>
          </div>
        </div>
        <button onClick={toggleOpen} style={{ background: 'none', border: 'none', cursor: 'pointer',}}>
          {isOpen ? (
          <FaChevronUp size={24} color="#333" />
        ) : (
          <FaChevronDown size={24} color="#333" />
        )}
          <p>계약내용 보기 </p></button>

        {isOpen && (
          <div className="DetailContent" style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", height: "400px", overflowY: "auto" }}>
            <p>상세 계약 내용입니다</p>
            <p></p>
            
          </div>
        )}
        
      </div>
    </ContractLayout>
  );
}
