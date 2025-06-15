import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './MyDesignsRequests.css';
import axios from 'axios';

const MyDesignsRequests = ({ username: propUsername }) => {
  const [activeTab, setActiveTab] = useState('design');
  const [selectedCategory, setSelectedCategory] = useState('template');
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [selectedDesignItem, setSelectedDesignItem] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [username, setUsername] = useState(propUsername);
  const [designs, setDesigns] = useState([]);
  const [userFiles, setUserFiles] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  const colorMap = { "#ff0000": "빨간", "#00ff00": "초록", "#0000ff": "파란", "#ff9900": "주황", "#0099ff": "하늘" };

  useEffect(() => {
    if (!propUsername) {
      const fetchSession = async () => {
        try {
          const res = await fetch("http://localhost:8081/api/user", { credentials: 'include' });
          if (!res.ok) throw new Error("세션 없음");
          const data = await res.json();
          if (data.username) setUsername(data.username);
        } catch (err) {
          console.warn("세션 정보 없음:", err);
        }
      };
      fetchSession();
    }
  }, [propUsername]);

  useEffect(() => {
    if (username) {
      fetchMyDesigns();
      fetchUserFiles();
    }
  }, [username]);

  const fetchMyDesigns = () => {
    if (!username) return;
    axios.post('http://localhost:8081/api/designs/mydesigns', { username })
      .then((res) => setDesigns(res.data))
      .catch((err) => console.error('디자인 불러오기 실패', err));
  };

  const fetchUserFiles = async () => {
    if (!username) return;
    try {
      const response = await fetch(`http://localhost:8081/files/userimg?username=${username}`);
      if (response.ok) {
        const data = await response.json();
        setUserFiles(data);
      }
    } catch (error) {
      console.error('파일 가져오기 에러:', error);
    }
  };

  const getColorName = (colorCode) => colorMap[colorCode] || colorCode;
  const closeModal = () => setIsModalOpen(false);
  const closeDesignModal = () => setIsDesignModalOpen(false);
  const closeOrderModal = () => setIsOrderModalOpen(false);

  const parseColors = (json) => {
    try {
      const parsed = JSON.parse(json);
      return Array.isArray(parsed) && parsed.length > 0 ? getColorName(parsed[0].color) : '색상 없음';
    } catch (e) {
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

  const parseFabric = (json) => {
    try {
      const list = JSON.parse(json);
      return Array.isArray(list) ? list.join(', ') : '';
    } catch (e) {
      return '';
    }
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDesignCardClick = (item) => {
    setSelectedDesignItem(item);
    setIsDesignModalOpen(true);
  };

  const handleOrderCardClick = (item) => {
    setSelectedOrderItem(item);
    setIsOrderModalOpen(true);
  };

  const handleDeleteOrder = (id) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleCategoryChange = async (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);
    if (selected === 'pattern') {
      await fetchUserFiles();
    } else {
      setUserFiles([]);
      fetchMyDesigns();
    }
  };

  const filteredDesigns = designs.filter((item) => item.category === selectedCategory);

  return (
    <div>
      <div className="tabs">
        <button className={`tab-button ${activeTab === 'design' ? 'active' : ''}`} onClick={() => handleTabClick('design')}>디자인</button>
        <button className={`tab-button ${activeTab === 'order' ? 'active' : ''}`} onClick={() => handleTabClick('order')}>의뢰</button>
      </div>

      <div className="tab-content">
        {activeTab === 'design' && (
          <div className="tab">
            <div className="dropdown">
              <select onChange={handleCategoryChange} value={selectedCategory}>
                <option value="template">템플릿 디자인</option>
                <option value="pattern">디자인 파일 업로드</option>
              </select>
            </div>
            <div className="card-container">
              {selectedCategory === 'template' && filteredDesigns.map((item) => {
                  console.log("🎨 designImageBase64:", item.designImageBase64); // ✅ 여기에 추가!

                  return (
                    <div key={item.designId} className="card" onClick={() => handleCardClick(item)}>
                      {item.designImageBase64 ? (
                        <img
                          src={item.designImageBase64}
                          alt={item.designName}
                          className="card-image"
                          style={{ width: "100%", height: "auto" }}
                        />
                      ) : (
                        <div>이미지 없음</div>
                      )}
                      <h3>{item.designName}</h3>
                      <p>{item.clothingType}</p>
                    </div>
                  );
                })}

              {selectedCategory === 'pattern' && (
                userFiles.length > 0 ? (
                  <div className="card-container">
                    {userFiles.map((item) => (
                      <div key={item.fileName} className="card" onClick={() => handleDesignCardClick(item)}>
                        <img src={`http://localhost:8081/image/${item.designId}`} alt={item.fileName} className="card-image" />
                        <p>{item.uploadedAt}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>해당 카테고리에 저장된 파일이 없습니다.</p>
                )
              )}
            </div>
          </div>
        )}

        {activeTab === 'order' && (
          <div className="tab">
            <div className="card-container">
              {orderItems.map((item) => (
                <div key={item.id} className="order-card" onClick={() => handleOrderCardClick(item)}>
                  <span className="delete-btn" onClick={() => handleDeleteOrder(item.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.createdAt}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isModalOpen && selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>{selectedItem.designName}</h2>
            {selectedItem.designImageBase64 ? (
              <img
                src={selectedItem.designImageBase64}
                alt={selectedItem.designName}
                className="card-image"
              />
            ) : (
              <p>이미지 없음</p>
            )}
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

export default MyDesignsRequests;
