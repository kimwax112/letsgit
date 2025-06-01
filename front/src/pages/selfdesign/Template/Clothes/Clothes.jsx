import React, { useState, useEffect } from "react";
import "./Clothes.css";
import { useNavigate } from "react-router-dom";
import { Sidebar, Tabs, ItemsContainer, BreadCrumb, NextButtonWithPopup } from '../../../../components';

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
  const navigate = useNavigate();
  const categories = Object.keys(items);
  const [activeTab, setActiveTab] = useState(0);
  
  const [selectedItem, setSelectedItem] = useState(() => {
    return localStorage.getItem("selectedClothing") || null;
  });
  
  useEffect(() => {
    if (selectedItem) {
      console.log("✅ 선택한 의류(저장됨):", selectedItem);
      localStorage.setItem("selectedClothing", selectedItem);
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
              console.log("🎯 선택한 의류:", item);
              setSelectedItem(item);
            }}
          />
          <div className="footer">
            <NextButtonWithPopup selectedItems={selectedItem ? [selectedItem] : []} nextRoute="/client/fabric" onNext={handleNext} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clothes;

