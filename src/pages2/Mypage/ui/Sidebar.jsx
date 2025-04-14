import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width : 100%;
  height: 100%;
  margin : 0 auto;
  justify-content : center;
  align-items: center;
  flex-direction : column;
  background-color: #FAFAFC;
`;

const Title = styled.p`
  font-size: 55px;
  font-weight : bold;
  margin : 60px;
`;

const Bar = styled.div`
  width: 68%;
  background-color : white;
  min-height : 80vh;
` 
const ConText = styled.p`
  font-size: 20px;
  font-weight: bold;
  justify-content: flex-start
  margin : 0 auto;
  padding : 10px;
`;
export default function Sidebar() {
  return (
    <>
<Container>
  <Title>마이페이지</Title>
  <Bar>
    <ConText>내정보</ConText>
    <ConText>포트폴리오 관리</ConText>
    <ConText>계약조회&배송내역</ConText>
    <ConText>제작관리</ConText>
  </Bar>
</Container>

    </>
  )
}