// DeliveryCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryCard.css';

const DeliveryCard = ({
  date,
  status,
  imageUrl,
  customerName,
  orderTitle,
  price,
  deadline,
  contractId,
  isShipped,
}) => {
  const navigate = useNavigate();

  return (
    <div className="delivery-card">
      <div className="delivery-date">{date}</div>  {/* 날짜 불러오기->Delivery.jsx에서 */}

      <div className="delivery-body">
        {/* 왼쪽 */}
        <div className="left-section">
          <div className="status">{status}</div>  {/* 배송상태 불러오기->Delivery.jsx에서 */}
          <div className="info-container">
            <img src={imageUrl} alt="디자인 미리보기" className="preview-image" />
            <div className="info-text">
              <p className="customer-name">주문자명: {customerName}</p>
              <p className="order-title">주문상품명: {orderTitle}</p>
              <p>총 주문 금액: {price} </p>
              <p>희망 기한: {deadline}</p>
            </div>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="right-section">
          <button className="action-btn" nClick={() => navigate(`/designer/delivery/${contractId}`)}>
            배송상세보기
          </button>
          <button
            className="action-btn"
            onClick={() =>
              navigate(isShipped ? `/designer/delivery/${contractId}` : `/delivery/register/${contractId}`)
            }
          >
            {isShipped ? '배송조회' : '배송등록'}
          </button>
          <button className="action-btn">대화하기</button>
          <button className="action-btn report-btn">신고하기</button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCard;
