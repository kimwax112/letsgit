import React from "react";
import styled from "styled-components";
import { RectButton } from "../../../../components";
const Container = styled.div`
width: 400px;
height: auto;
`;

const DetailBox = styled.div`
  aspect-ratio: 1 / 1; /* 가로:세로 = 1:1 */
  width: auto;        /* 부모 폭에 맞춰 확장 */
  background-color: white;
  border : 2px solid;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 배치 */
  align-items: flex-end;  /* 가로(수평) 끝(오른쪽)에 정렬 */
`;


export default function PostCotent3 () {
  return (
    <>
<Container>
  <ButtonContainer>
  <RectButton>상세설명</RectButton>
  <RectButton>수정하기</RectButton>
  </ButtonContainer>
  <DetailBox></DetailBox>
</Container>
    </>
  )
}