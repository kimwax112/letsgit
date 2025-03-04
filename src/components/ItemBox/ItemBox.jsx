import React from "react";
import styled from "styled-components";

const ItemBoxContainer = styled.div`
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;      /* 가로축(교차축) 가운데 정렬 */
  background-color: white;
  width: 250px;
  min-height: 300px;
  border: 0.5px solid;
  border-radius: 10px;
  gap: 10px;
  /* 기존에 margin이 있거나, padding이 있을 경우 제거/조절 */
  margin: 20px;     /* 상하좌우 여백을 없앰 */
  padding: 0;    /* 내부 여백 제거 */
`;


const InnerBox = styled.div`
  background-color: #F6F2F2;
  width: 87%;
 min-height: 150px; /* 최소 높이 지정 */
  border: 0.5px solid;
  border-color:#EBE5E5;
  border-radius: 10px;
  margin-top: 10px;
  padding: 5px;
  
  
`;

const DescriptionContainer = styled.div`
  align-self: flex-start; /* 왼쪽 정렬 */
  margin: 1px
  
  
`;

const TagContainer = styled.div`
display: flex;
`;

const Tag = styled.div`
  background-color: #bfd7ee; /* 세미콜론 누락 주의! */
  width: 50px;
  height: 20px;
  border: 0.5px solid;
  border-radius: 15px;
  color : white;
  padding: 7px;
  margin : 5px;
  text-align: center;

`;

const Circle = styled.div`
width: 20px;
height: 20px;
border-radius: 20px;
border: 1px solid;
margin : 5px;


`;

const Profile = styled.div`
display: flex;
align-items: center;    
gap: 5px;
margin : 5px;
margin-left: 1px;

`;
const Text = styled.div`
  margin: 5px;
  font-weight: 1000;
  white-space: nowrap;       /* 텍스트를 한 줄로 유지 */
  overflow: hidden;          /* 넘치는 텍스트를 숨김 */
  text-overflow: ellipsis;   /* 넘치는 부분 ... 표시 */
  width: 180px;              /* 고정 너비 설정 (원하는 값으로 조절) */
`;


const Text2 = styled.div`
margin : 5px;
color: #6B6565;
`;




export default function ItemBox() {
  return (
    <ItemBoxContainer>
      <InnerBox />
      <DescriptionContainer>
        <TagContainer>
      <Tag>청바지</Tag><Tag>청바지</Tag>
      </TagContainer>
      <Text>청바지 무릎부분 센스있게 작성가능하신분 모십니다</Text>
      <Profile>
        <Circle />홍길동
      </Profile>
      <Text2>희망금액:10,000 원</Text2>
      <Text2>희망기한:2주</Text2>
      </DescriptionContainer>
    </ItemBoxContainer>
  );
}
