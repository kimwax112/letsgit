import React, { useState } from "react";
import "./Clothes.css";

const categories = ["상의", "아우터", "바지", "원피스", "스커트", "스니커즈", "신발", "가방"];
const items = {
  상의: ["티셔츠(T-shirt)", "맨투맨(Sweatshirt)", "후드(Hoodie)", "집업(Zip-up Jersey)"],
  아우터: ["코트(Coat)", "자켓(Jacket)"],
  바지: ["청바지(Jeans)", "슬랙스(Slacks)", "조거팬츠(Jogger Pants)"],
  원피스: ["미니 원피스", "맥시 원피스"],
  스커트: ["미니 스커트", "롱 스커트"],
  스니커즈: ["러닝화", "하이탑"],
  신발: ["로퍼", "샌들"],
  가방: ["백팩", "토트백"],
};

const Clothes = () => {
  const [selectedCategory, setSelectedCategory] = useState("상의");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedItem(null); // 새 카테고리 선택 시 선택된 아이템 초기화
  };

  return (
    <div className="clothes-container">
      {/* 헤더 */}
      <header className="header">
        <h1>중개 플랫폼</h1>
        <nav className="nav-links">
          <a href="#">직접 의류 디자인</a>
          <a href="#">의뢰서 작성</a>
          <a href="#">제작 의뢰 맡기기</a>
          <a href="#">대화방</a>
          <a href="#">계약 관리</a>
          <a href="#">의뢰 관리</a>
          <button>시작하기</button>
        </nav>
      </header>

      <div className="title-text">
      <h3>사이트 제공 템플릿으로 디자인<br></br><br></br><br></br>
      1. 의류 종류 선택</h3>
      <p><h5>의류 종류 선택 &rarr;</h5></p>
      </div>

      <div className="design-container">
        <div className="design-step">
          사이트 제공 탬플릿으로 디자인<hr></hr>
          1. 의류 종류 선택 <br></br>
          2. 원단 선택 <br></br>
          3. 사이즈 스펙 입력 <br></br>
          4. 최종 확인
        </div>

      {/* 카테고리 탭 */}
      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`tab ${selectedCategory === category ? "active" : ""}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>

      {/* 아이템 카드 */}
      <div className="item-grid">
        {items[selectedCategory]?.map((item) => (
          <div
            key={item}
            onClick={() => setSelectedItem(item)}
            className={`item-card ${selectedItem === item ? "selected" : ""}`}
          >
            {item}
          </div>
        ))}
      </div>

      {/* 하단 버튼 */}
      <div className="footer">
        <button
          onClick={() =>
            alert(selectedItem ? `선택된 아이템: ${selectedItem}` : "선택된 아이템이 없습니다.")
          }
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Clothes;
