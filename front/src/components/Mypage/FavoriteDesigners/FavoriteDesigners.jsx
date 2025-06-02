import React, { useState, useEffect } from "react";
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
  },
];

export default function FavoriteDesigners() {
  const [designers, setDesigners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortOrder, setSortOrder] = useState("recent");

  // 초기 데이터 설정 및 localStorage 감지
  useEffect(() => {
    // 초기 디자이너 목록 설정
    const initialDesigners = [...dummyDesigners];

    // localStorage에서 cartItems 가져오기
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // cartItems 데이터를 디자이너 목록에 추가
    const cartDesigners = cartItems.map((item) => ({
      id: item.id, // cartItems의 id 사용 (예: "챗테")
      name: item.id, // cartItems의 id를 name으로 매핑 (작성자 정보로 간주)
      intro: item.contents, // cartItems의 contents 사용
      image: item.image || designerimg, // cartItems의 image 사용, 없으면 기본 이미지
      postnum: item.postnum, // cartItems의 postnum 추가
      timestamp: item.timestamp, // cartItems의 timestamp 추가
    }));

    // dummyDesigners와 cartDesigners 병합
    setDesigners([...initialDesigners, ...cartDesigners]);
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // localStorage 변경 감지
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "cartItems") {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const cartDesigners = cartItems.map((item) => ({
          id: item.id,
          name: item.id, // cartItems의 id를 name으로 매핑
          intro: item.contents, // cartItems의 contents 사용
          image: item.image || designerimg,
          postnum: item.postnum,
          timestamp: item.timestamp,
        }));
        setDesigners([...dummyDesigners, ...cartDesigners]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []); // 빈 의존성 배열로 마운트 시 리스너 설정

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDesigners = designers.filter((designer) =>
    designer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDesigners = [...filteredDesigners].sort((a, b) => {
    if (sortOrder === "name") {
      return a.name.localeCompare(b.name, "ko"); // 이름순 정렬
    } else {
      return 0; // 배열 순서 변경하지 않음
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
                {designer.postnum && <p>게시물 번호: {designer.postnum}</p>} {/* 추가 정보 표시 */}
                {designer.timestamp && (
                  <p>추가 시간: {new Date(designer.timestamp).toLocaleString()}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}