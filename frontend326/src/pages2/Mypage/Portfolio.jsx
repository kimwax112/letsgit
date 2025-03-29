import { useState } from "react";
import React from "react";
import styled from "styled-components";
import Sidebar from "./ui/Sidebar";
import Content from "./ui/Content";
import { ImageUploader, NextButtonUI } from "../../components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PostPrac from "../../PostPrac";

// 전체 레이아웃
const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

// 사이드바 영역 (고정 너비)
const Left = styled.div`
  width: 400px;
  background-color: #f4f4f4;
  transition: width 0.3s ease-in-out;
`;

// 콘텐츠 영역 (남은 공간 채움)
const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const Footer = styled.div`
  display:flex;
  margin: 0 auto;
  margin : 80px;
  justify-content: flex-end;  
  gap: 10px;
  
`;
// const CustomNextButtonUI = styled(NextButtonUI)`
//   display:flex;

//   justify-content : flex-end;
// `;



// 포트폴리오 설명 박스
const PortfolioExplain = styled.div`
  border: 1px dashed #ccc;
  border-radius: 10px;
  display: flex;
  width: 100%;
  max-width: 600px;
  height: auto;
  min-height:30vh;
  background-color: white;
  margin: 0 auto;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 80px;
  padding: 20px;
`;
const PortfolioExplain2 = styled.div`
  border: 1px dashed #ccc;
  border-radius: 10px;
  display: flex;
  width: 100%;
  max-width: 600px;
  height: auto;
  background-color: white;
  margin: 0 auto;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 80px;
  padding: 20px;
`;

const PortfolioExplain3 = styled.div`
  border: 1px dashed #ccc;
  border-radius: 10px;
  display: flex;
  width: 100%;
  max-width: 600px;
  height: auto;
  background-color: white;
  margin: 0 auto;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 80px;
  padding: 20px;
`;

const Text = styled.p`
  display: flex;
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
`;

const Textinput = styled.input`
  border: none;
  display: flex;
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
  opacity: 0.7;
`;

// 캐러셀 컨테이너
const UploadContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px; /* 3개 아이템이 보이도록 설정 */
  background-color: white;
  margin: 0 auto;
  position: relative;
  overflow: hidden; /* 넘치는 아이템 숨김 */
`;

// 캐러셀 트랙 (아이템들을 감싸는 컨테이너)
const CarouselTrack = styled.div`
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease-in-out; /* 부드러운 이동 애니메이션 */
`;

// 화살표 버튼 스타일
const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

const RightArrow = styled(ArrowButton)`
  right: 10px;
`;

const CustomUpload = styled(ImageUploader)`
  width: 20vh;
  height: 20vh;
  min-width: 150px; /* 최소 크기 보장 */
  min-height: 150px;
  max-width: 200px;
  max-height: 200px;
  flex-shrink: 0; /* 아이템 크기 고정 */
`;

const CustomUpload2 = styled(ImageUploader)`
  width: 20vh;
  height: auto;
  flex-shrink: 0; /* 아이템 크기 고정 */
`;


export default function Portfolio() {
  const [inputValue, setInputValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0); // 캐러셀 현재 위치
  const itemsPerView = 3; // 한 번에 보여줄 아이템 수
  const totalItems = 5; // 전체 아이템 수 (CustomUpload 개수)
  const maxIndex = Math.max(0, totalItems - itemsPerView); // 최대 이동 가능 인덱스

  const navigate = useNavigate();
  const [files, setFiles] = useState({});

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const clickButton = () => {
    alert('작성이 완료되었습니다.')
    navigate('/designer/Dmypage')
  }
 
  // 왼쪽으로 이동
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };
  // 오른쪽으로 이동
  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };
  const itemWidthVh = 20; // CustomUpload의 width: 20vh
  const gapPx = 20; // gap: 20px
  const containerWidthPx = 600; // UploadContainer의 max-width: 600px
  const itemWidthPx = (itemWidthVh * window.innerHeight) / 100; // 20vh를 px로 변환
  const totalItemWidthPx = itemWidthPx + gapPx; // 아이템 하나의 너비 + gap (px)
  const trackWidthPx = totalItems * (itemWidthPx + gapPx) - gapPx; // 마지막 gap 제외

  let translateX;
  if (currentIndex === maxIndex) {
    translateX = -(trackWidthPx - containerWidthPx);
  } else {
    translateX = -(currentIndex * totalItemWidthPx);
  }

  return (
    <Layout>
      <Left>
        <Sidebar />
      </Left>
      <Right>
        
        <Content>
          <PortfolioExplain>
            <Text>포트폴리오 설명</Text>
            <Textinput
              value={inputValue}
              onChange={handleInputChange}
              placeholder="주로하는 프로젝트의 목적 주로 만드는 옷과 스타일을 설명해주세요"
            />
            <PostPrac/>
          </PortfolioExplain>
          
          <PortfolioExplain2>
            <Text>이미지 등록(필수)</Text>
          <UploadContainer>
            {/* 왼쪽 화살표 */}
            {currentIndex > 0 && (
              <LeftArrow onClick={handlePrev}>
                <FaArrowLeft />
              </LeftArrow>
            )}

            {/* 캐러셀 트랙 */}
            <CarouselTrack
              style={{
                transform: `translateX(${translateX}px)`,
              }}
            >
              <CustomUpload id="upload1" files={files} setFiles={setFiles} />
              <CustomUpload id="upload2" files={files} setFiles={setFiles} />
              <CustomUpload id="upload3" files={files} setFiles={setFiles} />
              <CustomUpload id="upload4" files={files} setFiles={setFiles} />
              <CustomUpload id="upload5" files={files} setFiles={setFiles} />
            </CarouselTrack>

            {/* 오른쪽 화살표 */}
            {currentIndex < maxIndex && (
              <RightArrow onClick={handleNext}>
                <FaArrowRight />
              </RightArrow>
            )}
          </UploadContainer>
          </PortfolioExplain2>

          <PortfolioExplain3>
          <Text>참여했던 계약 등록</Text>
          <UploadContainer>
          <CustomUpload2 id="upload6" files={files} setFiles={setFiles} />
          </UploadContainer>
          </PortfolioExplain3>

            <Footer>
              <NextButtonUI onClick={clickButton}/><NextButtonUI/>
            </Footer>
        </Content>
     
      </Right>
    </Layout>
  );
}