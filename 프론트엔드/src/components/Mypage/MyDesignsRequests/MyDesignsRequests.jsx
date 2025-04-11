import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './MyDesignsRequests.css';

const MyDesignsRequests = () => {
  const [activeTab, setActiveTab] = useState('design');
  const [selectedCategory, setSelectedCategory] = useState('template');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderItems, setOrderItems] = useState([
    { id: 1, name: '의뢰서 1', date: '2025-04-01' },
    { id: 2, name: '의뢰서 2', date: '2025-04-03' },
    { id: 3, name: '의뢰서 3', date: '2025-04-05' },
    { id: 4, name: '의뢰서 4', date: '2025-04-07' },
    { id: 5, name: '의뢰서 5', date: '2025-04-09' },
    { id: 6, name: '의뢰서 6', date: '2025-04-10' }
  ]);

  const designItems = {
    template: [
      { id: 1, name: '맨투맨1', description: '맨투맨1 설명', image: '/images/맨투맨1.jpg' },
      { id: 2, name: '맨투맨2', description: '맨투맨2 설명', image: '/images/맨투맨2.jpg' },
      { id: 3, name: '맨투맨3', description: '맨투맨3 설명', image: '/images/맨투맨3.jpg' },
    ],
    pattern: [
      { id: 1, name: '자켓', description: '자켓 설명', image: '/images/자켓.jpg' },
      { id: 2, name: '치마1', description: '치마1 설명', image: '/images/치마1.jpg' },
      { id: 3, name: '치마2', description: '치마2 설명', image: '/images/치마2.jpg' },
    ],
    brand: [
      { id: 1, name: '바지', description: '바지 설명', image: '/images/바지.jpg' },
      { id: 2, name: '원피스1', description: '원피스1 설명', image: '/images/원피스1.jpg' },
      { id: 3, name: '원피스2', description: '원피스2 설명', image: '/images/원피스2.jpg' },
    ],
  };

  const handleTabClick = (tab) => setActiveTab(tab);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const handleDeleteOrder = (id) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'design' ? 'active' : ''}`}
          onClick={() => handleTabClick('design')}
        >
          디자인
        </button>
        <button
          className={`tab-button ${activeTab === 'order' ? 'active' : ''}`}
          onClick={() => handleTabClick('order')}
        >
          의뢰
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'design' && (
          <div className="tab">
            <div className="dropdown">
              <select onChange={handleCategoryChange} value={selectedCategory}>
                <option value="template">템플릿 디자인</option>
                <option value="pattern">의류 패턴 설계도 디자인</option>
                <option value="brand">브랜드 샘플 디자인</option>
              </select>
            </div>
            <div className="card-container">
              {designItems[selectedCategory].map((item) => (
                <div key={item.id} className="card" onClick={() => handleCardClick(item)}>
                  <img src={item.image} alt={item.name} className="card-image-top" />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'order' && (
          <div className="tab">
            <div className="card-container">
              {orderItems.map((item) => (
                <div key={item.id} className="order-card">
                  <span className="delete-btn" onClick={() => handleDeleteOrder(item.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </span>
                  <h3>{item.name}</h3>
                  <p>{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isModalOpen && selectedItem && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>{selectedItem.name}</h2>
            <img src={selectedItem.image} alt={selectedItem.name} className="modal-image" />
            <p>{selectedItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDesignsRequests;
