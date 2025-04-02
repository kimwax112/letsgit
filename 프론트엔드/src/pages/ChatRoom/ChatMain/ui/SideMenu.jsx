import React from "react";
import styled from "styled-components";
import close from "../../../../assets/닫기.png";


// 사이드 메뉴 컨테이너 스타일
const SideMenuContainer = styled.div`
  display:flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #799fc4;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 10; /* 모달 내부에서 다른 요소 위에 표시되도록 */
`;

const CloseButton = styled.button`
  all: unset;
  align-self: flex-end;
  width: 20px;
  height: 20px;
  background-image: url(${close});
  background-size: 30px 30px; 
  background-repeat: no-repeat;
  background-position: center; 
  border: 3px solid white;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px; 
  &:hover {
    opacity: 0.8; 
  }
`;

const SideMenuContent = styled.div`
  display:flex;
  flex-direction : column;
  margin : 0 auto;
  padding 10px;
`
const Title = styled.p`
  
  display: flex;
  justify-content: flex- start;
  font-size : 20px;
  font-weight: bold;
  color: white;
  margin : 10px;
  margin-top : 40px;
`
const ProfileContainer = styled.div`
  width: 90%;
  min-height: 100px;
  border: none;
  border-radius : 10px;
  justify-content: center;
  align-items : center;
  background-color: #94B9DC;
  margin : 0 auto;
`





function SideMenu({ isOpen, onClose }) {
  return (
    <SideMenuContainer isOpen={isOpen}>
      <CloseButton onClick={onClose}></CloseButton>
      <Title>대화상대</Title>
      <ProfileContainer></ProfileContainer>
      <Title>사용자</Title>
      <ProfileContainer></ProfileContainer>
    </SideMenuContainer>
  );
}

export default SideMenu;