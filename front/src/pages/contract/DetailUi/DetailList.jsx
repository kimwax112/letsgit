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

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/client/contract/${contractId}`);
        const data = response.data;

        if (data) {
          setContractData(data);  // API 호출 후 상태 갱신
          // 상태를 로컬 저장소에 저장
          localStorage.setItem(`contract-${contractId}`, JSON.stringify(data));
        }
      } catch (error) {
        console.error("계약 데이터를 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    // 로컬 저장소에 계약 데이터가 있으면 가져오기
    const savedContract = localStorage.getItem(`contract-${contractId}`);
    if (savedContract) {
      setContractData(JSON.parse(savedContract));
    } else {
      fetchContract();
    }
  }, [contractId]);  // contractId만 의존성 배열에 넣기

  const handleStarClick = () => {
    const updatedContract = { ...contractData, starredStatus: !contractData.starredStatus };
    setContractData(updatedContract); // 상태 업데이트
    
    // 서버에 중요 표시 상태 저장
    axios.put(`http://localhost:8081/client/contract/${contractData.id}/star`, {
      starredStatus: updatedContract.starredStatus
    })
    .then(() => {
      onToggleStar(updatedContract); // 상위 컴포넌트에 상태 변경 전달
      // 상태를 로컬 저장소에 저장
      localStorage.setItem(`contract-${contractId}`, JSON.stringify(updatedContract));
    })
    .catch((error) => {
      console.error("중요 표시 상태 변경 실패:", error);
    });
  };

  const handleShare = () => {
    // 공유 기능 구현 (예: 공유 URL을 복사하거나 다른 공유 방식)
    alert("공유 기능은 아직 구현되지 않았습니다.");
  };

  const handlePrint = () => {
    // 인쇄 기능 구현
    window.print();
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
    navigate('/client/ChatMain', { state: { messageText: editorContent,
      sourcePage: "OtherPage", 
     } });
  };
      // MyEditor에서 작성완료 눌렀을 때만 호출됩니다.
      const handleEditorSend = (content) => {
        if (content.trim() !== "") {
          setEditorContent(content);
          setIsEditorSent(true);
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
        <Button>작성취소</Button>
        <Button>저장</Button>
      </div>
    </div>
  );
}
