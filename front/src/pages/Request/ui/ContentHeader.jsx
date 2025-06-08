import React, { Children, useState } from "react";
import {SearchBar2, NextButtonUI } from '../../../components';
import styled from "styled-components";
import { Modal } from "../../../utils";
import ModalContent from "./ModalContent";

const CustomModal = styled(Modal)`
  padding: 20px;
  width: 800px;
  height: 800px;
  background-color: #fff; /* 모달 배경색 설정 */
`;

const ContentHeader1 = styled.div`
  width: 100%; 
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  background-color: #fff;
`;

const SearchButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;
const Text1 = styled.div`
  flex: 0 0 max-content;
  align-self: flex-start;
`;

export default function ContentHeader({ children, showButtons = true }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ContentHeader1>
        <Text1>
          <h1>{children}</h1>
        </Text1>
        <SearchButtonWrapper>
          <SearchBar2 />
          {showButtons && (
            <ButtonContainer>
              {/* '임시저장함' 버튼 → /SavedRequests 페이지로 이동 */}
              <NextButtonUI onClick={() => setModalOpen(true)}>임시저장함</NextButtonUI>
              {/* '글쓰기' 버튼 → /RequestWriting 페이지로 이동 */}
              <NextButtonUI to="/client/RequestWriting">글쓰기</NextButtonUI>
            </ButtonContainer>
          )}
        </SearchButtonWrapper>
      </ContentHeader1>

      {modalOpen && (
        <CustomModal onClose={() => setModalOpen(false)}>
          <h2>임시저장된 글</h2>
          <ModalContent />
        </CustomModal>
      )}
    </>
  );
}