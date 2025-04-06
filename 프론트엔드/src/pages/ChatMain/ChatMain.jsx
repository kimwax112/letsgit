import React from "react";
import styled from "styled-components";
import ChatLayout from "./ui/ChatLayout";
import Search from "./ui/Search";
import ChatProfile from "./ui/ChatProfile";
import { Modal } from "../../utils";
import Room from "./ui/Room";
import ItemBox from "./ui/ItemBox";
import ModalContent from "../Request/ui/ModalContent";
import { useChat } from "./ui/useChat";

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
          <Room
            selectedUser={selectedUser}
            messages={messages}
            isSideMenuOpen={isSideMenuOpen}
            onClose={handleCloseModal}
            onMenuClick={handleMenuClick}
            onCloseSideMenu={handleCloseSideMenu}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            setModalOpen={setModalOpen}
            setModalOpen2={setModalOpen2}
            onBlock={handleSideMenuBlock}
            onReport={handleSideMenuReport}
            isConfirmOpen={isConfirmOpen}
            confirmMessage={confirmMessage}
            onConfirmYes={handleConfirmYes}
            onConfirmNo={handleConfirmNo}
            isSuccessPopupOpen={isSuccessPopupOpen}
            popupMessage={popupMessage}
            bottomRef={bottomRef}
          />
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