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
const ButtonDetailContainer = styled.button`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center;     /* 세로 중앙 정렬 */
  background-color: #799FC4;
  width: 120px;
  height: 30px;
  border: 1px solid;
  font-weight: bold;
  font-size: 18px;
`;


export default function PostCotent3 ({data}) {
  return (
    <>
<Container>
  <ButtonContainer>
  <ButtonDetailContainer>상세설명</ButtonDetailContainer>
  <ButtonDetailContainer>수정하기</ButtonDetailContainer>
  </ButtonContainer>
  <DetailBox> {data?.description || "asdf"}</DetailBox>
</Container>
    </>
  )
}