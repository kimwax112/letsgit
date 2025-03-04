import React from "react";
import {
  Container,
  ItemBox,
  InnerBox,
  ItemText,
} from "./ItmesContainerStyles";

const ItemsContainer = ({
  items,
  activeTab,
  selectedItem,
  setSelectedItem,
  handleNextClick,
}) => {
  return (
    <Container>
      {items[activeTab]?.map((item, index) => (
        <ItemBox
          key={index}
          selected={selectedItem === item}
          onClick={() => setSelectedItem(item)}
        >
          <InnerBox selected={selectedItem === item}>
            {selectedItem === item && <div>선택됨</div>}
          </InnerBox>
          <ItemText>{item}</ItemText>
        </ItemBox>
      ))}
    </Container>
  );
};

export default ItemsContainer;