import React, { Children, useState } from "react";
import {SearchBar2, NextButtonUI } from '../../../components';
import styled from "styled-components";
import { Modal } from "../../../utils";
import ModalContent from "./ModalContent";

const CustomModal = styled(Modal)`
width: 800px;
  background-color : white;

`

const ContentHeader1 = styled.div`
  width: 50%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  gap: 100px;
  padding: 50px;
`;

const SearchButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 50%;
`;
const Text1 = styled.div`
  flex: 0 0 max-content;
  align-self: flex-start;
`;

export default function ContentHeader ({children}) {
  const [modalOpen, setModalOpen] = useState(false);
  

  return (
    
    <>
   <ContentHeader1>
          <Text1>
            <h1>{children}</h1>
          </Text1>
          <SearchButtonWrapper>
            <SearchBar2 />
            <ButtonContainer >
              {/* '임시저장함' 버튼 → /SavedRequests 페이지로 이동 */}
              <NextButtonUI  onClick={() => setModalOpen(true)}>임시저장함</NextButtonUI>
              {/* '글쓰기' 버튼 → /RequestWriting 페이지로 이동 */}
              <NextButtonUI to="/RequestWriting">글쓰기</NextButtonUI>
            </ButtonContainer>
          </SearchButtonWrapper>
        </ContentHeader1>

    {modalOpen && (
      <CustomModal onClose={() => setModalOpen(false)}>
        <h2>임시저장된 글</h2>
        <ModalContent/>
      </CustomModal>
    )}

    </>
  )
}