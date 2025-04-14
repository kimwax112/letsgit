import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MypageContent.css';

const MypageContent = () => {
  const [activeTab, setActiveTab] = useState('design');
  const [designs, setDesigns] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('template');

  useEffect(() => {
    const id = localStorage.getItem('id'); // ✅ localStorage로 바꿈
    console.log("📦 현재 localStorage ID:", id);
  
    if (!id) return;
  
    axios.post('http://localhost:8081/api/designs/mydesigns', { id })
      .then((res) => {
        console.log('🎯 받은 디자인 데이터:', res.data);
        setDesigns(res.data);
      })
      .catch((err) => {
        console.error('❌ 디자인 불러오기 실패', err);
      });
  }, []);
  
  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // JSON 문자열 파싱 유틸
  const parseFabric = (json) => {
    try {
      const list = JSON.parse(json);
      return Array.isArray(list) ? list.join(', ') : '';
    } catch (e) {
      return '';
    }
  };

  const colorMap = {
    "#ff0000": "빨강",
    "#00ff00": "초록",
    "#0000ff": "파랑",
    "#ff9900": "주황",
    "#0099ff": "하늘",
  };
  const getColorName = (colorCode) => {
    return colorMap[colorCode] || colorCode; // 색상 코드가 없으면 코드 자체를 반환
  };

  const parseColors = (json) => {
    try {
      const parsed = JSON.parse(json);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // 첫 번째 색상만 표시
         return getColorName(parsed[0].color); // 첫 번째 색상 이름 반환
      } else {
        return '색상 없음';
      }
    } catch (e) {
      console.error("색상 파싱 오류:", e);
      return '색상 없음';
    }
  };
  


  const formatDateTime = (datetime) => {
  try {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}시`;
  } catch (e) {
    return '';
  }
};


  // 카테고리 필터링
  const filteredDesigns = designs.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <div className="mypage-wrapper">
      <div className="tab-buttons">
        <button className={activeTab === 'design' ? 'active' : ''} onClick={() => handleTabClick('design')}>디자인</button>
        <button className={activeTab === 'order' ? 'active' : ''} onClick={() => handleTabClick('order')}>의뢰</button>
      </div>

      <div className="tab-content">
        {activeTab === 'design' && (
          <div className="design-tab">
            <div className="dropdown">
              <select onChange={handleCategoryChange} value={selectedCategory}>
                <option value="template">템플릿 디자인</option>
                <option value="pattern">의류 패턴 설계도 디자인</option>
                <option value="brand">브랜드 샘플 디자인</option>
              </select>
            </div>

            {filteredDesigns.length === 0 ? (
              <p>해당 카테고리에 저장된 디자인이 없습니다.</p>
            ) : (
              <div className="card-container">
                {filteredDesigns.map((item) => (
                  <div key={item.designId} className="card" onClick={() => handleCardClick(item)}>
                    <img src={item.imageUrl} alt={item.designName} className="card-image" />
                    <h3>{item.designName}</h3>
                    <p>{item.clothingType}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'order' && (
          <div className="order-tab">
            <p>의뢰 탭 내용</p>
            {/* 의뢰 탭 내용은 여기에 구현 */}
          </div>
        )}
      </div>

      {isModalOpen && selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>{selectedItem.designName}</h2>
            {/* <img src={selectedItem.imageUrl} alt={selectedItem.designName} className="modal-image" /> */}
            <p><strong>의류 종류:</strong> {selectedItem.clothingType}</p>
            <p><strong>원단:</strong> {parseFabric(selectedItem.fabricJson)}</p>
            <p><strong>사이즈:</strong> {selectedItem.size}</p>
            <p><strong>제작일:</strong> {formatDateTime(selectedItem.createdAt)}</p>
            <p><strong>색상:</strong> {parseColors(selectedItem.colorsJson)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MypageContent;
