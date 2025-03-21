import React from "react";
import styled from "styled-components";
import ContentHeader from '../ui/ContentHeader';
import ItemBox from './ui/ItemBox';

export function RequestLayOut ({children}) {
  const Container = styled.div`
  width: 100%;
  background: white;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  margin: 0 auto;
  justify-content: center;
`;
const ContentHeader1 = styled.div`
  width: 50%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  gap: 100px;
  
`;

  return(
<>
<Container>
  <ContentHeader1/>
  <Content>
  {children}
  </Content>
</Container>
</>
  )
}

export default function Request() {
  return (
    <>
    <ContentHeader children="디자이너 구인 게시글 작성하기"/>
    <RequestLayOut>
      
          <ItemBox />
          <ItemBox />
          <ItemBox />
          <ItemBox />
          <ItemBox />
          <ItemBox />
          <ItemBox />
    </RequestLayOut>
    </>
  );
}
