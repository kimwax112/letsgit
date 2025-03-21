import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  width: 800px;
  height: 1000px;
  min-height: 300px;
  max-height: 600px;
  overflow-y: auto;
  position: relative; /* 부모 기준으로 위치 설정 */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px; /* 상단에서 10px 떨어짐 (모달 내부) */
  right: 10px; /* 우측에서 10px 떨어짐 (모달 내부) */
  background: white;
  color: black; /* "X"가 잘 보이도록 흰색으로 설정 */
  font-size: 20px;
  border: none; /* 기본 테두리 제거 */
  border-radius: 50%; /* 원형 버튼으로 스타일링 (선택 사항) */
  width: 30px; /* 버튼 크기 */
  height: 30px; /* 버튼 크기 */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0; /* 패딩 제거 */
  &:hover {
    background: #333; /* 호버 시 색상 변경 (선택 사항) */
  }
`;

export default function Modal({ onClose, children, className }) {
  return (
    <Overlay>
      <ModalContainer className={className}>
        <CloseButton onClick={() => {
            console.log("X 버튼 클릭됨!"); // 🔍 디버깅 코드 추가
            onClose(); // onClose 호출
          }}
        >
          X</CloseButton>
        {children}
      </ModalContainer>
    </Overlay>
  );
}