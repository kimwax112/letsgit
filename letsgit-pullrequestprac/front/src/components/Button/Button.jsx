import React from "react";
import styled from "styled-components";


const ButtonContainer = styled.button`
  width: 100px;
  height: 35px;
  background-color: ${(props) => (props.primary ? "#799FC4" : "gray")}; /* primary 여부에 따라 색상 변경 */
  color: white;
  border-radius: 5px;
  border: none;
  margin: 10px;
`;

export default function Button({ children, onClick, primary }) {
  return (
    <ButtonContainer onClick={onClick} primary={primary}>
      {children}
    </ButtonContainer>
  );
}

