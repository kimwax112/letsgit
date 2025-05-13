import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import "./FavoriteDesigners.css";
import designerimg from "../../../assets/desiner.png";

const dummyDesigners = [
  {
    id: 1,
    name: "홍길동",
    intro: "감각적인 브랜드 디자이너입니다.",
    image: designerimg,
  },
  {
    id: 2,
    name: "김디자인",
    intro: "상의 전문 디자이너예요!",
    image: designerimg,
  },
  {
    id: 3,
    name: "박디자이너",
    intro: "다양한 디자인과 질 좋은 제작 가능해요.",
    image: designerimg,
  },
  {
    id: 4,
    name: "유디자인",
    intro: "바지 전문 디자이너예요!",
    image: designerimg,
  },
  {
    id: 5,
    name: "막디자인",
    intro: "자켓 전문 디자이너예요!",
    image: designerimg,
  },
  {
    id: 6,
    name: "막디자인2",
    intro: "자켓 전문 디자이너예요!",
    image: designerimg,
  },
  {
    id: 7,
    name: "막디자인3",
    intro: "자켓 전문 디자이너예요!",
    image: designerimg,
  }
];

export default function FavoriteDesigners() {
  const [designers, setDesigners] = useState(dummyDesigners);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortOrder, setSortOrder] = useState("recent");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDesigners = designers.filter((designer) =>
    designer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDesigners = [...filteredDesigners].sort((a, b) => {
    if (sortOrder === "name") {
      return a.name.localeCompare(b.name, "ko");
    } else {
      return b.id - a.id; // id 기준으로 최근순
    }
  });

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
      <div className="top-bar">
        {/* 1줄: 검색, 정렬, 삭제 버튼들 */}
        <div className="top-row">
        <div className="search-input">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="디자이너 이름 검색"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="recent">최근 찜한 순</option>
            <option value="name">이름순</option>
          </select>
          <button onClick={handleDeleteSelected}>선택 삭제</button>
          <button onClick={handleDeleteAll}>전체 삭제</button>
        </div>

        {/* 2줄: 전체 선택 체크박스 + 선택 수 */}
        <div className="bottom-row">
          <div className="checkbox-all">
            <input
              type="checkbox"
              checked={isAllVisibleSelected}
              onChange={handleSelectAll}
            />
            <label>전체 선택</label>
          </div>
          <span className="count">선택됨: {selectedIds.length}명</span>
        </div>
      </div>


      <div className="designer-list">
        {sortedDesigners.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          sortedDesigners.map((designer) => (
            <div key={designer.id} className="designer-card">
              <span
                className="heart-checkbox"
                onClick={() => handleSelect(designer.id)}
              >
                {selectedIds.includes(designer.id) ? (
                  <FaHeart color="#ff5b5b" />
                ) : (
                  <FaRegHeart color="#aaa" />
                )}
              </span>
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