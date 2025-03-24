import React, { useState } from "react";
import styled from "styled-components";
import { DropDown, Tag, ImageUploader, NextButtonUI, RequestPopup } from "../../../components";
import { TextInputUIManager, TagManager,Modal } from "../../../utils";
import dress from "../../../assets/dress.png";
import MyEditor from "./ui/MyEditor";

const CustomRequestPopup = styled(RequestPopup)`

`;
const Container = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Wrapper = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 30px;
  justify-content: flex-start;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  font-size: 25px;
  font-weight: bold;
  margin: 50px 0;
  gap: 10px;
`;

const RequiredLabel = styled.label`
  font-size: 20px;
  font-weight: bold;
  width: 150px; /* 레이블 너비 고정 */
  flex-shrink: 0; /* 레이블이 줄어들지 않도록 */
  white-space: nowrap; /* 텍스트가 다음 줄로 넘어가지 않도록 */
  
  
  &::after {
    content: ${props => (props.required ? '"*"' : '""')};
    color: red;
    margin-left: 4px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 70px;
  gap: 20px; /* 레이블과 입력 요소 간 간격 조정 */

  /* 입력 요소의 너비를 고정 */
  & > *:nth-child(2) {
    width: 500px; /* 모든 입력 요소의 너비를 500px로 통일 */
    flex-shrink: 0; /* 입력 요소가 줄어들지 않도록 */
  }
`;

const Detail = styled.div`
  margin-top: 20px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Footer = styled.div`
  display: flex;
  margin-top: 100px;
  margin-bottom: 100px;
  gap: 10px;
  justify-content: flex-end;
`;

export default function RequestWriting() {
  const [enteredTags, setEnteredTags] = useState([]);
  const options = ["옵션 1", "옵션 2", "옵션 3"];
  const options2 = ["옵션 1", "옵션 2", "옵션 3"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [MyDesignModal , setIsModal] = useState(false); 

  
  return (
    <Container>
      <Wrapper>
        <Header>
          <img src={dress} alt="sample" />
          어떠한 옷을 원하세요?
        </Header>

        <Content>
          <RequiredLabel required>글제목</RequiredLabel>
          <TextInputUIManager maxLength={20} placeholder="디자인 사이 " />
        </Content>

        <Content>
          <RequiredLabel required>카테고리</RequiredLabel>
          <TagManager
            placeholder="카테고리 "
            onTagsUpdate={(tags) => setEnteredTags(tags)}
            />
        </Content>

        <Content>
          <RequiredLabel required>원하는 스타일</RequiredLabel>
          <DropDown options={options2} defaultSelected="선택하세요" />
        </Content>

        <Content>
          <RequiredLabel required>원하는 금액</RequiredLabel>
          <TextInputUIManager maxLength={20} placeholder="₩ 가격" />
        </Content>

        <Content>
          <RequiredLabel required>희망 마감기한</RequiredLabel>
          <DropDown options={options} defaultSelected="선택하세요" />
        </Content>

        <Content>
          <RequiredLabel>내가 제작한 스타일</RequiredLabel>
          <button onClick={() => setIsModal(true)}>선택하세요 

          </button>
        </Content>
        <Detail>
          <div><h2>상세설명</h2></div>
          <TagList>
            {enteredTags.length === 0 ? (
              <span></span>
            ) : (
              enteredTags.map((tag, index) => (
                <Tag key={index} text={tag} onRemove={() => {}} />
              ))
            )}
          </TagList>
        </Detail>
        <MyEditor />
        <ImageUploader />
        <Footer>
          <NextButtonUI onClick={() => setIsModalOpen(true)}>의뢰 등록</NextButtonUI>
          <NextButtonUI to="/client/Request">취소</NextButtonUI>
          <NextButtonUI>임시 저장</NextButtonUI>
        </Footer>
      </Wrapper>

      {isModalOpen && <CustomRequestPopup onClose={() => setIsModalOpen(false)} />}
      {MyDesignModal && <Modal onClose={() => setIsModal(false)} />}
    </Container>
  );
}