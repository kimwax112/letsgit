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
  width: 150px;
  flex-shrink: 0;
  white-space: nowrap;
  &::after {
    content: ${(props) => (props.required ? '"*"' : '""')};
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
    flex-shrink: 0;
  }
`;

const Detail = styled.div`
  margin-top: 20px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > h2 {
    font-size: 24px;
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
  justify-content: flex-end;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 70px;
  gap: 20px;
  align-items: center;
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
  const options = ["2025-05-01", "2025-06-01", "2025-07-01"];
  const options2 = ["미니멀", "캐주얼", "포멀"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [MyDesignModal, setIsModal] = useState(false);
  const [files, setFiles] = useState({});
  const [title, setTitle] = useState("");
  const [categoryTags, setCategoryTags] = useState([]);
  const [style, setStyle] = useState("");
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  // 데이터 디버깅 로그
  const handleOpenModal = () => {
    console.log("Data before opening modal:", {
      title,
      categoryTags,
      style,
      amount,
      deadline,
      description,
    });
    setIsModalOpen(true);
  };

  return (
    <Container>
      <Wrapper>
        <HeaderWrapper>
          <Header>
            <img src={dress} alt="sample" />
            어떠한 옷을 원하세요?
          </Header>

          <Content>
            <RequiredLabel required>글제목</RequiredLabel>
            <TextInputUIManager
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예시) 디자인 사이"
            />
          </Content>

          <Content>
            <RequiredLabel required>카테고리</RequiredLabel>
            <TagManager
              placeholder="카테고리"
              onTagsUpdate={(tags) => {
                console.log("Category tags updated:", tags);
                setCategoryTags(tags);
              }}
            />
          </Content>

          <Content>
            <RequiredLabel required>원하는 스타일</RequiredLabel>
            <DropDown
              options={options2}
              defaultSelected={style || "선택하세요"}
              onChange={(value) => {
                console.log("Style selected:", value);
                setStyle(value);
              }}
            />
          </Content>

          <Content>
            <RequiredLabel required>원하는 금액</RequiredLabel>
            <TextInputUIManager
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="₩ 가격"
            />
          </Content>

          <Content>
            <RequiredLabel required>희망 마감기한</RequiredLabel>
            <DropDown
              options={options}
              defaultSelected={deadline || "선택하세요"}
              onChange={(value) => {
                console.log("Deadline selected:", value);
                setDeadline(value);
              }}
            />
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

          <MyEditor
            onSendMessage={(text) => {
              console.log("Description updated:", text);
              setDescription(text);
            }}
          />

          <UploadContainer>
            <CustomUpload id="upload1" files={files} setFiles={setFiles} />
            <CustomUpload id="upload2" files={files} setFiles={setFiles} />
            <CustomUpload id="upload3" files={files} setFiles={setFiles} />
          </UploadContainer>
        </DetailAndUploadWrapper>

        <Footer>
          <NextButtonUI onClick={handleOpenModal}>의뢰 등록</NextButtonUI>
          <NextButtonUI to="/client/Request">취소</NextButtonUI>
          <NextButtonUI onClick={() => alert("임시 저장되었습니다!")}>
            임시 저장
          </NextButtonUI>
        </Footer>
      </Wrapper>

      {isModalOpen && (
        <CustomRequestPopup
          onClose={() => setIsModalOpen(false)}
          data={{
            title,
            categoryTags,
            style,
            amount,
            deadline,
            description,
          }}
          
        />

      )}
      {MyDesignModal && <Modal onClose={() => setIsModal(false)} />}
    </Container>
  );
}