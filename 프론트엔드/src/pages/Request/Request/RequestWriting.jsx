import React, { useState } from "react";
import styled from "styled-components";
import { DropDown, Tag, ImageUploader, NextButtonUI, RequestPopup } from "../../../components";
import { TextInputUIManager, TagManager, Modal } from "../../../utils";
import dress from "../../../assets/dress.png";
import MyEditor from "./ui/MyEditor";

const CustomRequestPopup = styled(RequestPopup)``;

const Container = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Wrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  align-items: center;
  text-align: center;
`;

const Subtitle = styled.div`
  font-size: 18px;
  color: #666; /* 텍스트 색상은 원하는 대로 수정 */
  font-weight: normal;
  margin-bottom: 0px; /* "어떠한 옷을 원하세요?"와의 간격 조정 */
  color: #A19494;
`;

const DetailAndUploadWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  margin: 50px 0;
  gap: 10px;
  font-size: 30px;
`;

const RequiredLabel = styled.label`
  font-size: 20px;
  font-weight: bold;
  width: 150px; /* 레이블 너비 고정 */
  flex-shrink: 0; /* 레이블이 줄어들지 않도록 */
  white-space: nowrap; 
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
  justify-content: center;
  margin-bottom: 70px;
  gap: 20px;

  & > *:nth-child(2) {
    width: 500px; 
    flex-shrink: 0; /* 입력 요소가 줄어들지 않도록 */
  }
`;

const Detail = styled.div`
  margin-top: 20px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > h2 {
    font-size: 24px; /* h2 텍스트 크기 증가 */
    font-weight: bold;
  }
  `;


const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  width: 100%; /* 전체 너비 */
  margin-top: 10px;
  margin-bottom: 70px;
  gap: 20px; /* 버튼들 간의 간격 */
  align-items: center; /* 세로 정렬 */
`;

const CustomUpload = styled(ImageUploader)`
  width: 150px;
  height: 150px;
`;

const UploadContainer = styled.div`
  background-color: white;
  border: 1px dashed #ccc;
  border-radius: 10px;
  display: flex;
  padding: 20px;
  width: 600px;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 22%;
`;

export default function RequestWriting() {
  const [enteredTags, setEnteredTags] = useState([]);
  const options = ["옵션 1", "옵션 2", "옵션 3"];
  const options2 = ["옵션 1", "옵션 2", "옵션 3"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [MyDesignModal, setIsModal] = useState(false);
  const [files, setFiles] = useState({}); // 개별 파일 저장

  return (
    <Container>
      <Wrapper>
        <HeaderWrapper>
          <Subtitle>디자이너 구인 게시글</Subtitle>
          <Header>
            <img src={dress} alt="sample" />
            어떠한 옷을 원하세요?
          </Header>

          <Content>
            <RequiredLabel required>글제목</RequiredLabel>
            <TextInputUIManager maxLength={20} placeholder="예시) 디자인 사이 " />
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
            <button onClick={() => setIsModal(true)}>선택하세요</button>
          </Content>
        </HeaderWrapper>

        <DetailAndUploadWrapper>
          <Detail>
            <div>
              <h2>상세설명</h2>
            </div>
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

          {/* 이미지 업로드 3개 */}
          <UploadContainer>
            <CustomUpload id="upload1" files={files} setFiles={setFiles} />
            <CustomUpload id="upload2" files={files} setFiles={setFiles} />
            <CustomUpload id="upload3" files={files} setFiles={setFiles} />
          </UploadContainer>
        </DetailAndUploadWrapper>

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
