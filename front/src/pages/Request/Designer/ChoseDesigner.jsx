import React from "react";
import Profile from "./ui/Profile";
import Search from "./ui/Search";
import styled from "styled-components";
import { RequestLayOut } from "../Request/Request";
import ContentHeader from "../ui/ContentHeader";
import SideMenuBar from "../../../components/sidebar/SideMenuBar";
import axios from "axios";
import {useState, useEffect, navigate} from "react";
import {SearchBar2, NextButtonUI } from '../../../components';
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
  border: 2px solid #799fc4;
  border-radius: 20px;
  margin: 15px;
  padding: 20px;
`;

export default function ChoseDesigner() {
  const [postsCount, setPostsCount] = useState(0);  // 개수를 저장할 상태 추가
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    const handleSearchTermChange = (newSearchTerm) => {
      setSearchTerm(newSearchTerm);
    };
  const fetchPosts = () => {
    axios.get("http://localhost:8081/api/posts", { withCredentials: true })
      .then(response => {
        console.log("글 목록 불러오기 성공", response.data);
        setPosts(response.data);
        setPostsCount(response.data.length); 
      })
      .catch(error => console.error("글 목록 불러오기 실패", error));
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const filteredPosts = posts.filter(
    (post) => post.id.toString().includes(searchTerm) // post.id가 searchTerm을 포함하는 경우만 필터링
  );
  return (
    <>
   
    <ContentHeader children="디자이너 찾기" />
    {/*<SearchBar2 onSearchTermChange={handleSearchTermChange} />*/}
    <RequestLayOut>
      <MainContainer>
        <Sidebar>
          <Search />
          <SideMenuBar />
        </Sidebar>
        <Content>
        {filteredPosts.map((post, index) => (
            <Profile key={index} post={post} />
          ))}
         
          
        </Content>
      </MainContainer>
    </RequestLayOut>
  </>
  );
}