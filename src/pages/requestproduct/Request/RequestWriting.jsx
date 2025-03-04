// RequestWriting.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { DropDown ,Tag,ImageUploader,MyEditor,NextButtonUI,RequestPopup} from "../../../components";
import { TextInputUIManager, TagManager, } from "../../../utils";
import dress from "../../../assets/dress.png";
import Request from './Request';

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

// Wrapper 등 기타 스타일들
const Wrapper = styled.div`
 display: flex;
 flex-direction: column;
  margin: 0 auto;
  padding: 30px;
  justify-content : flex-start;
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
  &::after {
    content: "*";
    color: red;
    margin-left: 4px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  margin: 50px;
`;


const Detail = styled.div`
  margin-top: 20px;
  font-size: 16px;
  /* Detail 자체는 가로로 꽉 차지 않도록 inline-flex를 사용하거나, 
     display: flex + width: auto 로 원하는 크기만큼 확장되게 할 수 있습니다. */
  display: flex;
  flex-direction: column;
  gap: 10px; /* h2와 태그 목록 사이 간격 */
`;

/* 태그 목록을 감싸는 컨테이너 */
const TagList = styled.div`
  display: flex;
  flex-wrap: wrap; /* 여러 개의 태그가 줄바꿈되도록 함 */
  gap: 5px;        /* 태그 사이 간격 */
`;

const Footer = styled.div`
  display: flex;
  margin-top: 100px;
  margin-bottom: 100px;
  gap: 10px;
  justify-content : flex-end;


`;

export default function RequestWriting() {
  // TagManager에서 입력된 태그들을 부모로부터 전달받기 위한 상태
  const [enteredTags, setEnteredTags] = useState([]);
  const options = ["옵션 1", "옵션 2", "옵션 3"];
  const options2 = ["옵션 1", "옵션 2", "옵션 3"];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container>
      <Wrapper>
        <Header>
          <img src={dress} alt="sample" />
          어떠한 옷을 원하세요?
        </Header>

        <Content>
          <RequiredLabel>글제목</RequiredLabel>
          <TextInputUIManager maxLength={20} placeholder="디자인 사이 " />
        </Content>

        <Content>
          <RequiredLabel>카테고리</RequiredLabel>
          {/* TagManager에 onTagsUpdate를 전달하여 내부 태그 배열이 업데이트될 때마다 상태에 저장 */}
          <TagManager
            placeholder="카테고리 "
            onTagsUpdate={(tags) => setEnteredTags(tags)}
          />
        </Content>

        <Content>
          <RequiredLabel>원하는 스타일</RequiredLabel>
          <DropDown options={options2} defaultSelected="선택하세요" />
        </Content>

        <Content>
          <RequiredLabel>원하는 금액</RequiredLabel>
          <TextInputUIManager maxLength={20} placeholder="₩ 가격" />
        </Content>

        <Content>
          <RequiredLabel>희망 마감기한</RequiredLabel>
          <DropDown options={options} defaultSelected="선택하세요" />
        </Content>

        {/* Detail 영역: TagManager에서 입력된 태그들을 별도의 공간에 표시 */}
        <Detail>
          <div><h2>상세설명</h2></div>
          <TagList>
          {enteredTags.length === 0 ? (
            <span></span>
          ) : (
            enteredTags.map((tag, index) => (
              // Tag 컴포넌트를 인라인으로 표시 (원한다면 스타일 조절)
              <Tag key={index} text={tag} onRemove={() => {}} />
            ))
          )}
          </TagList>
        </Detail>
        <MyEditor />
        <ImageUploader />
        <Footer>
          {/* NextButtonUI 클릭 시 팝업 열기 */}
          <NextButtonUI onClick={() => setIsModalOpen(true)}>의뢰 등록</NextButtonUI>
          <NextButtonUI to="/Request">취소</NextButtonUI>
          <NextButtonUI>임시 저장</NextButtonUI>
        </Footer>
      </Wrapper>

     {/* 모달 열림 상태일 때만 모달 컴포넌트 렌더링 */}
   {isModalOpen && <RequestPopup onClose={() => setIsModalOpen(false)} />}
    </Container>
    
  );
}