import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './MyDesignsRequests.css';

const MyDesignsRequests = () => {
  const [activeTab, setActiveTab] = useState('design');
  const [selectedCategory, setSelectedCategory] = useState('template');
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [selectedDesignItem, setSelectedDesignItem] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      client: "홍길동",
      title: "청바지 전문 디자이너 구해요",
      category: "바지 > 청바지",
      style: "캐쥬얼",
      price: "10만원 이하",
      deadline: "디자이너와 협의 후 결정",
      createdAt: "2025/01/01",
      description: "상세설명 예시글상세설명 예시글상세설명 예시글상세설명 예시글상세설명 예시글상세설명 예시글상세설명"
    },
    {
      id: 2,
      client: "김민지",
      title: "포스터 디자인 의뢰합니다",
      category: "그래픽 > 포스터",
      style: "모던, 깔끔한 느낌",
      price: "15만원 내외",
      deadline: "2025/04/30까지",
      createdAt: "2025/03/25",
      description: "행사용 포스터 디자인 부탁드립니다. 배경은 어두운 톤, 텍스트 강조해주세요."
    },
    {
      id: 3,
      client: "이준호",
      title: "로고 제작 요청",
      category: "브랜딩 > 로고",
      style: "심플, 미니멀",
      price: "20만원 이하",
      deadline: "디자이너와 조율",
      createdAt: "2025/02/15",
      description: "스타트업 브랜드 로고가 필요합니다. 심볼 중심으로 제작되면 좋겠습니다."
    },
    {
      id: 4,
      client: "박서연",
      title: "앱 UI 디자인 부탁드려요",
      category: "UX/UI > 앱 디자인",
      style: "귀엽고 직관적인 디자인",
      price: "30만원 이상",
      deadline: "2025/05/10까지",
      createdAt: "2025/03/05",
      description: "건강 관리 앱 메인 화면 위주로 디자인 필요합니다. 컬러 가이드는 전달드릴게요."
    },
    {
      id: 5,
      client: "정하늘",
      title: "패키지 디자인 의뢰합니다",
      category: "제품 디자인 > 패키지",
      style: "빈티지 스타일",
      price: "25만원",
      deadline: "2025/06/01까지",
      createdAt: "2025/04/01",
      description: "수제 쿠키 브랜드의 패키지 디자인이 필요합니다. 예쁜 타이포와 따뜻한 색감 부탁드려요."
    },
    {
      id: 6,
      client: "최유진",
      title: "유튜브 썸네일 디자이너 구해요",
      category: "디지털 > 썸네일",
      style: "눈에 띄는 스타일",
      price: "1건당 5천원",
      deadline: "상시",
      createdAt: "2025/04/05",
      description: "채널 썸네일 제작하실 분 구해요. 텍스트 강조, 컬러풀하게 해주시면 좋겠어요!"
    }
  ]);


  const designItems = {
    template: [
      {
        id: 1,
        name: '맨투맨1',
        description: '맨투맨1 설명',
        image: '/images/맨투맨1.jpg',
        date: '2025-04-01',
        size: 'L',
        designName: '캐주얼 맨투맨',
        fabric: '면 100%',
        color: '회색',
        clothingType: '맨투맨'
      },
      {
        id: 2,
        name: '맨투맨2',
        description: '맨투맨2 설명',
        image: '/images/맨투맨2.jpg',
        date: '2025-04-02',
        size: 'M',
        designName: '심플 맨투맨',
        fabric: '면 80%, 폴리 20%',
        color: '블랙',
        clothingType: '맨투맨'
      },
      {
        id: 3,
        name: '맨투맨3',
        description: '맨투맨3 설명',
        image: '/images/맨투맨3.jpg',
        date: '2025-04-03',
        size: 'XL',
        designName: '루즈핏 맨투맨',
        fabric: '면 60%, 폴리 40%',
        color: '아이보리',
        clothingType: '맨투맨'
      },
    ],
    pattern: [
      {
        id: 1,
        name: '자켓',
        description: '자켓 설명',
        image: '/images/자켓.jpg',
        date: '2025-03-20',
        size: 'M',
        designName: '클래식 자켓',
        fabric: '울 50%, 폴리 50%',
        color: '네이비',
        clothingType: '자켓'
      },
      {
        id: 2,
        name: '치마1',
        description: '치마1 설명',
        image: '/images/치마1.jpg',
        date: '2025-03-22',
        size: 'S',
        designName: '플레어 스커트',
        fabric: '면 100%',
        color: '연핑크',
        clothingType: '스커트'
      },
      {
        id: 3,
        name: '치마2',
        description: '치마2 설명',
        image: '/images/치마2.jpg',
        date: '2025-03-25',
        size: 'M',
        designName: '에이라인 스커트',
        fabric: '린넨 100%',
        color: '아이보리',
        clothingType: '스커트'
      },
    ],
    brand: [
      {
        id: 1,
        name: '바지',
        description: '바지 설명',
        image: '/images/바지.jpg',
        date: '2025-03-28',
        size: 'L',
        designName: '슬랙스 팬츠',
        fabric: '폴리 100%',
        color: '차콜그레이',
        clothingType: '바지'
      },
      {
        id: 2,
        name: '원피스1',
        description: '원피스1 설명',
        image: '/images/원피스1.jpg',
        date: '2025-03-30',
        size: 'M',
        designName: '플라워 원피스',
        fabric: '쉬폰',
        color: '화이트',
        clothingType: '원피스'
      },
      {
        id: 3,
        name: '원피스2',
        description: '원피스2 설명',
        image: '/images/원피스2.jpg',
        date: '2025-04-01',
        size: 'S',
        designName: '레이스 원피스',
        fabric: '면 70%, 폴리 30%',
        color: '베이지',
        clothingType: '원피스'
      },
    ],
  };

  const handleTabClick = (tab) => setActiveTab(tab);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  
  // Handling design card click
  const handleDesignCardClick = (item) => {
    setSelectedDesignItem(item);
    setIsDesignModalOpen(true);
  };

  // Handling order card click
  const handleOrderCardClick = (item) => {
    setSelectedOrderItem(item);
    setIsOrderModalOpen(true);
  };

  const closeDesignModal = () => setIsDesignModalOpen(false);
  const closeOrderModal = () => setIsOrderModalOpen(false);

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
                <div key={item.id} className="card" onClick={() => handleDesignCardClick(item)}>
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

      {/* Design Modal */}
      {isDesignModalOpen && selectedDesignItem && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeDesignModal}>&times;</span>
            <h2>{selectedDesignItem.name}</h2>
            <p className="modal-date">{selectedDesignItem.date}</p>
            <img src={selectedDesignItem.image} alt={selectedDesignItem.name} className="modal-image" />
            <div className="modal-details">
              <p><strong>사이즈:</strong> {selectedDesignItem.size}</p>
              <p><strong>디자인 이름:</strong> {selectedDesignItem.designName}</p>
              <p><strong>원단:</strong> {selectedDesignItem.fabric}</p>
              <p><strong>색상:</strong> {selectedDesignItem.color}</p>
              <p><strong>의류 종류:</strong> {selectedDesignItem.clothingType}</p>
            </div>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {isOrderModalOpen && selectedOrderItem && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeOrderModal}>&times;</span>
            <h2>{selectedOrderItem.title}</h2>
            <p><strong>고객:</strong> {selectedOrderItem.client}</p>
            <p><strong>카테고리:</strong> {selectedOrderItem.category}</p>
            <p><strong>스타일:</strong> {selectedOrderItem.style}</p>
            <p><strong>가격:</strong> {selectedOrderItem.price}</p>
            <p><strong>마감일:</strong> {selectedOrderItem.deadline}</p>
            <p><strong>설명:</strong> {selectedOrderItem.description}</p>
            <p><strong>작성일:</strong> {selectedOrderItem.createdAt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDesignsRequests;
