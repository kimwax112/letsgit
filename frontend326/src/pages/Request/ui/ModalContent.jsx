import React, { useState } from "react";
import styled from "styled-components";
import closeIcon from "../../../assets/휴지통.png"; // 버튼에 사용할 이미지
import { Modal } from '../../../utils';
import deleteIcon from '../../../assets/delete.png';
const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 600px;
  height: 55px;
  margin-top: 40px;
  border-radius: 10px;
  border: 1px solid;
  padding: 10px;
`;

const Text1 = styled.p`
  flex: 0.6;
  margin: 0;
`;

const Text2 = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1.4;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;  
  img {
    width: 20px;
    height: 20px;
  }
`;
// 휴지톧 버튼누르면 나오는 팝업 부분
const CustomModal = styled(Modal)`
  display:flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  height: 400px;
  text-align: center;
  height: max-400px;
`;

const ButtonWrapper = styled.div`
width: 70%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;
  
`;

const CancelButton = styled.button`
  width: 50%;
  border: 1px solid black;
  padding: 10px 20px;
  background: black;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  width: 50%;
  border: 1px solid red;
  padding: 10px 20px;
  background: white;
  color: red;
  cursor: pointer;
`;

const CloseIcon = styled.img`
  display; flex;
  justify-content:center;
  algin-items: center;
  width: 30px; /* 원하는 크기로 설정 */
  height: 50px;
  

`;

const DeleteIcon = styled.img`
  display:flex;
  justify-content:center;
  algin-items: center;
  width: 200px; /* 원하는 크기로 설정 */
  height: 170px;
  
`


export default function ModalContent() {
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isVisible) return null;

  return (
    <>
      <Container>
        <Text1>
          <h2>글제목</h2>
        </Text1>
        <Text2>2025-01-01 (월)</Text2>
        <CloseButton onClick={() => setIsModalOpen(true)}>
  <CloseIcon src={closeIcon} alt="닫기" />
</CloseButton>

      </Container>

      {/* 삭제 확인 모달 */}
      {isModalOpen && (
        <CustomModal>

          <DeleteIcon src={deleteIcon} alt="닫기" />
          <h2>글을 삭제하시겠습니까?</h2>
          <p>삭제하시면 다시 복구시킬 수 없습니다.</p>
          <ButtonWrapper>
            <CancelButton 
              onClick={() => 
                setIsModalOpen(false)}>취소</CancelButton>
            <ConfirmButton
              onClick={() => {
                setIsVisible(false); // 컴포넌트 숨기기
                setIsModalOpen(false); // 모달 닫기
              }}
            >
              확인
            </ConfirmButton>
          </ButtonWrapper>
        </CustomModal>
      )}
    </>
  );
}
