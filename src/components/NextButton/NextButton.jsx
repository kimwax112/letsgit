// NextButtonUI.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  type: "button";
  width: 120px;
  height: 40px;
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: #9dbbd5;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 20px;
  text-align: center;
  color: white;
  &:hover {
    background-color: #bbb;
  }
`;

const NextButtonUI = ({to, onClick, children}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) onClick();
    if (to) navigate(to)
  }

  return <Button type="button" onClick={handleClick}>{children}</Button>;
};

export default NextButtonUI;
