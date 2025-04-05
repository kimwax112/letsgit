import React, { useState } from "react";
import "./FavoriteDesigners.css";

const dummyDesigners = [
  {
    id: 1,
    name: "홍길동",
    intro: "감각적인 브랜드 디자이너입니다.",
    image: "https://via.placeholder.com/80"
  },
  {
    id: 2,
    name: "김디자인",
    intro: "UI/UX 전문 디자이너예요!",
    image: "https://via.placeholder.com/80"
  },
  {
    id: 3,
    name: "박크리에이티브",
    intro: "다양한 일러스트와 캐릭터 제작 가능해요.",
    image: "https://via.placeholder.com/80"
  }
  // 더미 데이터 추가 가능
];

export default function FavoriteDesigners() {
  const [designers, setDesigners] = useState(dummyDesigners);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDesigners = designers.filter((designer) =>
    designer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const visibleIds = filteredDesigners.map((d) => d.id);
    const isAllSelected = visibleIds.every((id) => selectedIds.includes(id));
    if (isAllSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      const newSelected = [...new Set([...selectedIds, ...visibleIds])];
      setSelectedIds(newSelected);
    }
  };

  const handleDeleteSelected = () => {
    setDesigners((prev) => prev.filter((d) => !selectedIds.includes(d.id)));
    setSelectedIds([]);
  };

  const handleDeleteAll = () => {
    setDesigners([]);
    setSelectedIds([]);
  };

  const isAllVisibleSelected =
    filteredDesigners.length > 0 &&
    filteredDesigners.every((d) => selectedIds.includes(d.id));

  return (
    <div className="favorites-container">
      <h2>찜한 디자이너</h2>
      <div className="top-bar">
        <input
          type="text"
          placeholder="디자이너 이름 검색"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="checkbox-all">
          <input
            type="checkbox"
            checked={isAllVisibleSelected}
            onChange={handleSelectAll}
          />
          <label>전체 선택</label>
        </div>
        <span className="count">선택됨: {selectedIds.length}명</span>
        <button onClick={handleDeleteSelected}>선택 삭제</button>
        <button onClick={handleDeleteAll}>전체 삭제</button>
      </div>

      <div className="designer-list">
        {filteredDesigners.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          filteredDesigners.map((designer) => (
            <div key={designer.id} className="designer-card">
              <input
                type="checkbox"
                checked={selectedIds.includes(designer.id)}
                onChange={() => handleSelect(designer.id)}
              />
              <img src={designer.image} alt={designer.name} />
              <div className="info">
                <h4>{designer.name}</h4>
                <p>{designer.intro}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
