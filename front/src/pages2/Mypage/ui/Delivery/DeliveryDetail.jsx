import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeliveryPage from '../../DeliveryPage';

const DeliveryDetail = ({ data }) => {
  const { contractId } = useParams();
  const navigate = useNavigate();

  const delivery = data.find(item => item.contractId === contractId);
  if (!delivery) return <div>존재하지 않는 배송 정보입니다.</div>;

  return (
    <DeliveryPage>
        <div className="detail-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#799fc4', marginBottom: '24px' }}>배송 상세</h1>

        {/* 받는 사람 정보 */}
        <div className="card" style={{ border: '1px solid #ccc', borderRadius: '12px', padding: '20px', marginBottom: '20px', position: 'relative' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>받는 사람 정보</h2>
            <p>받는 사람: {delivery.customerName}</p>
            <p>연락처: 010-1234-5678</p>
            <p>받는 주소: 서울특별시 무슨구 무슨동 123-45</p>
            <button onClick={() => alert('대화방으로 이동')} style={{ position: 'absolute', right: '20px', top: '20px', background: '#799fc4', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px' }}>
            대화방
            </button>
        </div>

        {/* 결제 정보 */}
        <div className="card" style={{ border: '1px solid #ccc', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>결제 정보</h2>
            <div style={{ display: 'flex', gap: '20px' }}>
            {/* 왼쪽 카드 */}
            <div style={{ flex: 1, border: '1px solid #eee', padding: '16px', borderRadius: '8px' }}>
                <p>카드: 국민카드 / 일시불</p>
                <p>포인트 사용: 2,000P</p>
                <p>총 결제 금액: {delivery.price}</p>
            </div>
            {/* 오른쪽 카드 */}
            <div style={{ flex: 1, border: '1px solid #eee', padding: '16px', borderRadius: '8px' }}>
                <p>총 상품 가격: {delivery.price}</p>
                <p>배송비: 3,000원</p>
            </div>
            </div>
        </div>

        {/* 배송 정보 */}
        <div className="card" style={{ border: '1px solid #ccc', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>배송 정보</h2>
            <p>택배사: CJ대한통운</p>
            <p>운송장 번호: 1234567890</p>
            <p>받는 주소: 서울특별시 무슨구 무슨동 123-45</p>
            <p>배송 요청사항: 문 앞에 두고 벨 눌러주세요.</p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button onClick={() => navigate(-1)} style={{ backgroundColor: '#799fc4', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none' }}>배송조회로 돌아가기</button>
            <button onClick={() => alert('배송내역 삭제')} style={{ backgroundColor: '#ccc', color: 'black', padding: '8px 16px', borderRadius: '6px', border: 'none' }}>배송내역 삭제</button>
            </div>
        </div>

        {/* 안내사항 */}
        <div className="notice" style={{ fontSize: '14px', color: '#555' }}>
            ※ 배송상세 페이지는 결제 내역과 수령 정보를 기반으로 작성되었습니다. 문의사항은 대화방을 통해 전달해 주세요.
        </div>
        </div>
    </DeliveryPage>
  );
};

export default DeliveryDetail;
