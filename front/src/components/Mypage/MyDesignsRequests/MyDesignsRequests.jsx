import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './MyDesignsRequests.css';
import axios from 'axios';

const MyDesignsRequests = () => {

  const [activeTab, setActiveTab] = useState('design');
  const [selectedCategory, setSelectedCategory] = useState('template');
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [selectedDesignItem, setSelectedDesignItem] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기/닫기 상태
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 카드 항목
  // 로그인한 사용자 정보 (예: 세션에서 가져온 username)
  const [username, setUsername] = useState(null);  // 로그인한 사용자 정보
  const [designs, setDesigns] = useState([]);//셀렉티드디자인아이템템

  const [userFiles, setUserFiles] = useState([]);  // 사용자 이미지 파일 상태
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
      },,
      {
        id: 7,
        name: '스커트',
        description: '가벼운 느낌의 롱 스커트',
        image: '/images/스커트.jpg',
        date: '2025-03-18',
        size: 'L',
        designName: '플레어 롱 스커트',
        fabric: '폴리에스터 80%, 스판덱스 20%',
        color: '블랙',
        clothingType: '스커트'
      },
      {
        id: 8,
        name: '니트',
        description: '부드럽고 따뜻한 니트',
        image: '/images/니트.jpg',
        date: '2025-02-22',
        size: 'M',
        designName: '터틀넥 니트',
        fabric: '울 60%, 나일론 40%',
        color: '그레이',
        clothingType: '니트'
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
      {
        id: 9,
        name: '재킷',
        description: '봄에 입기 좋은 재킷',
        image: '/images/재킷.jpg',
        date: '2025-04-05',
        size: 'S',
        designName: '카멜 재킷',
        fabric: '폴리에스터 100%',
        color: '카멜',
        clothingType: '자켓'
      },
      {
        id: 10,
        name: '블라우스',
        description: '여성스러운 디자인의 블라우스',
        image: '/images/블라우스.jpg',
        date: '2025-03-12',
        size: 'M',
        designName: '레이스 블라우스',
        fabric: '면 100%',
        color: '화이트',
        clothingType: '블라우스'
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
      {
        id: 4,
        name: '청바지',
        description: '편안한 착용감의 청바지',
        image: '/images/청바지.jpg',
        date: '2025-03-20',
        size: 'M',
        designName: '슬림핏 청바지',
        fabric: '면 100%',
        color: '진청',
        clothingType: '바지'
      },
      {
        id: 5,
        name: '레더 재킷',
        description: '스타일리시한 레더 재킷',
        image: '/images/레더재킷.jpg',
        date: '2025-02-15',
        size: 'L',
        designName: '모던 레더 재킷',
        fabric: '소가죽 100%',
        color: '검정',
        clothingType: '자켓'
      },
      {
        id: 6,
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
  const colorMap = {
    "#ff0000": "빨강",
    "#00ff00": "초록",
    "#0000ff": "파랑",
    "#ff9900": "주황",
    "#0099ff": "하늘",
  };
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/current-user', {
          method: 'GET',
          credentials: 'include',  // 쿠키를 포함시켜 세션을 전달
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.username);
          setUsername(data.username);  // 로그인한 사용자 이름을 상태에 저장
        } else {
          console.error('로그인된 사용자가 없습니다.');
        }
      } catch (error) {
        console.error('사용자 정보 가져오기 실패:', error);
      }
    };
    

    fetchUsername();
  }, []);
  const getColorName = (colorCode) => {
    return colorMap[colorCode] || colorCode; // 색상 코드가 없으면 코드 자체를 반환
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
    /////////////////////////////
  const handleTabClick = (tab) => setActiveTab(tab);
  //const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleCategoryChange = async (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);
  
    if (selected === 'pattern') {
      await fetchUserFiles(); // 'pattern' 선택 시 파일 가져오기
    } else if (selected === 'template') {
      setUserFiles([]); // ✅ 패턴 파일 초기화
      fetchMyDesigns(); // 'template' 선택 시 디자인 가져오기
    } else {
      setUserFiles([]); // 둘 다 아니면 비우기
    }
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
  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  const closeDesignModal = () => setIsDesignModalOpen(false);
  const closeOrderModal = () => setIsOrderModalOpen(false);

  const handleDeleteOrder = (id) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };
  const fetchUserFiles = async () => {
    if (!username) {
      console.error('사용자 정보가 없습니다.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/files/userimg?username=${username}`);
      
      if (response.ok) {
        const data = await response.json();
        setUserFiles(data);
      } else {
        console.error('파일 가져오기 실패');
      }
    } catch (error) {
      console.error('파일 가져오기 에러:', error);
    }
  };
  
  /*const fetchMyDesigns = () => {
    const id = "test33"; // ✅ localStorage에서 ID 가져오기 하드코딩고쳐
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
  };*/
    const fetchMyDesigns = () => {
    const userId = localStorage.getItem("username");
    console.log("📦 현재 localStorage ID:", userId);
  
    if (!username) return;
  
    axios.post('http://localhost:8081/api/designs/mydesigns', { username })
      .then((res) => {
        console.log('🎯 받은 디자인 데이터:', res.data);
        setDesigns(res.data);
      })
      .catch((err) => {
        console.error('❌ 디자인 불러오기 실패', err);
      });
  };
  useEffect(() => {
    fetchMyDesigns();
  }, []);
  
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
            
            {selectedCategory === 'template' && (
  filteredDesigns.length === 0 ? (
    <p>해당 카테고리에 저장된 디자인이 없습니다.</p>
  ) : (
    <div className="card-container">
      {filteredDesigns.map((item) => (
        <div key={item.designId} className="card" onClick={() => handleCardClick(item)}>
          {/*<img src={item.imageUrl} alt={item.designName} className="card-image" />*/}
          <h3>{item.designName}</h3>
          <p>{item.clothingType}</p>
        </div>
      ))}
    </div>
  )
)}

{selectedCategory === 'pattern' && (
  userFiles.length > 0 ? (
    <div className="card-container">
      {userFiles.map((item) => (
        <div key={item.fileName} className="card" onClick={() => handleDesignCardClick(item)}>
          <img src={`http://localhost:8081/files/view/${item.fileName}`} alt={item.fileName} className="card-image" />
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
