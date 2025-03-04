import React, { useState } from "react";
import styled from "styled-components";
//드롭다운기능 props안에 options(드롭다운 목록), defaultSelected(드롭다운 선택전 기본으로 나오는 텍스트)를 통해 값 설정가능
const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  max-width: 400px;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 10px;
  position: relative;
  background-color: white;
  margin-left: 50px;
`;

const DropdownButton = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  background: white;
  text-align: left;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

export default function DropDown({ options, defaultSelected = "선택하세요" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultSelected);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {selected}
      </DropdownButton>
      <DropdownList isOpen={isOpen}>
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => handleSelect(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
}
