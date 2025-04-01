import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ChatLayout from "./ui/ChatLayout";
import Search from "./ui/Search";
import ChatProfile from "./ui/ChatProfile";
import { Modal } from "../../../utils";
import SideMenu from "./ui/SideMenu";
import backArrow from "../../../assets/화살표.png";
import ItemBox from './ui/ItemBox';
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
  flex-direction: column; /* 세로 방향으로 요소 배치 */
  width: 700px;
  height: 800px;

`;
const CustomModalHeader = styled.div`
  background-color : #F2EEEE;
  font-size : 30px;
  font-weight :bold;
  text-align : center;
  padding : 15px;
  margin-bottom : 20px;
`;
const ItemBoxContainer = styled.div`
  width: 90%;
  margin : 0 auto;
  background-color : white;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start; /* 가로 가운데 정렬 */
  gap: 10px;
  padding-left : 20px;

`;


const chatData = [
  { name: "Cody Fisher", message: "how it going?", time: "12:00 p.m." },
  { name: "Jane Cooper", message: "What the latest news?", time: "10:53 a.m." },
  { name: "Annette Black", message: "I dont eat, so I dont have a favorite food.", time: "2023-11-09" },
];

function ChatMain() {
  const [filteredChats, setFilteredChats] = useState(chatData);
  const [recentSearches, setRecentSearches] = useState(["Ralph Edwards", "hello"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isComposing, setIsComposing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSearch = (term) => {
    if (term) {
      const filtered = chatData.filter((chat) =>
        chat.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredChats(filtered);
    } else {
      setFilteredChats(chatData);
    }
  };

  const handleRecentSearchClick = (search) => {
    handleSearch(search);
    setRecentSearches((prev) => [search, ...prev.filter((item) => item !== search)].slice(0, 5));
  };

  const handleProfileClick = (name) => {
    setSelectedUser(name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setIsSideMenuOpen(false);
  };

  const handleMenuClick = () => {
    setIsSideMenuOpen(true);
  };

  const handleCloseSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isComposing && e.target.value.trim()) {
      setMessages([
        ...messages,
        { text: e.target.value.trim(), time: new Date().toLocaleTimeString() },
      ]);
      e.target.value = "";
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  return (
    <>
      <StyleSheet />
      <ChatLayout
        sidebarTitle="대화방"
        sidebarLinks={[{ path: "#", text: "일반 채팅방" }, { path: "#", text: "사용자 신고, 차단" }]}
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
              onClick={() => handleProfileClick(chat.name)}
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
              setModalOpen={setModalOpen} // props로 전달
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
          </Room>
        )}
        {modalOpen && (
          <CustomModal onClose={() => setModalOpen(false)}>
            <CustomModalHeader>디자인 불러오기</CustomModalHeader>
            <ItemBoxContainer>
           
            <ItemBox text1='맨투맨' text2='(Sweatshirt)'></ItemBox>
            <ItemBox text1='맨투맨' text2='(Sweatshirt)'></ItemBox>
            <ItemBox text1='맨투맨' text2='(Sweatshirt)'></ItemBox>
            <ItemBox text1='맨투맨' text2='(Sweatshirt)'></ItemBox>
            
            <ItemBox text1='맨투맨' text2='(Sweatshirt)'></ItemBox>
            <ItemBox text1='맨투맨' text2='(Sweatshirt)'></ItemBox>
            <var> <ItemBox text1='맨투맨' text2='(Sweatshirt)'></ItemBox></var>

            </ItemBoxContainer>
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