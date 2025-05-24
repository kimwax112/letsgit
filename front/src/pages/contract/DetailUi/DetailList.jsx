import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 추가: ChatGPT
import './DetailList.css';
import MyEditor from '../../Request/Request/ui/MyEditor';
import jeans from '../../../assets/jeans.png';
import NextButtonUI from '../../../components/NextButton/NextButton';
import styled from 'styled-components';
import { FaStar, FaRegStar } from "react-icons/fa";
import share from '../../../assets/share.png';  
import print from '../../../assets/print.png';
import axios from 'axios';
import ContractSendMessagePage from '../ContractSendMessagePage';
import { use } from 'react';

const Button = styled(NextButtonUI)`
  background-color: #d5d5d5;
  color: black;
`;

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
}

export default function DetailList({ contractId, contract, onToggleStar }) {
  const [contractData, setContractData] = useState(contract);
  const navigate = useNavigate(); // 추가: ChatGPT
  const [editorContent, setEditorContent] = useState(""); // 추가: ChatGPT
  const [isEditorSent, setIsEditorSent] = useState(false);  // 추가: 작성완료 눌렀는지 추적
  const [contractMessage, setSendMessage] = useState(); //보낸 메시지 동적으로 관리되는 변수 
  const [agreeMessage, setAgreeMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // ✅ 모달 표시 여부

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/client/contract/${contractId}`);
        const data = response.data;
        if (data) {
          setContractData(data);
          localStorage.setItem(`contract-${contractId}`, JSON.stringify(data));
        }
      } catch (error) {
        console.error("계약 데이터를 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    const savedContract = localStorage.getItem(`contract-${contractId}`);
    if (savedContract) {
      setContractData(JSON.parse(savedContract));
    } else {
      fetchContract();
    }
  }, [contractId]);

  const handleStarClick = () => {
    const updatedContract = { ...contractData, starredStatus: !contractData.starredStatus };
    setContractData(updatedContract);
    axios.put(`http://localhost:8081/client/contract/${contractData.id}/star`, {
      starredStatus: updatedContract.starredStatus
    })
    .then(() => {
      onToggleStar(updatedContract);
      localStorage.setItem(`contract-${contractId}`, JSON.stringify(updatedContract));
    })
    .catch((error) => {
      console.error("중요 표시 상태 변경 실패:", error);
    });
  };

  const handleShare = () => {
    alert("공유 기능은 아직 구현되지 않았습니다.");
  };

  const handlePrint = () => {
    window.print();
  };

  // ✅ 계약 승인 요청 함수
  const handleApproveContract = async () => {
    if (agreeMessage !== "계약 내용을 확인하였으며 동의합니다.") {
    alert("정확한 문구를 입력해 주세요.");
    return;
  }

    try {
      const response = await axios.put(`http://localhost:8081/client/contract/approve`, {
        contractId: contractId,
        agreeMessage: agreeMessage
      });

      if (response.status === 200) {
        alert("계약이 승인되었습니다.");
        const updated = await axios.get(`http://localhost:8081/client/contract/${contractId}`);
        setContractData(updated.data);
        setShowModal(false);
      }
      
    } catch (err) {
      console.error("계약 승인 실패:", err);
      alert("서버 오류로 계약을 승인할 수 없습니다.");
    }
  };

  if (!contractData || !contractData.contractTitle) {
    return <div>계약서 데이터를 찾을 수 없습니다.</div>;
  }
  const handleSendRequest = () => {
    // 작성완료를 누르지 않았거나 내용이 비어 있으면 동작하지 않음
    if (!isEditorSent || editorContent.trim() === "") {
      alert("메시지를 작성하고 작성완료를 눌러주세요.");
      return;
    }
    navigate('/client/Chatmain', 
      { state: { messageText: editorContent, sendMessage : contractMessage,
      sourcePage: "OtherPage", 
     } });
  };

  
