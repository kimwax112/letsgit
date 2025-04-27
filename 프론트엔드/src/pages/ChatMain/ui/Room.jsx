// Room.jsx
import React from "react";
import styled from "styled-components";
import { Modal } from "../../../utils";
import SideMenu from "./SideMenu";
import backArrow from "../../../assets/화살표.png";
import Message from '../../../pages/contract/SendMessageUi/Message/Message';

const RoomContainer = styled(Modal)`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 600px;
  height: 700px;
`;

const RoomHeader = styled.div`
  width: 100%;
  display: flex;
  background-color: #799fc4;
  
`;

const RoomFooter = styled.div`
  width: 100%;
  height: 7vh;
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
  selectedUser,
  messages,
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
  console.log(`Messages in Room for ${selectedUser}:`, messages);

  return (
    <RoomContainer onClose={onClose} showCloseButton={false}>
      <RoomHeader>
        <BackButton onClick={onClose} />
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10, color: "white" }}>
            <h2>{selectedUser}</h2>
            <button onClick={onMenuClick} style={{ all: "unset", width: 30, cursor: "pointer", fontSize: 16 }}>
              ☰
            </button>
          </div>
        </div>
      </RoomHeader>

      <Content>
        <ChatContainer>
          {messages.length > 0 ? (
            messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type || "sent"}`}>
                {msg.component ? (
                  /* 추가: ChatGPT — 컴포넌트가 있으면 그것만 렌더링 */
                  msg.component
                ) : (
                  /* 추가: ChatGPT — 컴포넌트 없으면 텍스트만 렌더링 */
                  <div>{msg.text}</div>
                )}
                <span className="time">{msg.time}</span>
              </div>
            ))
          ) : (
            <p>메시지가 없습니다.</p>
          )}
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
        <RoomInput
          type="text"
          placeholder="여기에 입력해주세요"
          onKeyDown={onKeyDown}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
        />
      </RoomFooter>

      {isConfirmOpen && (
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)", background: "#fff",
          padding: 20, borderRadius: 10, boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          zIndex: 1000, display: "flex", flexDirection: "column", gap: 15
        }}>
          <p style={{ fontSize: 16, textAlign: "center" }}>{confirmMessage}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            <button onClick={onConfirmYes} style={{ padding: "8px 16px", background: "#799fc4", color: "#fff", border: "none", borderRadius: 5 }}>예</button>
            <button onClick={onConfirmNo} style={{ padding: "8px 16px", background: "#9dbdd5", color: "#fff", border: "none", borderRadius: 5 }}>아니요</button>
          </div>
        </div>
      )}

      {isSuccessPopupOpen && (
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)", background: "#fff",
          padding: 20, borderRadius: 10, boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          zIndex: 1000, textAlign: "center"
        }}>
          <p style={{ color: "green", fontWeight: "bold", fontSize: 16 }}>{popupMessage}</p>
        </div>
      )}
    </RoomContainer>
  );
}


export default Room;