import React from "react";
import styled from "styled-components";
import { Modal } from "../../../utils";
import SideMenu from "./SideMenu";
import backArrow from "../../../assets/화살표.png";

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
  return (
    <RoomContainer onClose={onClose} showCloseButton={false}>
      <RoomHeader>
        <BackButton onClick={onClose} />
        <Title>
          <Title1>
            <h2>{selectedUser}</h2>
            <MenuButton onClick={onMenuClick}>
              <h2>☰</h2>
            </MenuButton>
          </Title1>
        </Title>
      </RoomHeader>
      <Content>
        <ChatContainer>
          {messages.map((msg, index) => (
            <div key={index} className="message sent">
              {msg.text}
              <span className="time">{msg.time}</span>
            </div>
          ))}
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