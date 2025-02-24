import React, { useState } from "react";
import "./Fabric.css";
import { Sidebar, BreadCrumb ,FabricItem} from "../../../../components";
import NextButtonWithPopup from "../../../../components/Popup/NextButtonWithPopup";


// 예시 원단 데이터 (FabricItem.jsx와 동일한 데이터)
const fabricItemsData = [
  { id: 1, imageSrc: "default-image-path1.jpg", name: "면", desc: "모든 의류에 적합합니다.", initialColor: "#0099ff" },
  { id: 2, imageSrc: "default-image-path2.jpg", name: "폴리에스터", desc: "내구성이 좋고 관리가 쉽습니다.", initialColor: "#00ccff" },
  { id: 3, imageSrc: "default-image-path5.jpg", name: "울", desc: "따뜻하고 보온성이 뛰어납니다.", initialColor: "#663399" },
  { id: 4, imageSrc: "default-image-path6.jpg", name: "트위드", desc: "세련되고 독특한 질감입니다.", initialColor: "#ff66cc" },
  
];

const Fabric = () => {
  // Fabric 페이지에서 선택 상태를 관리
  const [selectedIds, setSelectedIds] = useState([]);

  // 아이템 클릭 시 선택/해제 처리 (상태 끌어올리기)
  const handleClickItem = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // 선택된 원단 이름 목록 (NextButtonWithPopup에 전달할 데이터)
  const selectedItems = fabricItemsData
    .filter((item) => selectedIds.includes(item.id))
    .map((item) => item.name);

  return (
    <div className="clothes-container">
      <div className="layout1">
        <aside className="sidebar">
          <Sidebar activePage={2} />
        </aside>
        <div className="content1">
          <BreadCrumb activePage={2}/>
          <h3>2. 원단 선택</h3>
          {/* FabricItem 컴포넌트에 상태와 클릭 핸들러 전달 */}
          <FabricItem
            fabricItemsData={fabricItemsData}
            selectedIds={selectedIds}
            onClickItem={handleClickItem}
          />
          <div className="footer">
          {/* NextButtonWithPopup 컴포넌트를 상위에서 사용 */}
          <NextButtonWithPopup selectedItems={selectedItems}
           nextRoute="/Size" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default Fabric;