const handleEditorSend = (content) => {  //요청보내기 누를때 저장되는 객체 구조  (content) == MyEditor에서 입력한 메시지 매개변수로 전달
  if (content.trim() !== "") {
    setEditorContent(content); // content == 입력한 메시지  상태 업데이트 editorContent에 입력된 메시지저장, isEditorsent를 true로 설정하여 "요청보내기"버튼 활성화준비"
    setIsEditorSent(true);
    // contractMessage 설정: 메시지와 계약 정보 조합
    const newMessage = { //newMessage를 생성하여 메시지 내용(conent), 생성시간(time), 계약정보(contract), 고유(id)포함
      
      id: `msg-${Date.now()}`, // 예: "msg-1715995680000" (2025-05-18 10:28 KST)
      content: content,  //실제 전송할 메시지 텍스트 
      time: new Date().toLocaleTimeString(), // 메시지 생성 시각
      contract: {...contractData, content : content} //기존계약 정보 (contractDate)를 복제한뒤 conetn 필드를 추가해 함꼐 전달할 수 있게 합니다.
    };
    setSendMessage(newMessage);
 //contractMessage` 상태에 newMessage 객체를 저장합니다
    localStorage.setItem(
      "dratfRequest",
      JSON.stringify({
        editorContent: content,
        contractMessage: newMessage
  })
);
  }
};
  return (
    <div className="Detailcontainer">
      <div className="Detailtitle">
        <span>전체 계약</span>
      </div>

      <div className="HeaderContainer">
        <div className="DetailHeaderContainer">
          <div className="DetailHeader">
            <span style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={handleStarClick}>
              {contractData.starredStatus ? <FaStar color="#FFD700" /> : <FaRegStar />}
            </span>
            <span>계약 이름: {contractData.contractTitle}</span>
            <div className="SharePrint">
              <button onClick={handleShare}>공유</button>
              <img src={share} alt="공유 아이콘" />
              <button onClick={handlePrint}>인쇄</button>
              <img src={print} alt="인쇄 아이콘" />
            </div>
          </div>
        </div>

        <div className="TitleContent">
          <p>보낸사람: {contractData.designerId || "미지정"}</p>
          <p>받는사람: {contractData.clientId || "미지정"}</p>
          <p style={{ fontSize: '12px' }}>{formatDate(contractData.date)}</p>
        </div>
      </div>

      <div className="DetailContent">
        <div className="left">
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{contractData.contractTitle}</p>
          <p><img src={jeans} alt="사진" /></p>
          <p>디자이너: {contractData.designerId || "미지정"}</p>
          <p>의뢰인: {contractData.clientId || "미지정"}</p>
          <p>원단: {contractData.material || "미지정"}</p>
          <p>공장: {contractData.factory || "미지정"}</p>
          <p>기간: {contractData.deadline ? `${formatDate(contractData.deadline)}까지` : "2025.2.25까지"}</p>
        </div>
        <div className="right">
          <p>계약 작성 시간: {formatDate(contractData.createdAt) || "2025.01.01"}</p>
        </div>
      </div>

      <div className="Editor">
      <MyEditor onSendMessage={handleEditorSend}>디자이너에게 요청보내기</MyEditor> {/* 추가: ChatGPT */}
      </div>

      <div className="Detailfooter">
      <div className="DetailButton"><NextButtonUI onClick={handleSendRequest} disabled={!isEditorSent}  >요청보내기</NextButtonUI></div>
        <div className="DetailButton">
          {/* ✅ 모달 표시 버튼 */}
          <NextButtonUI onClick={() => setShowModal(true)}>동의하기</NextButtonUI>
        </div>
        <Button>작성취소</Button>
        <Button>저장</Button>
      </div>

      {/* ✅ 동의 입력 모달 */}
      {showModal && (
        <div style={modalStyle.overlay}>
          <div style={modalStyle.modal}>
            <h3>계약 승인 확인</h3>
            <h5>계약을 동의하면 '계약 내용을 확인하였으며 동의합니다'를 입력해주세요.</h5>
            <input
              type="text"
              value={agreeMessage}
              onChange={(e) => setAgreeMessage(e.target.value)}
              placeholder="예: 계약 내용을 확인하였으며 동의합니다."
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <div style={{ textAlign: 'right' }}>
              <button onClick={handleApproveContract} style={modalStyle.button}>확인</button>
              <button onClick={() => setShowModal(false)} style={modalStyle.cancelButton}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ✅ 모달 스타일
const modalStyle = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 1000,
  },
  modal: {
    background: 'white', padding: '20px', borderRadius: '8px',
    width: '400px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  button: {
    padding: '8px 16px', marginRight: '8px', backgroundColor: '#007BFF',
    color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer',
  },
  cancelButton: {
    padding: '8px 16px', backgroundColor: '#ccc',
    color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer',
  }
};
