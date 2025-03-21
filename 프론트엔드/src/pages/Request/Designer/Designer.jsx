import React from "react";
import Profile from "./ui/Profile";
import Search from "./ui/Search";
import styled from "styled-components";
import { RequestLayOut } from "../Request/Request";
import ContentHeader from "../ui/ContentHeader";
import SideMenuBar from "../../../components/sidebar/SideMenuBar";

// 전체 레이아웃을 감싸는 컨테이너
const MainContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh; /* 화면 전체 높이 */
`;

// Sidebar 스타일
const Sidebar = styled.div`
  flex: 0 0 250px; /* Sidebar 너비 고정 */
  display: flex;
  flex-direction: column;
  background: #fff; /* Sidebar 배경색 */
  padding: 20px;
  border-right: 1px solid #ccc; /* 구분선 */
`;

// Content(App Screen) 스타일
const Content = styled.div`
  flex: 1; /* 나머지 공간을 채움 */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border: 2px solid;
  border-radius: 10px;
  margin: 15px;
  padding: 20px;
`;

export default function Designer() {
  return (
    <>
    
      <ContentHeader children="디자이너 찾기" />
      <RequestLayOut>
        <MainContainer>
          <Sidebar>
            <Search />
            <SideMenuBar />
          </Sidebar>
          <Content>
            <Profile />
            <Profile />
            <Profile />
            <Profile />
            <Profile />
            <Profile />
            <Profile />
            <Profile />
            <Profile />
            <Profile />
            <Profile />
            <Profile />
            <Profile />
          </Content>
        </MainContainer>
      </RequestLayOut>
    </>
  );
}