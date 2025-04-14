//디자이너 프로필 목록들 나오는 ui

import React, { useState } from "react";
import styled from "styled-components";
import cart2 from "../../../../assets/cart2.png";
import chat from "../../../../assets/대화.png";
import request from "../../../../assets/의뢰.png";
import jeans from "../../../../assets/jeans.png";
import port from "../../../../assets/Portfoilo.png";
import designer from "../../../../assets/desiner.png";
import { Modal } from "../../../../utils";
import { useNavigate } from "react-router-dom";
import RequestPopup from "../../Request/ui/RequestPopup";

const PortfoilModalContainer = styled(Modal)`
  display: flex;
  flex-direction: row;
`;

const ModalContent = styled.div`
  display: flex;
  flex: 1;
  border: 0.5px solid #799fc4;
  border-radius: 10px;
  margin: 20px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 10px;
  max-width: 400px;
`;

const DesignerImage = styled.img`
  margin: 0 auto;
  width: 100%;
  max-width: 150px;
  height: auto;
  object-fit: contain;
  margin-bottom: 10px;
`;

const ModalContent2 = styled.img`
  width: 500px;
  height: 500px;
  display: flex;
  flex: 1;
  border: 0.5px solid #799fc4;
  border-radius: 10px;
  margin: 20px;
  justify-content: center;
  align-items: center;
  object-fit: contain;
`;

const ImgaeContainer = styled.img`
  width: 10%;
  object-fit: contain;
`;

const PeriodContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  font-weight: bold;
  font-size: 13px;
  margin: 10px;
  justify-content: flex-start;
  align-self: flex-start;
  width: 100%;
`;

const PeriodText = styled.p`
  margin: 0;
`;

const ModalButton2 = styled.button`
  all: unset;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    background-color: #f5f5f5;
  }
  &:focus {
    border-color: #799fc4;
  }
`;

const ModalButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    background-color: #f5f5f5;
  }
  &:focus {
    border-color: #799fc4;
  }
`;

const Container = styled.div`
  display: flex;
  position: relative;
  width: 250px;
  height: 250px;
  background-color: white;
  border: 0.5px solid;
  margin: 30px;
  cursor: pointer;
`;

const JeansImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 200px;
`;

const CartButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  z-index: 2;
`;

const CartImage = styled.img`
  width: 100%;
  height: 100%;
`;

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestPopupOpen, setIsRequestPopupOpen] = useState(false); // 상태 변수 이름 변경

  const navigate = useNavigate();

  const clickCart = (e) => {
    e.stopPropagation();
    alert("장바구니에 추가되었습니다!");
  };

  const ChatEvent = () => {
    alert("대화방으로 이동합니다");
    navigate("/client/ChatMain");
  };

  return (
    <>
      <Container onClick={() => setIsModalOpen(true)}>
        <JeansImage src={jeans} alt="jeans" />
        <CartButton onClick={clickCart}>
          <CartImage src={cart2} alt="cart" />
        </CartButton>
      </Container>

      {isModalOpen && (
        <PortfoilModalContainer onClose={() => setIsModalOpen(false)}>
          <ModalContent>
            <DesignerImage src={designer} alt="예시" />
            <h3>Arlene McCoy</h3>
            <p>
              의류 디자인 경력 약 5년 개인, 협업 디자인 경험도 있습니다. 기존 틀에
              벗어나 새로운 디자인을 하도록 노력하였습니다.
            </p>
            <PeriodContainer>
              <PeriodText>참여기간</PeriodText>
              <PeriodText>2025.01 - 2025.01</PeriodText>
            </PeriodContainer>
            <PeriodContainer>
              <ImgaeContainer src={cart2} alt="장바구니에 넣기" />
              <ModalButton onClick={clickCart}>장바구니에 넣기</ModalButton>
            </PeriodContainer>
            <PeriodContainer>
              <ImgaeContainer src={chat} alt="대화하기" />
              <ModalButton onClick={ChatEvent}>대화하기</ModalButton>
            </PeriodContainer>
            <PeriodContainer>
              <ImgaeContainer src={request} alt="의뢰신청하기 " />
              <ModalButton2 onClick={() => setIsRequestPopupOpen(true)}>
                의뢰신청하기
              </ModalButton2>
            </PeriodContainer>
          </ModalContent>

          <ModalContent2 src={port} alt="예시이미지" />
          {isRequestPopupOpen && (
            <RequestPopup onClose={() => setIsRequestPopupOpen(false)} />
          )}
        </PortfoilModalContainer>
      )}
    </>
  );
}