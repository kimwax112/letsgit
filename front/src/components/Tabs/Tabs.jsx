import React from "react";
import styled from "styled-components";

const TabsWrapper = styled.ul`
  display: flex;
  width: 73.25rem; /* 1171px / 16 = 73.25rem */
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 0.125rem solid #ddd; /* 2px / 16 = 0.125rem */
  text-align: center;

  li {
    width: 8.75rem; /* 140px / 16 = 8.75rem */
    padding: 0.625rem 0.9375rem; /* 10px / 16 = 0.625rem, 15px / 16 = 0.9375rem */
    cursor: pointer;
    border-radius: 0.9375rem 0.9375rem 0 0; /* 15px / 16 = 0.9375rem */
    border: 0.05rem solid black; /* 0.8px / 16 = 0.05rem */
    border-bottom: none;
    background-color: #fff;
    font-weight: bold;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  li.active {
    background-color: #eee;
  }
`;

const Tabs = ({ categories, activeTab, setActiveTab }) => {
  return (
    <TabsWrapper>
      {categories.map((category, index) => (
        <li
          key={index}
          className={index === activeTab ? "active" : ""}
          onClick={() => setActiveTab(index)}
        >
          {category}
        </li>
      ))}
    </TabsWrapper>
  );
};

export default Tabs;
