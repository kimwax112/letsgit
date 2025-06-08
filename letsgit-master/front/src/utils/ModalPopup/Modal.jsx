import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
 
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  color: black;
  font-size: 20px;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  &:hover {
    background: #333;
  }
`;

export default function Modal({ onClose, children, className, showCloseButton = true }) {
  return (
    <Overlay>
      <ModalContainer className={className}>
        {showCloseButton && (
          <CloseButton
            onClick={() => {
              console.log("X 버튼 클릭됨!");
              onClose();
            }}
          >
            X
          </CloseButton>
        )}
        {children}
      </ModalContainer>
    </Overlay>
  );
}