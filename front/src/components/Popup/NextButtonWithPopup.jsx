// NextButtonWithPopup.jsx
// 다음 버튼을 누를시 나오는 팝업 페이지 컴포넌트 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NextButtonUI from "../NextButton/NextButton";
import Popup from "./Popup"; // Popup 컴포넌트는 앞서 제공한 예제 참조

const NextButtonWithPopup = ({ selectedItems, nextRoute }) => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleNextClick = () => {
    if (selectedItems.length === 0) {
      alert("항목을 선택해주세요.");
      return;
    }
    setIsPopupOpen(true);
  };

  const handleConfirm = () => {
    setIsPopupOpen(false);
    navigate(nextRoute); // 원하는 다음 페이지 경로
  };

  return (
    <>
      <NextButtonUI onClick={handleNextClick} />
      {isPopupOpen && (
        <Popup
          title="선택된 항목:"
          onCancel={() => setIsPopupOpen(false)}
          onConfirm={handleConfirm}
        >
          <ul>
            {selectedItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Popup>
      )}
    </>
  );
};


export default NextButtonWithPopup;
