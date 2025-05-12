import React from "react";
import styled from "styled-components";
import { Modal } from "../../../utils";
import SideMenu from "./SideMenu";
import backArrow from "../../../assets/화살표.png";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import ChatPage from "./ChatRoom";
import Messagealarm from "./Messagealarm"; // Messagealarm 컴포넌트 임포트



const RoomContainer = styled(Modal)`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 600px;
  height: 800px;
  overflow-x : hidden;
  
`;

const RoomHeader = styled.div`
  width: 100%;
  display: flex;
  background-color: #799fc4;
  font-size: 20px;
  font-weight: bold;
  color: rgb(0, 0, 0); 
`;
const AlarmContainer = styled.div`
  background-color:rgb(255, 255, 255); /* 노란색 배경으로 알림 스타일 */
  border-radius: 8px;
  border: 2px solid rgb(242, 242, 242); 
  margin: 10px;
  cursor: pointer; /* 클릭 가능 표시 */
  transition: all 0.3s ease; /* 부드러운 애니메이션 */
  text-align: center;
  font-size : 20px;
  font-weight: bold;
  
`
const AlarmContent = styled.div`
  background-color:rgb(243, 242, 240); /* 더 밝은 노란색으로 상세 내용 표시 */
  border-radius: 5px;
  border: 1px solid #f0e68c;
  
`;


const RoomFooter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  background-color: #f8f8f8;
`;

const RoomInput = styled.input`
  width: 70%;
  height: 70%;
  border: none;
  background-color: #ebebeb;
  border-radius: 20px;
  padding: 10px;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #ffffff;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
`;

const BackButton = styled.button`
  all: unset;
  width: 40px;
  height: 40px;
  background-image: url(${backArrow});
  background-size: 2vh;
  background-repeat: no-repeat;
  background-position: center;
  margin: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Title = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const Title1 = styled.div`
  display: flex;
  gap: 10px;
  color: white;
`;

const MenuButton = styled.button`
  all: unset;
  width: 30px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  &:hover {
    background-color: rgb(209, 209, 209);
  }
`;

const ConfirmModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ConfirmMessage = styled.p`
  font-size: 16px;
  text-align: center;
`;

const ConfirmButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ConfirmButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

const YesButton = styled(ConfirmButton)`
  background-color: #799fc4;
  &:hover {
    background-color: #cc0000;
  }
`;

const NoButton = styled(ConfirmButton)`
  background-color: #9dbdd5;
  &:hover {
    background-color: #444;
  }
`;

const SuccessPopup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  text-align: center;
`;

const SuccessPopupMessage = styled.p`
  color: green;
  font-weight: bold;
  font-size: 16px;
`;

function Room({
  roomId,
  selectedUser,
  messages,
  setMessages,
  isSideMenuOpen,
  onClose,
  onMenuClick,
  onCloseSideMenu,
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
  setModalOpen,
  setModalOpen2,
  onBlock,
  onReport,
  isConfirmOpen,
  confirmMessage,
  onConfirmYes,
  onConfirmNo,
  isSuccessPopupOpen,
  popupMessage,
  bottomRef,
}) {
  // const navigate = useNavigate();
  // const [client, setClient] = useState(null);
  
  // const [message, setMessage] = useState("");
  // const [connected, setConnected] = useState(false);
  // const [username, setUsername] = useState("");
  // const [room, setRoom] = useState(null); // ✅ 방 정보 상태 추가
  
//////////
const location = useLocation();
  const { roomId: paramRoomId } = useParams();
  const [alarmMessage, setAlarmMessage] = useState(null); // Messagealarm 전용 상태
  const hasAddedAlarm = useRef(false); // Messagealarm 중복 추가 방지
  const [isAlarmOpen, setIsAlarmOpen] = useState(false); // 열림/닫힘 상태 관리
useEffect(() => {
  console.log("URL에서 받은 roomId??:", roomId);
}, [roomId]);
///////////////



useEffect(() => {
  console.log("URL에서 받은 roomId:", roomId || paramRoomId);
  const messageText = location.state?.messageText;
  if (messageText && !hasAddedAlarm.current) {
    setAlarmMessage({
      contract: {
        title: messageText,
        designer: "요청 메시지",
        date: new Date().toISOString().split("T")[0],
      },
    });
    hasAddedAlarm.current = true; // 중복 방지 플래그 설정
  }
}, [roomId, paramRoomId, location.state?.messageText]);

// messages에는 WebSocket 메시지만 관리
useEffect(() => {
  const messageText = location.state?.messageText;
  if (messageText && messages.length === 0) {
    // 초기 메시지 로드 방지
  }
}, [roomId, paramRoomId, location.state?.messageText, messages.length, setMessages]);

const handleAlarmToggle = () => {
  setIsAlarmOpen((prev) => !prev); // 상태 토글
};

  return (
    <RoomContainer onClose={onClose} showCloseButton={false}>
      <RoomHeader>
        <BackButton onClick={onClose} />
        <Title>
          <Title1>
            <h2 style={{color : 'white'}}>{selectedUser}</h2>
            <MenuButton onClick={onMenuClick}>
              <h2 style={{color : 'white'}}>☰</h2>
            </MenuButton>
          </Title1>
        </Title>
      
      </RoomHeader>
      {alarmMessage && (
        <AlarmContainer onClick={handleAlarmToggle}>
          <div>
            {isAlarmOpen ? "(의뢰인명) 님이 수정요청을 하셨습니다." : "(의뢰인명) 님이 수정요청을 하셨습니다."} {/* 열림/닫힘 텍스트 */}
          </div>
          {isAlarmOpen && (
            <AlarmContent> 
              <Messagealarm contract={alarmMessage.contract} />
              <button  onClick>수락</button><button onClick>취소</button>
            </AlarmContent>
          )}
        </AlarmContainer>
      )}
     

      {/* 이곳에 Messagealarm 컴포넌트가 동적으로 생성되야함 */}
      <Content>
        <ChatContainer>
          
    
          <div ref={bottomRef} />
        </ChatContainer>
      </Content>
      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={onCloseSideMenu}
        setModalOpen={setModalOpen}
        setModalOpen2={setModalOpen2}
        selectedUser={selectedUser}
        onBlock={onBlock}
        onReport={onReport}
      />
      <RoomFooter>
        
        <ChatPage roomId={roomId} messages={messages} setMessages={setMessages} />
        </RoomFooter>
      {isConfirmOpen && (
        <ConfirmModal>
          <ConfirmMessage>{confirmMessage}</ConfirmMessage>
          <ConfirmButtonWrapper>
            <YesButton onClick={onConfirmYes}>예</YesButton>
            <NoButton onClick={onConfirmNo}>아니요</NoButton>
          </ConfirmButtonWrapper>
        </ConfirmModal>
      )}
      {isSuccessPopupOpen && (
        <SuccessPopup>
          <SuccessPopupMessage>{popupMessage}</SuccessPopupMessage>
        </SuccessPopup>
      )}
    </RoomContainer>
  );
}

export default Room;