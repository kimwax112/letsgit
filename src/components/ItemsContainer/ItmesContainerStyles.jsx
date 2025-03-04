import styled from "styled-components";

export const Container = styled.div`
  width: 1070px;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  padding: 30px 50px;
  border: 0.8px solid black;
  position: relative;
`;

export const ItemBox = styled.div`
  width: 210px;
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px;
  background-color: ${(props) => (props.selected ? "#799fc4" : "white")};
  cursor: pointer;
`;

export const InnerBox = styled.div`
  width: 90%;
  height: 75%;
  background-color: ${(props) => (props.selected ? "white" : "#799fc4")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const ItemText = styled.div`
  height: 35px;
`;

export const NextButton = styled.button`
  position: absolute;
  width: 100px;
  height: 35px;
  bottom: 20px;
  right: 30px;
  padding: 10px 20px;
  border: none;
  background-color: #9dbbd5;
  font-size: 14.8px;
  cursor: pointer;
  border-radius: 20px;
  text-align: center;

  &:hover {
    background-color: #bbb;
  }
`;

