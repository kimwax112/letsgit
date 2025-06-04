import React, { useState } from 'react';
import DeliveryCard from './DeliveryCard';

const DeliveryPage = () => {
  // 전체 더미 데이터
  const allDeliveries = [
    {
      date: '2025-06-04',
      status: '작업진행중',
      imageUrl: '/image/brandDesign/브랜드디자인1.jpg',
      customerName: '홍길동',
      orderTitle: '탑꾸 3종세트',
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
      orderTitle: '포카 커스텀',
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

  const [visibleCount, setVisibleCount] = useState(3); // 처음에 보여줄 개수

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 2); // 2개씩 더 보여주기
  };

  return (
    <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '30px', fontWeight: '700', marginBottom: '32px', color: '#799fc4' }}>배송 내역</h1>

      {allDeliveries.slice(0, visibleCount).map((d, idx) => (
        <DeliveryCard key={idx} {...d} />
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
    </div>
  );
};

export default DeliveryPage;
