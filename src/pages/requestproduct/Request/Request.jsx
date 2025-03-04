import React from "react";
import { SearchBar2, ItemBox, NextButtonUI } from "../../../components";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background: white;
`;

const Text1 = styled.div`
  flex: 0 0 max-content;
  align-self: flex-start;
`;

const ContentHeader = styled.div`
  width: 50%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  gap: 100px;
  padding: 50px;
`;

const SearchButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 50%;
`;

const Content = styled.div`
  width: 1000px;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  margin: 0 auto;
  padding: 100px;
  justify-content: center;
`;

export default function Request() {
  return (
    <>
      <Container>
        <ContentHeader>
          <Text1>
            <h1>구인 게시글 작성하기</h1>
          </Text1>
          <SearchButtonWrapper>
            <SearchBar2 />
            <ButtonContainer>
              {/* '임시저장함' 버튼 → /SavedRequests 페이지로 이동 */}
              <NextButtonUI to="/SavedRequests">임시저장함</NextButtonUI>
              {/* '글쓰기' 버튼 → /RequestWriting 페이지로 이동 */}
              <NextButtonUI to="/RequestWriting">글쓰기</NextButtonUI>
            </ButtonContainer>
          </SearchButtonWrapper>
        </ContentHeader>

        <Content>
          <ItemBox />
          <ItemBox />
          <ItemBox />
          <ItemBox />
          <ItemBox />
          <ItemBox />
          <ItemBox />
        </Content>
      </Container>
    </>
  );
}
