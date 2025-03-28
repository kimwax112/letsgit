import React, { useState } from "react";
import styled from "styled-components";
import ChatLayout from "./ui/ChatLayout";
import Search from "./ui/Search";
import ChatProfile from "./ui/ChatProfile";
import { Modal } from "../../../utils";
import SideMenu from "./ui/SideMenu";
import backArrow from "../../../assets/화살표.png";

// 모달 스타일
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
  background-color : #799FC4;
`;
const RoomFooter = styled.div`
  width: 100%;
  height: 7vh;
  display:flex;
  justify-content: fles-start;
  align-items : center;
  padding: 10px;
  border: none;
  
  background-color: #F8F8F8;
  z-index: ; /* 위에 위치 */
`
const RoomInput = styled.input`
  width: 70%;
  height: 70%;
  border: none;
  background-color : #EBEBEB;
  border-radius : 20px;
  padding : 10px;

`

const Content = styled.div`
  width: 100;
  height: 100%;
  background-color: #FFFFFF;
`



const BackButton = styled.button`
  all: unset;
  width: 40px;
  height: 40px;
  background-image: url(${backArrow}); /* 이미지 적용 */
  
  background-size: 2vh;
  background-repeat: no-repeat; /* 반복 방지 */
  background-position: center; /* 가운데 정렬 */
  margin: 10px;
  cursor: pointer; /* 클릭 가능 커서 */
  &:hover {
    opacity: 0.8; /* 호버 시 투명도 변경 */
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
  color : white;
`;

// 메뉴 버튼 스타일
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




// 예시 데이터
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

  return (
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
            <BackButton onClick={handleCloseModal} /> {/* 이미지 버튼 */}
            <Title>
              <Title1>
                <h2 >{selectedUser}</h2>
                <MenuButton onClick={handleMenuClick}>
                  <h2>☰</h2>
                </MenuButton>
              </Title1>
            </Title>
          </RoomHeader>
          <Content></Content>
          <SideMenu isOpen={isSideMenuOpen} onClose={handleCloseSideMenu} />
          <RoomFooter>
            <RoomInput 
              type="text"
              placeholder="여기에 입력해주세요"

          ></RoomInput></RoomFooter>
        </Room>
        
      )}
    </ChatLayout>
  );
}

export default ChatMain;