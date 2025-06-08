<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import DeliveryCard from './DeliveryCard';
import DeliveryDetail from './DeliveryDetail';
import DeliveryTracking from './DeliveryTracking';

const DeliveryPage = () => {
  // 전체 더미 데이터
  const allDeliveries = [
    {
      date: '2025-06-04',
      status: '작업진행중',
      imageUrl: '/image/brandDesign/브랜드디자인1.jpg',
      customerName: '홍길동',
      orderTitle: '원피스 3종',
      price: '16,000원',
      deadline: '6월 10일',
      contractId: 'abc123',
      isShipped: false,
    },
    {
      date: '2025-06-01',
      status: '배송중',
      imageUrl: '/image/brandDesign/브랜드디자인3.jpg',
      customerName: '김민지',
      orderTitle: '봄 느낌 원피스',
      price: '14,000원',
      deadline: '6월 8일',
      contractId: 'xyz789',
      isShipped: true,
    },
    {
      date: '2025-05-30',
      status: '배송완료',
      imageUrl: '/image/brandDesign/브랜드디자인2.jpg',
      customerName: '박서연',
      orderTitle: '리뉴얼 디자인',
      price: '20,000원',
      deadline: '6월 5일',
      contractId: 'def456',
      isShipped: true,
    },
    {
      date: '2025-05-28',
      status: '작업대기중',
      imageUrl: '/image/brandDesign/브랜드디자인2.jpg',
      customerName: '이수진',
      orderTitle: 'SNS 배너 제작',
      price: '12,000원',
      deadline: '6월 9일',
      contractId: 'ghi321',
      isShipped: false,
    },
    {
      date: '2025-05-25',
      status: '배송중',
      imageUrl: '/image/brandDesign/브랜드디자인3.jpg',
      customerName: '최민호',
      orderTitle: '팝업 디자인',
      price: '18,000원',
      deadline: '6월 7일',
      contractId: 'jkl654',
      isShipped: true,
    },
  ];

  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedDelivery, setSelectedDelivery] = useState(null); // 상세보기용
  const [deliveries, setDeliveries] = useState([]);  // 배열 상태와 setter 생성

  // 삭제 함수
  const handleDelete = (contractId) => {
    if (window.confirm('배송내역을 삭제하시겠습니까?')) {
      setDeliveries(prev => prev.filter(item => item.contractId !== contractId));
    }
  };

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 2);
  };

  // 상세보기 눌렀을 때
  const handleViewDetail = (delivery) => {
    setSelectedDelivery(delivery);
  };

  // 뒤로 가기
  const handleBack = () => {
    setSelectedDelivery(null);
  };

  return (
    <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      {selectedDelivery ? (
        <DeliveryTracking delivery={selectedDelivery} onBack={handleBack} />
      ) : (
        <>
          <h1 style={{ fontSize: '30px', fontWeight: '700', marginBottom: '32px', color: '#799fc4' }}>배송 내역</h1>

          {allDeliveries.slice(0, visibleCount).map((d, idx) => (
            <DeliveryCard 
              key={idx} 
              {...d} 
              delivery={d}
              onDelete={() => handleDelete(d.contractId)} // 여기 d로 바꿈
            />
          ))}

          {visibleCount < allDeliveries.length && (
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button
                onClick={handleShowMore}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#799fc4',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                더보기
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DeliveryPage;
=======
// import React from "react";
// import styled from "styled-components";
// import Sidebar from "../Sidebar"; 
// // import { NextButtonUI } from "../../components";
// //import Delivery from "./ui/Delivery/DeliveryPage"

// // 전체 레이아웃
// const Layout = styled.div`
//   display: flex;
//   min-height: 100vh; /* 전체 화면 높이 활용 */
// `;

// // 사이드바 영역 (고정 너비)
// const Left = styled.div`
//   width: 400px; /* 고정 너비 */
//   background-color: #f4f4f4; /* 예시 배경색 */
//   transition: width 0.3s ease-in-out; /* 부드러운 전환 */
  
// `;

// // 콘텐츠 영역 (남은 공간 채움)
// const Right = styled.div`
//   flex: 1;
//   background-color: #fff;
//   padding: 1.5rem; /* 24px */
//   margin: 2rem;
//   box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
//   border-radius: 1.25rem; /* 20px */
//   font-family: 'Noto Sans KR', sans-serif;
// `;

// export default function DeliveryPage() {

//   return (
//     <Layout>
//       <Left>
//         <Sidebar/>
//       </Left>
//       <Right>
//         <Delivery/>
//       </Right>
//     </Layout>
//   );
// }
>>>>>>> feature/sj
