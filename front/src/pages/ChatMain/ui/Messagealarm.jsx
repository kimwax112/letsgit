import React from "react";
import styled from "styled-components";

const AlarmWrapper = styled.div`
  padding: 10px;
  margin: 5px 0;
  background-color: #f0f0f0;
  border-radius: 5px;
  display: ${(props) => (props.visible ? "block" : "none")};
`;

export default function Messagealarm({ contract, visible, setVisible }) {
  const { title, designer, date } = contract || {};

  return (
    <AlarmWrapper visible={visible}>
      <h6>{designer}</h6>
      <p>Message: {title || "기본메시지"}</p>
      <p>Date: {date || "날짜 없음"}</p>
    </AlarmWrapper>
  );
}