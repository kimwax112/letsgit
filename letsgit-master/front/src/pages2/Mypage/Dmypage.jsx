import React from "react";
import styled from "styled-components";
import Sidebar from "./ui/Sidebar";
import Content from "./ui/Content";
import hoddi from '../../assets/후드집업.png';
import { NextButtonUI } from "../../components";
// 전체 레이아웃
const Layout = styled.div`
  display: flex;
  min-height: 100vh; /* 전체 화면 높이 활용 */
`;

// 사이드바 영역 (고정 너비)
const Left = styled.div`
  width: 400px; /* 고정 너비 */
  background-color: #f4f4f4; /* 예시 배경색 */
  transition: width 0.3s ease-in-out; /* 부드러운 전환 */
  
`;

// 콘텐츠 영역 (남은 공간 채움)
const Right = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 1.5rem; /* 24px */
  margin: 2rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 1.25rem; /* 20px */
  font-family: 'Noto Sans KR', sans-serif;
`;

const Text= styled.p`
  display:flex;
  justify-content: flex-start;
  font-size: 18px;
`;
const Portfolio = styled.div`
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dotted #000; 
  border-radius: 10px;
`;
const Img = styled.img`
width: 7vh;
height: 7vh;
`;

const Button = styled(NextButtonUI)`
  all: unset;
    width: 20vh;
    height: 3vh;
  text-align: center;
  border : 1px solid;
  border-radius: 5px;
  cursor: pointer;
  margin : 10px;
`;

export default function DMyPage() {

  return (
    <Layout>
      <Left>
        <Sidebar/>
      </Left>
      <Right>
        <Content>
        <Text>내 포트폴리오</Text>
          <Portfolio>
          <Text style={{opacity: '0.2'}}>포트폴리오를 등록해 나의 디자인을 노출시켜보세요</Text>
          <Img src={hoddi} alt="포트폴리오 아이콘" />
          <Button to='/designer/Portfolio'>포트폴리오 등록하기</Button>
          </Portfolio>
        </Content>
      </Right>
    </Layout>
  );
}