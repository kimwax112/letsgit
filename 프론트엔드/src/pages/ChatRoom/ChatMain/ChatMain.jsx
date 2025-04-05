import React from "react";
import styled from "styled-components";
import ChatLayout from "./ui/ChatLayout";
import Search from "./ui/Search";
import ChatProfile from "./ui/ChatProfile";
import { Modal } from "../../../utils";
import SideMenu from "./ui/SideMenu";
import backArrow from "../../../assets/화살표.png";
import ItemBox from "./ui/ItemBox";
import ModalContent from "../../Request/ui/ModalContent";
import { useChat } from "./ui/useChat";

const Room = styled(Modal)`
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

const CustomModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 800px;
`;

const CustomModalHeader = styled.div`
  background-color: #f2eeee;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  padding: 15px;
  margin-bottom: 20px;
`;

const ItemBoxContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
  padding-left: 20px;
`;

const ReportButton = styled.button`
  padding: 10px;
  background-color: #799fc4;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #cc0000;
  }
`;

const BlockButton = styled.button`
  padding: 10px;
  background-color: #9dbdd5;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: #444;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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

const chatData = [
  { name: "Cody Fisher", message: "how it going?", time: "12:00 p.m." },
  { name: "Jane Cooper", message: "What the latest news?", time: "10:53 a.m." },
  { name: "Annette Black", message: "I dont eat, so I dont have a favorite food.", time: "2023-11-09" },
];

function ChatMain() {
  const {
    filteredChats,
    recentSearches,
    isModalOpen,
    selectedUser,
    isSideMenuOpen,
    messages,
    modalOpen,
    modalOpen2,
    currentView,
    isConfirmOpen,
    confirmMessage,
    isSuccessPopupOpen,
    popupMessage,
    bottomRef,
    handleSearch,
    handleRecentSearchClick,
    handleProfileClick,
    handleCloseModal,
    handleMenuClick,
    handleCloseSideMenu,
    handleKeyDown,
    handleCompositionStart,
    handleCompositionEnd,
    handleSidebarLinkClick,
    handleBlockClick,
    handleReportClick,
    handleSideMenuBlock,
    handleSideMenuReport,
    handleConfirmYes,
    handleConfirmNo,
    setModalOpen,
    setModalOpen2,
  } = useChat(chatData);

  return (
    <>
      <StyleSheet />
      <ChatLayout
        sidebarTitle="대화방"
        sidebarLinks={[
          { path: "chatmain", text: "일반 채팅방", onClick: () => handleSidebarLinkClick("chatmain") },
          { path: "report", text: "사용자 신고, 차단", onClick: () => handleSidebarLinkClick("report") },
        ]}
        Header="일반 채팅방"
      >
        <Search
          onSearch={handleSearch}
          recentSearches={recentSearches}
          onRecentSearchClick={handleRecentSearchClick}
        />
        {filteredChats.length > 0 ? (
          filteredChats.map((chat, index) => (
            <ChatProfile
              key={index}
              name={chat.name}
              message={chat.message}
              time={chat.time}
              onClick={handleProfileClick}
              extraContent={
                currentView === "report" ? (
                  <ButtonWrapper>
                    <BlockButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBlockClick(chat.name);
                      }}
                    >
                      차단
                    </BlockButton>
                    <ReportButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReportClick(chat.name);
                      }}
                    >
                      신고
                    </ReportButton>
                  </ButtonWrapper>
                ) : null
              }
            />
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
        {isModalOpen && (
          <Room onClose={handleCloseModal} showCloseButton={false}>
            <RoomHeader>
              <BackButton onClick={handleCloseModal} />
              <Title>
                <Title1>
                  <h2>{selectedUser}</h2>
                  <MenuButton onClick={handleMenuClick}>
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
              onClose={handleCloseSideMenu}
              setModalOpen={setModalOpen}
              setModalOpen2={setModalOpen2}
              selectedUser={selectedUser}
              onBlock={handleSideMenuBlock}
              onReport={handleSideMenuReport}
            />
            <RoomFooter>
              <RoomInput
                type="text"
                placeholder="여기에 입력해주세요"
                onKeyDown={handleKeyDown}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
              />
            </RoomFooter>
            {isConfirmOpen && (
              <ConfirmModal>
                <ConfirmMessage>{confirmMessage}</ConfirmMessage>
                <ConfirmButtonWrapper>
                  <YesButton onClick={handleConfirmYes}>예</YesButton>
                  <NoButton onClick={handleConfirmNo}>아니요</NoButton>
                </ConfirmButtonWrapper>
              </ConfirmModal>
            )}
            {isSuccessPopupOpen && (
              <SuccessPopup>
                <SuccessPopupMessage>{popupMessage}</SuccessPopupMessage>
              </SuccessPopup>
            )}
          </Room>
        )}
        {modalOpen && (
          <CustomModal onClose={() => setModalOpen(false)}>
            <CustomModalHeader>디자인 불러오기</CustomModalHeader>
            <ItemBoxContainer>
              <ItemBox text1="맨투맨" text2="(Sweatshirt)" />
              <ItemBox text1="맨투맨" text2="(Sweatshirt)" />
              <ItemBox text1="맨투맨" text2="(Sweatshirt)" />
              <ItemBox text1="맨투맨" text2="(Sweatshirt)" />
              <ItemBox text1="맨투맨" text2="(Sweatshirt)" />
              <ItemBox text1="맨투맨" text2="(Sweatshirt)" />
              <ItemBox text1="맨투맨" text2="(Sweatshirt)" />
            </ItemBoxContainer>
          </CustomModal>
        )}
        {modalOpen2 && (
          <CustomModal onClose={() => setModalOpen2(false)}>
            <CustomModalHeader>의뢰 불러오기 </CustomModalHeader>
            <ModalContent />
          </CustomModal>
        )}
      </ChatLayout>
    </>
  );
}

const styles = `
  .message.sent {
    background-color: #dcf8c6;
    border-radius: 10px;
    padding: 8px 12px;
    margin: 5px;
    max-width: 70%;
    position: relative;
  }

  .message.sent::after {
    content: '';
    position: absolute;
    right: -10px;
    bottom: 0;
    border: 5px solid transparent;
    border-left-color: #dcf8c6;
    border-top-color: #dcf8c6;
  }

  .time {
    font-size: 0.8em;
    color: #666;
    margin-left: 10px;
  }
`;

const StyleSheet = () => <style>{styles}</style>;

export default ChatMain;