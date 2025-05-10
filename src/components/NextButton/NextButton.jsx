// NextButtonUI.jsx
import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 200px;
  height: 40px;
  margin-top: 5px;
  padding: 10px 20px;
  border: none;
  background-color: #9dbbd5;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
  text-align: center;

  &:hover {
    background-color: #bbb;
  }
`;

const NextButtonUI = ({ onClick }) => {
  return <Button onClick={onClick}>다음</Button>;
};

export default NextButtonUI;
