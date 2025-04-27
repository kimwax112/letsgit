// MyModal.jsx
import React from "react";
import styled from "styled-components";
import { Button } from "../../../../components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 50px 0; /* 위아래 여백 추가 */
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  min-width: 400px;
  max-width: 800px;
  width: 60%;
  min-height: 900px;
  max-height: 1000px;
  height: auto;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  float: right;
  border: none;
  background: white;
  font-size: 20px;
  cursor: pointer;
  color: black;

`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Text = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  color: #9D9B9B;
  gap: 10px;
  
  hr {
    border-top: 2px solid #ccc;
    margin: 1px;
  }
`;

const StyledButton = styled.button`
  background-color: #799FC4;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;

  &:hover {
    filter: brightness(90%);
  }
`;

export default function RequestPopup({ onClose }) {

  const handleSave = () => {
    alert("임시저장이 완료되었습니다.");
  };

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Header>
          <div>
            <h2 style={{ margin: "20px", marginTop: "50px" }}>주호석님의</h2>
            <h1 style={{ margin: "20px" }}>의뢰서</h1>
          </div>
          <ButtonContainer>
            <StyledButton onClick={onClose}>취소</StyledButton>
            <StyledButton onClick={handleSave}>임시저장</StyledButton>
          </ButtonContainer>
        </Header>
        <Text>
          <p>글제목</p>
          <hr />
          <p>카테고리</p>
          <hr />
          <p>원하는 스타일</p>
          <hr />
          <p>원하는 금액</p>
          <hr />
          <p>희망 마감기한</p>
          <hr />
          <p>게시글 작성일시</p>
          <hr />
          <p>상세 설명</p>
          <hr />
        </Text>
      </ModalContainer>
    </Overlay>
  );
}