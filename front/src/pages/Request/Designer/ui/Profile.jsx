import React from "react";
import styled from "styled-components";
import cart2 from "../../../../assets/cart2.png";
import jeans from "../../../../assets/jeans.png";

const Container = styled.div`
  display: flex;
  position: relative;
  width: 250px;
  height: 250px;
  background-color: white;
  border : 0.5px solid;
  margin : 30px;
`;

const JeansImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 정중앙 정렬 */
  width: 250px;
  height: 200px;
`;

const CartButton = styled.button`
  position: absolute;
  top: 10px; /* 상단 여백 */
  right: 10px; /* 우측 여백 */
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
`;

const CartImage = styled.img`
  width: 100%;
  height: 100%;
`;

export default function Profile() {
  const handleClick = () => {
    alert("카트 버튼이 클릭되었습니다!");
  };

  return (
    <Container>
      <JeansImage src={jeans} alt="jeans" />
      <CartButton onClick={handleClick}>
        <CartImage src={cart2} alt="cart" />
      </CartButton>
    </Container>
  );
}
