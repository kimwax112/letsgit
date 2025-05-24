import React from "react";
import styled from "styled-components";

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  margin: 0 auto;
  background-color: #f5f5f5;
  padding: 20px;
  gap: 20px;
  max-height: 800px;
`;

const LeftSection = styled.div`
  flex: 1;
  text-align: center;
  margin-top: 40px;
`;

const Title = styled.h2`
  max-width: 100%;
  font-size: 28px;
  margin-bottom: 200px;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #666;
  display: flex;
  gap: 20px; /* 라벨들 사이 간격 */
  justify-content: center;
`;

/* 에스터리스크(*)에만 스타일 적용할 컴포넌트 */
const Asterisk = styled.span`
  color: #ff6600;
  font-weight: bold;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
`;

/* 라벨 배열 예시 */
const labels = ["카테고리", "원하는 스타일", "원하는 금액"];

export default function PostContent({data}) {
  return (
    <Container>
      <LeftSection>
        <Title>{data?.title || "청바지 무릎부분 센스있게 작성하실 분 구합니다!"}</Title>
        <SubTitle>
          {labels.map((label, i) => (
            <React.Fragment key={i}>
              {label}
              <Asterisk>*</Asterisk>
            </React.Fragment>
          ))}
        </SubTitle>
      </LeftSection>

      <RightSection>
        <StyledImage src="image/image51.png" alt="이미지가 없습니다" />
      </RightSection>
    </Container>
  );
}
