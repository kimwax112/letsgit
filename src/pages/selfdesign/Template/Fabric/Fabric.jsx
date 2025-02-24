import React, { useState } from "react";
import "./Fabric.css"; // 별도의 CSS 파일
import { Sidebar, BreadCrumb, FabricItem, ColorPicker, FixedColorPicker } from "../../../../components";
import NextButtonWithPopup from "../../../../components/Popup/NextButtonWithPopup";



// 예시 원단 데이터 (id 값은 중복되지 않도록 수정)
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

const Fabric = () => {
  // 원단을 클릭해서 선택된 원단 객체들을 배열로 관리 (클릭 순서 유지)
  const [selectedItems, setSelectedItems] = useState([]);

  // 아이템 클릭 시 선택/해제 처리 (이미 선택된 경우 제거, 아니면 추가)
  const handleClickItem = (id) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some((item) => item.id === id);
      if (isSelected) {
        return prev.filter((item) => item.id !== id);
      } else {
        const newItem = fabricItemsData.find((item) => item.id === id);
        return [...prev, newItem];
      }
    });
  };

  // 팝업에 전달할 "선택된 원단 이름" 배열
  const selectedNames = selectedItems.map((item) => item.name);

  return (
    <div className="clothes-container">
      <div className="layout1">
        <aside className="sidebar">
          {/* Sidebar는 activePage에 따라 다르게 표시 */}
          <Sidebar activePage={2} />
        </aside>
        <div className="content1">
          <BreadCrumb activePage={2} />
          <h3>2. 원단 선택</h3>
          <div className="item-and-color-container">
            {/* FabricItem 컴포넌트에 원단 데이터와 선택 상태, 클릭 핸들러 전달 */}
            <FabricItem
              fabricItemsData={fabricItemsData}
              selectedIds={selectedItems.map((item) => item.id)}
              onClickItem={handleClickItem}
            />
            {/* ColorSelect 영역: 선택된 원단들을 한 행씩 표시하고, 각 줄에 ColorPicker 배치 */}
            <div className="ColorSelect">
              {selectedItems.length > 0 ? (
                selectedItems.map((fabricItem) => (
                  <div key={fabricItem.id} className="color-select-row">
                    <span className="fabric-name">{fabricItem.name}</span>
                    <div class="FixedColorPicker"><FixedColorPicker /></div>
                  </div>
                ))
              ) : (
                <div>아직 선택된 원단이 없습니다.</div>
              )}
            </div>
          </div>
          <div className="footer">
            <NextButtonWithPopup selectedItems={selectedNames} nextRoute="/Size" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fabric;
