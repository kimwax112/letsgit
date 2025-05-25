import { useState, useEffect } from 'react';
import "./WrittenReviewContent.css"
export default function WrittenReviewContent() {
  const [contracts, setContracts] = useState([]);
  const [editingContractId, setEditingContractId] = useState(null); // 편집 중인 계약 ID
  const [tempReviewContext, setTempReviewContext] = useState(''); // 임시 리뷰 내용
  const [tempReviewStar, setTempReviewStar] = useState(0); // 임시 별점 (1~5)

  // 테스트 데이터 하드코딩
  useEffect(() => {
    const mockContracts = [
      {
        contractId: 1,
        requestId: "2",
        designerId: "designer001",
        duedate: formatDate("2025-05-24"),
        requestFee: "10000",
        status: "완료",
        clientId: "가나다",
        contractTitle: "ㅁㅇㄴㄹ",
        isStarred: "null",
        finishDate: "2025-06-01",
        reviewStar: "☆☆☆☆☆",
        reviewContext: "리뷰 내용 1",
      },
      {
        contractId: 2,
        requestId: "3",
        designerId: "designer002",
        duedate: formatDate("2025-05-30"),
        requestFee: "10000",
        status: "완료",
        clientId: "asdfd",
        contractTitle: "하하하하",
        isStarred: "null",
        finishDate: "2025-06-02",
        reviewStar: "☆☆☆☆☆",
        reviewContext: "리뷰 내용 2",
      },
      {
        contractId: 3,
        requestId: "4",
        designerId: "designer003",
        duedate: formatDate("2025-05-01"),
        requestFee: "10000",
        status: "완료",
        clientId: "가나다라마바사",
        contractTitle: "ㅁㅇㄴㄹ",
        isStarred: "null",
        finishDate: "2025-06-03",
        reviewStar: "☆☆☆☆☆",
        reviewContext: "리뷰 내용 3",
      },
      {
        contractId: 4,
        requestId: "5",
        designerId: "designer005",
        duedate: formatDate("2025-05-02"),
        requestFee: "10000",
        status: "완료",
        clientId: "가나다",
        contractTitle: "완료된 계약만",
        isStarred: "true",
        finishDate: "2025-06-20",
        reviewStar: "☆☆☆☆☆",
        image: "asdfasd",
        reviewContext: "리뷰내용",
      },
    ];

    setContracts(mockContracts);
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${year}.${month}.${day}`;
  };

  // 편집 시작
  const startEditing = (contract) => {
    setEditingContractId(contract.contractId);
    setTempReviewContext(contract.reviewContext || '');
    // reviewStar 문자열을 별 개수로 변환 (예: "⭐️⭐️⭐️" → 3)
    setTempReviewStar(contract.reviewStar ? contract.reviewStar.match(/☆/g)?.length || 0 : 0);
  };

  // 편집 저장
  const saveEdit = (contractId) => {
    const updatedContracts = contracts.map((contract) =>
      contract.contractId === contractId
        ? {
            ...contract,
            reviewContext: tempReviewContext,
            reviewStar: "☆".repeat(tempReviewStar), // 별 개수를 문자열로 변환
          }
        : contract
    );
    setContracts(updatedContracts);
    setEditingContractId(null); // 편집 모드 비활성화
    setTempReviewContext('');
    setTempReviewStar(0);
  };

  // 별 클릭 핸들러
  const handleStarClick = (starCount) => {
    setTempReviewStar(starCount);
  };

  // 완료된 계약만 필터링
  const completedContracts = contracts.filter((contract) => contract.status === "완료");

  return (
    <div className="writtenreviewcontent-container">
      <div className="writtenreviewcontent-title">작성한 후기</div>
      <div className="writtenreviewcontent-itemcontainer">
        {completedContracts.length > 0 ? (
          completedContracts.map((contract) => (
            <div key={contract.contractId} className="writtenreviewcontent-item">
              <div className="writtenreviewcontent-topside">
                <div>{contract.designerId}</div>
                <div>{contract.contractTitle}</div>
                <div>{contract.requestFee} {contract.duedate}</div> 
              </div>
              <div className="writtenreviewcontent-bottomside">
                {editingContractId === contract.contractId ? (
                  // 편집 모드
                  <div className="edit-mode">
                    <textarea
                      value={tempReviewContext}
                      onChange={(e) => setTempReviewContext(e.target.value)}
                      placeholder="리뷰 내용을 입력하세요"
                      rows={3}
                      style={{ width: '100%', marginBottom: '10px' }}
                    />
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => handleStarClick(star)}
                          style={{
                            cursor: 'pointer',
                            fontSize: '20px',
                            color: star <= tempReviewStar ? '#FFD700' : '#D3D3D3', // 노란색/회색
                          }}
                        >
                         ☆
                        </span>
                      ))}
                    </div>
                    <button onClick={() => saveEdit(contract.contractId)}>확인</button>
                    <button onClick={() => setEditingContractId(null)} style={{ marginLeft: '5px' }}>
                      취소
                    </button>
                  </div>
                ) : (
                  // 일반 모드
                  <>
                  <div className="reviewcontract-container">
                    
                   <div>{contract.finishDate || '미정'}</div> 
                  <div>{contract.reviewStar || '별점 없음'}</div>
                   <div>{contract.reviewContext || '리뷰 없음'}</div>
                   </div>
                    <button onClick={() => startEditing(contract)} style={{ marginLeft: '10px' }}>
                      편집
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>완료된 계약이 없습니다.</p>
        )}
      </div>
    </div>
  );
}