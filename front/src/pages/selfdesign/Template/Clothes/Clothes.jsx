import React, { useState, useEffect } from "react";
import "./Clothes.css";
import { useNavigate } from "react-router-dom";
import { Sidebar, Tabs, ItemsContainer, BreadCrumb, NextButtonWithPopup } from '../../../../components';

const items = {
  상의: [
    { name: "티셔츠(T-shirt)", image: "/image/Clothes-item/상의/T-shirt.jpg" },
    { name: "맨투맨(Sweatshirt)", image: "/image/Clothes-item/상의/Sweatshirt.jpg" },
    { name: "후드(Hoodie)", image: "/image/Clothes-item/상의/hoodie.jpg" },
    { name: "집업(Zip-up Jersey)", image: "/image/Clothes-item/상의/Zip-up.jpg" },
  ],
  // ... 나머지 items
};

const Clothes = () => {
  const navigate = useNavigate();
  const categories = Object.keys(items);
  const [activeTab, setActiveTab] = useState(0);

  const [selectedItem, setSelectedItem] = useState(() => {
    const stored = localStorage.getItem("selectedClothing");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object" && "category" in parsed && "item" in parsed) {
          return parsed;
        }
        console.warn("잘못된 localStorage 데이터 형식, 초기화합니다.");
        localStorage.removeItem("selectedClothing");
        return null;
      } catch (e) {
        console.error("localStorage 데이터 파싱 오류:", e);
        localStorage.removeItem("selectedClothing");
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (selectedItem) {
      localStorage.setItem("selectedClothing", JSON.stringify(selectedItem));
    }
  }, [selectedItem]);

  const handleNext = () => {
    if (!selectedItem) {
      alert("의류를 선택해주세요!");
      return;
    }
    console.log("✅ 다음 페이지로 이동:", selectedItem);
    navigate("/fabric");
  };

  return (
    <div className="clothes-container">
      <div className="layout1">
        <aside>
          <Sidebar activePage={1} />
        </aside>
        <div className="content1">
          <BreadCrumb activePage={1} />
          <h3>1. 의류 종류 선택</h3>
          <hr />
          <br />
          <Tabs categories={categories} activeTab={activeTab} setActiveTab={setActiveTab} />
          <ItemsContainer
            items={items}
            activeTab={categories[activeTab]}
            selectedItem={selectedItem}
            setSelectedItem={(item) => {
              const selectedCategory = categories[activeTab];
              setSelectedItem({
                category: selectedCategory,
                item: item.name,
              });
            }}
          />
          <div className="footer">
            <NextButtonWithPopup
              selectedItems={selectedItem ? [selectedItem] : []}
              nextRoute="/client/fabric"
              onNext={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clothes;