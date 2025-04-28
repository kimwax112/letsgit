// 디자인 불러오기 맨투맨 ui 
import styled from "styled-components"

const ItemBoxContainer = styled.div`
  border: 0.5px solid;
  width: 150px;
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 10px;
  background-color: ${(props) => (props.selected ? "#799fc4" : "white")};
  cursor: pointer;
`;

const InnerBox = styled.div`
  width: 90%;
  height: 75%;
  background-color: ${(props) => (props.selected ? "white" : "#799fc4")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const ItemText = styled.div`
  font-weight: bold;
  height: 35px;
`;

export default function ItemBox ({text1, text2, onClick}) {
  return (
<ItemBoxContainer onClick={() => onClick?.({ text1, text2 })}>
<InnerBox/>
<ItemText>
{text1}
</ItemText>
<ItemText>
{text2}
</ItemText>
</ItemBoxContainer>
  )
}
