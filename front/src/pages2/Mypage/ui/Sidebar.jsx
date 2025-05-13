import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  justify-content: flex-start; /* 중앙 정렬 대신 상단 정렬 */
  align-items: flex-start; /* 중앙 정렬 대신 상단 정렬 */
  flex-direction: column;
  background-color: #fafafc;

  @media (max-width: 768px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const Title = styled.p`
  font-size: 55px;
  font-weight: bold;
  margin: 60px; /* 큰 화면에서 유지 */
  margin-bottom: 20px; /* 하단 마진 조정 */

  @media (max-width: 768px) {
    font-size: 40px; /* 작은 화면에서 글자 크기 조정 */
    margin: 20px; /* 작은 화면에서 마진 줄이기 */
    margin-bottom: 10px; /* 하단 마진 더 줄이기 */
  }
`;

const Bar = styled.div`
  width: 300px;
  background-color: white;
  min-height: 80vh;
  margin: 0; /* 기본 마진 제거 */
  padding: 0;
  

  @media (max-width: 768px) {
    width: 100%; /* 작은 화면에서 너비 조정 */
    min-height: auto; /* 높이 조정 */
  }
`;

const ConText = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 20px; /* 기본 마진 제거 */
  padding: 10px;

  @media (max-width: 768px) {
    font-size: 16px; /* 작은 화면에서 글자 크기 조정 */
    padding: 5px; /* 패딩 줄이기 */
  }
`;

export default function Sidebar() {
  return (
    <Container>
      <Title>마이페이지</Title>
      <Bar>
        <ConText>내정보</ConText>
        <ConText>포트폴리오 관리</ConText>
        <ConText>계약조회&배송내역</ConText>
        <ConText>제작관리</ConText>
      </Bar>
    </Container>
  );
}