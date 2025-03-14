import React from "react";
import ContentHeader from "../ui/ContentHeader";
import PostContent from "./ui/PostContent";
import PostContent2 from "./ui/PostContent2";
import PostCotent3 from "./ui/PostContent3";
import styled from "styled-components";

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between; /* 왼쪽과 오른쪽 컨테이너를 양 끝으로 */
`;

const Left = styled.div`
  flex: 1.2;  /* 왼쪽을 좀 더 넓게 차지 */
`;

const Right = styled.div`
  flex: 0.8;
  display: flex;               /* 내부 요소를 가로 배치 */
  justify-content: center;   /* 내부 요소들을 오른쪽 정렬 */
  align-items: flex-start;     /* 필요 시 세로 정렬 (예: 상단에 붙이기) */
`;

export default function RequestPost() {
  return (
    <>
      <ContentHeader />
      <PostContent />

      <Content>
        <Left>
          <PostContent2 />
        </Left>

        <Right>
          <PostCotent3 />
        </Right>
      </Content>
    </>
  );
}
