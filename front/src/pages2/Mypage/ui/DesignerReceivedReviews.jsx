import { useState, useEffect } from 'react';
import './DesignerReceivedReviews.css';

export default function DesignerReceivedReviews() {
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [tempReviewContext, setTempReviewContext] = useState('');
  const [tempReviewStar, setTempReviewStar] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [comments, setComments] = useState({});
  const [newCommentText, setNewCommentText] = useState({});

  const [editingComment, setEditingComment] = useState({ reviewId: null, commentIndex: null });
  const [tempEditedComment, setTempEditedComment] = useState('');

  useEffect(() => {
    const mockReviews = [
      {
        contractId: 1,
        designerId: "designer001",
        contractTitle: "ㅁㅇㄴㄹ",
        finishDate: "2025.06.01",
        reviewStar: 4,  // 별점 숫자로 변경
        reviewContext: "전체적으로 만족스러운 결과물이 나왔습니다. 소통도 원활했고, 제 요구사항을 잘 반영해주셨어요. 다만 일정이 조금 늦어진 점만 제외하면 완벽했습니다.",
        image: "/image/기본이미지.png",
      },
      {
        contractId: 2,
        designerId: "designer002",
        contractTitle: "하하하하",
        finishDate: "2025.06.02",
        reviewStar: 5,
        reviewContext: "전체적으로 만족스러운 결과물이 나왔습니다. 소통도 원활했고, 제 요구사항을 잘 반영해주셨어요. 다만 일정이 조금 늦어진 점만 제외하면 완벽했습니다.",
        image: "/image/기본이미지.png",
      },
    ];
    setReviews(mockReviews);

    // 초기화 방지용: 기존 comments가 비었을 때만 세팅
    setComments((prev) => {
        if (Object.keys(prev).length === 0) {
        return {
            1: ["첫 댓글입니다!"],
            2: [],
        };
        }
        return prev;
    });
    }, []);

  const startEditing = (review) => {
    setEditingReviewId(review.contractId);
    setTempReviewContext(review.reviewContext || '');
    setTempReviewStar(review.reviewStar || 0);
    setIsModalOpen(true);
  };

  const saveEdit = () => {
    const updatedReviews = reviews.map((r) =>
      r.contractId === editingReviewId
        ? { ...r, reviewContext: tempReviewContext, reviewStar: tempReviewStar }
        : r
    );
    setReviews(updatedReviews);
    setEditingReviewId(null);
    setTempReviewContext('');
    setTempReviewStar(0);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setEditingReviewId(null);
    setTempReviewContext('');
    setTempReviewStar(0);
    setIsModalOpen(false);
  };

  const handleStarClick = (starCount) => {
    setTempReviewStar(starCount);
  };

  const addComment = (reviewId) => {
    if (!newCommentText[reviewId]?.trim()) return;

    setComments((prev) => {
      const updated = { ...prev };
      if (!updated[reviewId]) updated[reviewId] = [];
      updated[reviewId].push(newCommentText[reviewId].trim());
      return updated;
    });
    setNewCommentText((prev) => ({ ...prev, [reviewId]: '' }));
  };

  // 별을 채워진 것과 빈 별로 분리 렌더링 함수
  const renderStars = (starCount) => {
    return (
      <>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              color: star <= starCount ? '#FFD700' : '#D3D3D3',
              fontSize: 20,
              marginRight: 2,
              userSelect: 'none',
            }}
          >
            ★
          </span>
        ))}
      </>
    );
  };

    // 점3개 눌렀을 때 메뉴 토글
    const toggleCommentMenu = (reviewId, idx) => {
    if (
        editingComment.reviewId === reviewId &&
        editingComment.commentIndex === `menu-${idx}`
    ) {
        setEditingComment({ reviewId: null, commentIndex: null });
    } else {
        setEditingComment({ reviewId, commentIndex: `menu-${idx}` });
    }
    };

    // 수정 시작
    const startEditComment = (reviewId, idx, originalComment) => {
    setEditingComment({ reviewId, commentIndex: idx });
    setTempEditedComment(originalComment);
    };

    // 수정 취소
    const cancelEditComment = () => {
    setEditingComment({ reviewId: null, commentIndex: null });
    setTempEditedComment('');
    };

    // 수정 저장
    const saveEditedComment = (reviewId, idx) => {
    setComments((prev) => {
        const updated = { ...prev };
        updated[reviewId][idx] = tempEditedComment;
        return updated;
    });
    cancelEditComment();
    };

    // 삭제
    const deleteComment = (reviewId, idx) => {
    setComments((prev) => {
        const updated = { ...prev };
        updated[reviewId].splice(idx, 1);
        return updated;
    });
    cancelEditComment();
    };

  return (
    <div className="writtenreviewcontent-container">
      <h1 className="writtenreviewcontent-title">내가 받은 후기 ({reviews.length}개)</h1>

      {reviews.length === 0 && <p>받은 후기가 없습니다.</p>}

      <div className="writtenreviewcontent-itemcontainer">
        {reviews.map((review) => (
          <div key={review.contractId} className="writtenreviewcontent-item">
            <div className="writtenreviewcontent-topside">
              <img
                src={review.image}
                alt="Designer"
                style={{ width: 80, height: 80, objectFit: "contain", borderRadius: 8 }}
              />
              <div>
                <div style={{ color: "gray" }}>{review.designerId}</div>
                <div style={{ fontWeight: "bold", fontSize: 20 }}>{review.contractTitle}</div>
                <div style={{ color: "gray" }}>{review.finishDate}</div>
              </div>
            </div>

            {/* 별과 리뷰 내용 왼쪽에 이미지 추가, flexbox 사용 */}
            <div className="writtenreviewcontent-bottomside" style={{ display: 'flex', gap: 15, marginTop: 15 }}>
              <img
                src={review.image}
                alt="Design"
                style={{ width: 60, height: 60, objectFit: 'contain', borderRadius: 8, alignSelf: 'flex-start' }}
              />
              <div>
                <div>{renderStars(review.reviewStar)}</div>
                <p style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>
                  {review.reviewContext || "리뷰 내용이 없습니다."}
                </p>
              </div>
            </div>

            {/* 댓글 영역 */}
            <div style={{ marginTop: 20, borderTop: "1px solid #eee", paddingTop: 10 }}>
              <h4>댓글</h4>
              {comments[review.contractId]?.length ? (
                <ul style={{ paddingLeft: 20 }}>
                    {comments[review.contractId].map((comment, idx) => (
                        <li key={idx} style={{ marginBottom: 5, position: 'relative' }}>
                        {editingComment.reviewId === review.contractId && editingComment.commentIndex === idx ? (
                            <>
                            <input
                                value={tempEditedComment}
                                onChange={(e) => setTempEditedComment(e.target.value)}
                                style={{ padding: 5, width: '80%' }}
                            />
                            <button onClick={() => saveEditedComment(review.contractId, idx)}>저장</button>
                            <button onClick={() => cancelEditComment()}>취소</button>
                            </>
                        ) : (
                            <>
                            <strong>{review.designerId}:</strong> {comment}
                            <div
                                style={{ position: 'absolute', right: 0, top: 0, cursor: 'pointer' }}
                                onClick={() => toggleCommentMenu(review.contractId, idx)}
                            >
                                ⋯
                            </div>
                            {editingComment.reviewId === review.contractId && editingComment.commentIndex === `menu-${idx}` && (
                                <div style={{ position: 'absolute', right: 20, top: 20, background: '#fff', border: '1px solid #ccc', zIndex: 1 }}>
                                <div
                                    style={{ padding: '5px 10px', cursor: 'pointer' }}
                                    onClick={() => startEditComment(review.contractId, idx, comment)}
                                >
                                    수정
                                </div>
                                <div
                                    style={{ padding: '5px 10px', cursor: 'pointer' }}
                                    onClick={() => deleteComment(review.contractId, idx)}
                                >
                                    삭제
                                </div>
                                </div>
                            )}
                            </>
                        )}
                        </li>
                    ))}
                    </ul>
              ) : (
                <p>댓글이 없습니다.</p>
              )}

              <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                <input
                  type="text"
                  placeholder="댓글을 입력하세요"
                  value={newCommentText[review.contractId] || ""}
                  onChange={(e) =>
                    setNewCommentText((prev) => ({ ...prev, [review.contractId]: e.target.value }))
                  }
                  style={{ flexGrow: 1, padding: 8, borderRadius: 5, border: "1px solid #ccc" }}
                />
                <button onClick={() => addComment(review.contractId)}>댓글 달기</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingReviewId && (
        <div className="review-modal">
          <div className="modal-content">
            <h2>후기 편집</h2>
            <div style={{ display: "flex", gap: 15, marginBottom: 15 }}>
              <img
                src={reviews.find(r => r.contractId === editingReviewId)?.image}
                alt="Designer"
                style={{ width: 120, height: 120, objectFit: "contain", borderRadius: "50%" }}
                />
              <div>
                <div style={{ color: "gray" }}>{reviews.find(r => r.contractId === editingReviewId)?.designerId}</div>
                <div style={{ fontWeight: "bold", fontSize: 20 }}>
                  {reviews.find(r => r.contractId === editingReviewId)?.contractTitle}
                </div>
              </div>
            </div>

            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleStarClick(star)}
                  style={{
                    cursor: "pointer",
                    fontSize: 25,
                    color: star <= tempReviewStar ? "#FFD700" : "#D3D3D3",
                    userSelect: "none",
                  }}
                >
                  ☆
                </span>
              ))}
            </div>

            <textarea
              value={tempReviewContext}
              onChange={(e) => setTempReviewContext(e.target.value)}
              rows={5}
              placeholder="리뷰 내용을 입력하세요"
            />

            <div className="modalbutton-container">
              <button onClick={saveEdit}>저장</button>
              <button onClick={closeModal}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
