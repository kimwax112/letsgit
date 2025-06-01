import React, { useState, useEffect } from "react";
import "./Fabric.css";
import { Sidebar, BreadCrumb, FabricItem, FixedColorPicker } from "../../../../components";
import NextButtonWithPopup from "../../../../components/Popup/NextButtonWithPopup";

// 원단 데이터
const fabricItemsData = [
  { id: 1, imageSrc: "default-image-path1.jpg", name: "면", desc: "티셔츠, 맨투맨, 후드 집업, 모든 의류에 적합합니다.", initialColor: "#0099ff" },
  { id: 2, imageSrc: "default-image-path2.jpg", name: "폴리에스터", desc: "상의, 내구성이 좋고 관리가 쉽습니다.", initialColor: "#00ccff" },
  { id: 3, imageSrc: "default-image-path5.jpg", name: "울", desc: "스웨터, 코트, 아우터 따뜻하고 보온성이 뛰어납니다.", initialColor: "#663399" },
  { id: 4, imageSrc: "default-image-path6.jpg", name: "트위드", desc: "재킷, 코트", initialColor: "#ff66cc" },
  { id: 5, imageSrc: "default-image-path6.jpg", name: "가죽", desc: "가죽가방, 라이더자켓", initialColor: "#ff66cc" },
  { id: 6, imageSrc: "default-image-path6.jpg", name: "나일론", desc: "아웃도어 재킷", initialColor: "#ff66cc" },
  { id: 7, imageSrc: "default-image-path6.jpg", name: "데님", desc: "청바지, 재킷", initialColor: "#ff66cc" },
  { id: 8, imageSrc: "default-image-path6.jpg", name: "린넨", desc: "셔츠, 드레스", initialColor: "#ff66cc" },
  { id: 9, imageSrc: "default-image-path6.jpg", name: "쉬폰", desc: "블라우스", initialColor: "#ff66cc" },
  { id: 10, imageSrc: "default-image-path6.jpg", name: "벨벳", desc: "드레스, 정장", initialColor: "#ff66cc" },
  { id: 11, imageSrc: "default-image-path6.jpg", name: "캔버스", desc: "가방, 신발, 자켓", initialColor: "#ff66cc" },
  { id: 12, imageSrc: "default-image-path6.jpg", name: "메쉬", desc: "스포츠웨어", initialColor: "#ff66cc" },
];

// 색상 코드 → 색상 이름 변환
const colorNames = {
  "#ff0000": "빨강",
  "#00ff00": "초록",
  "#0000ff": "파랑",
  "#ff9900": "주황",
  "#0099ff": "하늘",
};

const getColorName = (hex) => colorNames[hex] || "알 수 없음";

const Fabric = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedColors, setSelectedColors] = useState({});

  const itemsPerPageFirst = 8;
  const itemsPerPageSecond = 4;

  useEffect(() => {
    try {
      const storedFabric = JSON.parse(localStorage.getItem("selectedFabric")) || [];
      const storedColors = JSON.parse(localStorage.getItem("selectedColors")) || {};

      // ✅ 초기 값 설정: 만약 저장된 색상이 없으면 기본 색상으로 설정
      const initializedColors = {};
      fabricItemsData.forEach(item => {
        initializedColors[item.id] = storedColors[item.id] || item.initialColor;
      });

      setSelectedItems(storedFabric);
      setSelectedColors(initializedColors);
    } catch (error) {
      console.error("로컬 스토리지 데이터 로드 오류:", error);
    }
  }, []);

  const filteredItems = fabricItemsData.slice(
    currentPage === 1 ? 0 : itemsPerPageFirst,
    currentPage === 1 ? itemsPerPageFirst : itemsPerPageFirst + itemsPerPageSecond
  );

  const handleClickItem = (id) => {
    
    setSelectedItems((prev) => {
      const isSelected = prev.some((item) => item.id === id);
      const updatedItems = isSelected ? prev.filter((item) => item.id !== id) : [...prev, fabricItemsData.find((item) => item.id === id)];
      localStorage.setItem("selectedFabric", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleColorChange = (id, color) => {

    console.log(`🎨 색상 변경: 원단 ID ${id}, 선택한 색상: ${color}`);
    
    if (!color) return; // ✅ null 또는 undefined 방지

    setSelectedColors((prev) => {
      const updatedColors = { ...prev, [id]: color };

      console.log("🟢 업데이트된 색상:", updatedColors); // 디버깅 추가
      localStorage.setItem("selectedColors", JSON.stringify(updatedColors));
      return updatedColors;
    });
  };

  return (
    <div className="clothes-container">
      <div className="layout1">
        <aside>
          <Sidebar activePage={2} />
        </aside>
        <div className="content1">
          <BreadCrumb activePage={2} />
          <h3>2-1. 원단 선택</h3>
          <hr />
          <div className="fabric-select">
            <FabricItem
              fabricItemsData={filteredItems}
              selectedIds={selectedItems.map((item) => item.id)}
              onClickItem={handleClickItem}
            />
          </div>

          <h3>2-2. 색상 선택</h3>
          <hr />
          <div className="ColorSelect">
            {selectedItems.length > 0 ? (
              selectedItems.map((fabricItem) => (
                <div key={fabricItem.id} className="color-select-row">
                  <span className="fabric-name">{fabricItem.name}</span>
                  <div className="FixedColorPicker">
                  <FixedColorPicker
                    onColorChange={(color) => handleColorChange(fabricItem.id, color)}
                    initialColor={selectedColors[fabricItem.id]}
                  />
 
                  </div>
                  {/* ✅ 선택한 색상 이름 표시 */}
                  <span className="selected-color-name">
                    선택한 색상: {getColorName(selectedColors[fabricItem.id])}
                  </span>
                </div>
              ))
            ) : (
              <div>아직 선택된 원단이 없습니다.</div>
            )}
          </div>

          <div className="footer">
            <NextButtonWithPopup selectedItems={selectedItems.map((item) => item.name)} nextRoute="/client/Size" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fabric;