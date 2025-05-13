// Fabric.jsx

import React, { useState, useEffect } from "react";
import "./Fabric.css";
import { Sidebar, BreadCrumb, FabricItem, FixedColorPicker } from "../../../../components";
import NextButtonWithPopup from "../../../../components/Popup/NextButtonWithPopup";

// 원단 데이터 + 사용 가능 카테고리 추가
const fabricItemsData = [
  {
    id: 1,
    imageSrc: "/image/fabric/면.jpg",
    name: "면",
    desc: "티셔츠, 맨투맨, 원피스, 바지 등에 널리 쓰이며 부드럽고 통기성이 좋습니다.",
    initialColor: "#0099ff",
    availableFor: ["상의", "바지", "원피스", "스커트"]
  },
  {
    id: 2,
    imageSrc: "/image/fabric/폴리에스터.jpg",
    name: "폴리에스터",
    desc: "가볍고 내구성이 뛰어나며 관리가 쉬워 다양한 의류에 사용됩니다.",
    initialColor: "#00ccff",
    availableFor: ["상의", "바지", "스커트"]
  },
  {
    id: 3,
    imageSrc: "/image/fabric/울.jpg",
    name: "울",
    desc: "보온성이 뛰어나 겨울철 코트나 재킷 등 아우터에 적합합니다.",
    initialColor: "#663399",
    availableFor: ["아우터"]
  },
  {
    id: 4,
    imageSrc: "/image/fabric/트위드.jpg",
    name: "트위드",
    desc: "클래식하고 고급스러운 무드의 재킷, 코트 등에 사용됩니다.",
    initialColor: "#cc6699",
    availableFor: ["아우터"]
  },
  {
    id: 5,
    imageSrc: "/image/fabric/가죽.jpg",
    name: "가죽",
    desc: "라이더 자켓, 가방, 신발 등 튼튼하고 세련된 느낌을 줍니다.",
    initialColor: "#444444",
    availableFor: ["아우터", "가방", "신발", "스니커즈"]
  },
  {
    id: 6,
    imageSrc: "/image/fabric/나일론.webp",
    name: "나일론",
    desc: "가볍고 방수성이 있어 아웃도어 재킷에 많이 사용됩니다.",
    initialColor: "#6699ff",
    availableFor: ["아우터"]
  },
  {
    id: 7,
    imageSrc: "/image/fabric/데님.jpg",
    name: "데님",
    desc: "청바지와 재킷에 대표적으로 쓰이며 튼튼한 내구성이 특징입니다.",
    initialColor: "#336699",
    availableFor: ["바지", "아우터"]
  },
  {
    id: 8,
    imageSrc: "/image/fabric/린넨.jpg",
    name: "린넨",
    desc: "통기성이 뛰어나 여름철 셔츠나 원피스에 적합합니다.",
    initialColor: "#cc9966",
    availableFor: ["상의", "원피스"]
  },
  {
    id: 9,
    imageSrc: "/image/fabric/쉬폰.jpg",
    name: "쉬폰",
    desc: "가볍고 부드러워 블라우스, 드레스에 자주 사용됩니다.",
    initialColor: "#ffccff",
    availableFor: ["상의", "원피스", "스커트"]
  },
  {
    id: 10,
    imageSrc: "/image/fabric/벨벳.jpg",
    name: "벨벳",
    desc: "고급스러운 광택이 있어 드레스나 포멀웨어에 사용됩니다.",
    initialColor: "#990066",
    availableFor: ["원피스"]
  },
  {
    id: 11,
    imageSrc: "/image/fabric/캔버스.jpg",
    name: "캔버스",
    desc: "튼튼하고 질긴 소재로 가방, 신발, 재킷 등에 사용됩니다.",
    initialColor: "#888888",
    availableFor: ["신발", "가방", "아우터", "스니커즈"]
  },
  {
    id: 12,
    imageSrc: "/image/fabric/메쉬.jpg",
    name: "메쉬",
    desc: "통기성이 우수하여 스포츠웨어, 기능성 의류에 적합합니다.",
    initialColor: "#00cccc",
    availableFor: ["상의", "바지"]
  }
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
  const [filteredFabricData, setFilteredFabricData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const itemsPerPageFirst = 8;
  const itemsPerPageSecond = 4;

  useEffect(() => {
    try {
      const clothing = JSON.parse(localStorage.getItem("selectedClothing"));
      const category = clothing?.category || null;
      setSelectedCategory(category);

      const storedFabric = JSON.parse(localStorage.getItem("selectedFabric")) || [];
      const storedColors = JSON.parse(localStorage.getItem("selectedColors")) || {};

      // 초기 색상 세팅
      const initializedColors = {};
      fabricItemsData.forEach(item => {
        initializedColors[item.id] = storedColors[item.id] || item.initialColor;
      });
      setSelectedItems(storedFabric);
      setSelectedColors(initializedColors);

      // ✅ 필터링된 원단 목록 설정
      if (category) {
        const filtered = fabricItemsData.filter((fabric) =>
          fabric.availableFor.includes(category)
        );
        setFilteredFabricData(filtered);
      } else {
        setFilteredFabricData(fabricItemsData); // fallback
      }
    } catch (error) {
      console.error("로컬 스토리지 데이터 로드 오류:", error);
    }
  }, []);

  const filteredItems = filteredFabricData.slice(
    currentPage === 1 ? 0 : itemsPerPageFirst,
    currentPage === 1 ? itemsPerPageFirst : itemsPerPageFirst + itemsPerPageSecond
  );

  const handleClickItem = (id) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some((item) => item.id === id);
      const updatedItems = isSelected
        ? prev.filter((item) => item.id !== id)
        : [...prev, filteredFabricData.find((item) => item.id === id)];
      localStorage.setItem("selectedFabric", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleColorChange = (id, color) => {
    if (!color) return;
    setSelectedColors((prev) => {
      const updatedColors = { ...prev, [id]: color };
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
            <NextButtonWithPopup
              selectedItems={selectedItems.map((item) => ({
                name: item.name,
                color: getColorName(selectedColors[item.id]) || "알 수 없음", // 색상 정보가 없으면 기본 값 처리
              }))}
              nextRoute="/client/Size"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fabric;
