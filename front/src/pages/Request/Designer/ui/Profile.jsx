import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cart2 from "../../../../assets/cart2.png";
import chat from "../../../../assets/대화.png";
import request from "../../../../assets/의뢰.png";
import jeans from "../../../../assets/jeans.png";
import port from "../../../../assets/Portfoilo.png";
import designer from "../../../../assets/desiner.png";
import { Modal } from "../../../../utils";
import { useNavigate } from "react-router-dom";
import RequestPopup from "../../Request/ui/RequestPopup";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import Room from "../../../ChatMain/ui/Room"; // Room.jsx 임포트

// 이미지 배열
const profileImages = [
  jeans,
  require("../../../../assets/프로필이미지/프로필이미지1.jpg"),
  require("../../../../assets/프로필이미지/프로필이미지2.jpg"),
  require("../../../../assets/프로필이미지/프로필이미지3.jpg"),
  require("../../../../assets/프로필이미지/프로필이미지4.jpg"),
  require("../../../../assets/프로필이미지/프로필이미지5.jpg"),
  require("../../../../assets/프로필이미지/프로필이미지6.jpg"),
];

const designerImages = [
  designer,
  require("../../../../assets/디자이너이미지/디자이너1.png"),
  require("../../../../assets/디자이너이미지/디자이너2.png"),
  require("../../../../assets/디자이너이미지/디자이너3.png"),
  require("../../../../assets/디자이너이미지/디자이너4.png"),
  require("../../../../assets/디자이너이미지/디자이너5.png"),
  require("../../../../assets/디자이너이미지/디자이너6.png"),
];

const portfolioImages = [
  port,
  require("../../../../assets/포트폴리오이미지/포트폴리오1.png"),
  require("../../../../assets/포트폴리오이미지/포트폴리오2.png"),
  require("../../../../assets/포트폴리오이미지/포트폴리오3.png"),
  require("../../../../assets/포트폴리오이미지/포트폴리오4.png"),
  require("../../../../assets/포트폴리오이미지/포트폴리오5.png"),
  require("../../../../assets/포트폴리오이미지/포트폴리오6.png"),
];

// Styled Components (원본과 동일, 생략된 부분은 그대로 유지)
const PortfoilModalContainer = styled(Modal)`
  display: flex;
  flex-direction: row;
  height: 800px;
`;

const ModalContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 2px solid #799fc4;
  border-radius: 15px;
  margin: 20px;
  padding: 20px;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
`;

const ModalContent3 = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 2px solid #799fc4;
  border-radius: 15px;
  margin: 20px;
  padding: 20px;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  min-height: 0;
  max-height: 70vh;
  overflow-y: auto;
`;

const DesignerImage = styled.img`
  margin: 0 auto;
  width: 100%;
  max-width: 150px;
  height: auto;
  object-fit: contain;
  margin-top: 10px;
  background-color: black;
`;

const ImageCarouselContainer = styled.div`
  position: relative;
  width: 500px;
  height: 535px;
  margin: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  border: 2px solid #799fc4;
  border-radius: 15px;
  overflow: hidden;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  z-index: 2;
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const PrevButton = styled(NavButton)`
  left: 8px;
`;

const NextButton = styled(NavButton)`
  right: 8px;
`;

const PageIndicator = styled.div`
  position: absolute;
  bottom: 12px;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 0.9rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 4px 0;
  border-radius: 8px;
  z-index: 2;
`;

const ImgaeContainer = styled.img`
  width: 10%;
  object-fit: contain;
`;

const PeriodContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  font-weight: bold;
  font-size: 13px;
  margin: 10px;
  justify-content: flex-start;
  width: 100%;
`;

const PeriodText = styled.p`
  margin: 0;
  color: #333;
`;

const ModalButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ModalButton2 = styled.button`
  all: unset;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Container = styled.div`
  display: flex;
  position: relative;
  width: 250px;
  height: 280px;
  background-color: white;
  border-radius: 0.3125rem;
  border: none;
  margin: 30px;
  cursor: pointer;
  box-shadow: 0 0.3125rem 0.3125rem rgba(0, 0, 0, 0.1);
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  width: 250px;
  height: 190px;
  overflow: hidden;
  border-radius: 0.3125rem 0.3125rem 0 0;
  position: relative;
`;

const JeansImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const HeartButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  &:hover svg {
    color: rgba(128, 128, 128, 0.5);
  }
  &:focus {
    outline: none;
  }
`;

const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 1.5rem 0 4px;
  color: #4a6171;
  text-align: center;
`;

const Modalcontainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewContainer = styled.div`
  width: 80%;
  margin: 10px auto;
  padding: 16px;
  background-color: #f9fcfe;
  border: 1px solid #799fc4;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  strong {
    display: block;
    margin-bottom: 8px;
    color: #345c74;
    font-size: 1rem;
  }
  p {
    margin: 0;
    color: #333;
    line-height: 1.5;
    font-size: 0.95rem;
  }
`;

const DesignerSuffix = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #4a6171;
  margin-left: 4px;
`;

const ContentText = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
  text-align: center;
  margin: 0 10px 5px;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

// 날짜를 "YYYY.MM.DD" 형식으로 변환하는 유틸
function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

// Component
export default function Profile({ post, reviews }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestPopupOpen, setIsRequestPopupOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false); // 채팅 모달 상태 추가
  const [liked, setLiked] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState(null); // 선택된 채팅방 ID
  const [messages, setMessages] = useState([]); // 채팅 메시지 상태
  const navigate = useNavigate();
  const bottomRef = React.createRef(); // 메시지 스크롤용 ref

  const portfolioList = portfolioImages;
  const prevImage = (e) => {
    e.stopPropagation();
    setCarouselIndex((i) => (i === 0 ? portfolioList.length - 1 : i - 1));
  };
  const nextImage = (e) => {
    e.stopPropagation();
    setCarouselIndex((i) => (i === portfolioList.length - 1 ? 0 : i + 1));
  };

  const { reviewnum = "", id = "", reviewcontent = [null] } = reviews;

  const clickCart = (e) => {
    e.stopPropagation();
    alert("장바구니에 추가되었습니다!");
  };

  // '대화하기' 버튼 클릭 시 호출되는 함수
  // Profile.jsx 내 ChatEvent 함수
const ChatEvent = async (e) => {
  e.stopPropagation();
  try {
    // 세션에서 현재 사용자 ID 가져오기
    const sessionResponse = await axios.get("http://localhost:8081/api/user", {
      withCredentials: true,
    });
    const currentUserId = sessionResponse.data.username;
    if (!currentUserId) {
      throw new Error("로그인이 필요합니다.");
    }

    // 백엔드 API 호출로 채팅방 생성 또는 조회
    const response = await axios.post(
      "http://localhost:8081/api/rooms/create",
      {
        creator: post.id, // 디자이너 ID
        participant: currentUserId, // 현재 사용자 ID
        name: `${post.id}와의 채팅방`, // 디자이너 ID + "와의 채팅방"
      },
      { withCredentials: true }
    );

    // 응답에서 roomId 추출
    const roomId = response.data.roomId;
    if (!roomId) {
      throw new Error("채팅방 ID를 받지 못했습니다.");
    }

    // 채팅방 ID 설정 및 모달 열기
    setSelectedRoomId(roomId);
    setIsChatModalOpen(true);
  } catch (error) {
    console.error("채팅방 생성/연결 실패:", error);
    alert(error.message || "채팅방을 열 수 없습니다.");
  }
};

  useEffect(() => {
    async function fetchLiked() {
      try {
        const res = await fetch(
          `http://localhost:8081/api/posts/like/check/${post.postnum}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (res.ok) {
          const isLiked = await res.json();
          setLiked(isLiked);
        }
      } catch (error) {
        console.error("찜 상태 확인 오류", error);
      }
    }
    fetchLiked();
  }, [post.postnum]);

  const handleToggleLike = async (e) => {
    e.stopPropagation();
    if (liked) {
      const confirmUnlike = window.confirm("찜 해제를 하시겠습니까?");
      if (!confirmUnlike) return;
      try {
        const response = await fetch(
          `http://localhost:8081/api/posts/unlike/${post.postnum}`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        if (response.ok) {
          setLiked(false);
        } else {
          alert("찜 해제 실패!");
        }
      } catch (error) {
        console.error("찜 해제 오류", error);
      }
    } else {
      try {
        const response = await fetch(
          `http://localhost:8081/api/posts/like/${post.postnum}`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        if (response.ok) {
          setLiked(true);
        } else {
          alert("찜하기 실패!");
        }
      } catch (error) {
        console.error("찜하기 오류", error);
      }
    }
  };

  const matchedReview = reviews.find((review) => review.id === post.id);

  const imageIndex = Math.abs(post.postnum % profileImages.length);
  const designerImageIndex = Math.abs(post.postnum % designerImages.length);

  return (
    <>
      <Container onClick={() => setIsModalOpen(true)}>
        <ImageWrapper>
          <JeansImage src={profileImages[imageIndex]} alt="프로필 이미지" />
          <HeartButton onClick={handleToggleLike}>
            {liked ? <FaHeart color="red" size={24} /> : <FaRegHeart color="gray" size={24} />}
          </HeartButton>
        </ImageWrapper>
        <Title>
          {post.id}
          <DesignerSuffix>디자이너님</DesignerSuffix>
        </Title>
        <ContentText>{post.contents}</ContentText>
      </Container>

      {isModalOpen && (
        <PortfoilModalContainer onClose={() => setIsModalOpen(false)}>
          <ModalContent>
            <DesignerImage src={designerImages[designerImageIndex]} alt="예시" />
            <h3>{post.id}</h3>
            <p>{post.contents}</p>
            <PeriodContainer>
              <PeriodText>참여기간</PeriodText>
              <PeriodText>2025.01 ~ 2025.01</PeriodText>
            </PeriodContainer>
            <PeriodContainer>
              <ImgaeContainer src={chat} alt="대화하기" />
              <ModalButton onClick={ChatEvent}>대화하기</ModalButton>
            </PeriodContainer>
            <PeriodContainer>
              <ImgaeContainer src={request} alt="의뢰신청하기" />
              <ModalButton2 onClick={() => setIsRequestPopupOpen(true)}>
                의뢰신청하기
              </ModalButton2>
            </PeriodContainer>
          </ModalContent>
          <Modalcontainer>
            <ImageCarouselContainer>
              <PrevButton onClick={prevImage}>{"<"}</PrevButton>
              <CarouselImage
                src={portfolioImages[carouselIndex]}
                alt={`포트폴리오 이미지 ${carouselIndex + 1}`}
              />
              <NextButton onClick={nextImage}>{">"}</NextButton>
              <PageIndicator>
                {carouselIndex + 1} / {portfolioList.length}
              </PageIndicator>
            </ImageCarouselContainer>
            <ModalContent3>
              <h4>작성된 리뷰</h4>
              {matchedReview && matchedReview.reviewcontent && matchedReview.reviewcontent.length > 0 ? (
                matchedReview.reviewcontent.map((comment, idx) => (
                  <ReviewContainer key={idx}>
                    <strong>{matchedReview.id}</strong>: {comment}
                  </ReviewContainer>
                ))
              ) : (
                <ReviewContainer>
                  <p>리뷰가 없습니다.</p>
                </ReviewContainer>
              )}
            </ModalContent3>
          </Modalcontainer>
          {isRequestPopupOpen && <RequestPopup onClose={() => setIsRequestPopupOpen(false)} />}
        </PortfoilModalContainer>
      )}

      {isChatModalOpen && (
        <Room
          roomId={selectedRoomId}
          selectedUser={post.id} // 디자이너 ID를 selectedUser로 전달
          messages={messages}
          setMessages={setMessages}
          isSideMenuOpen={false} // 초기 사이드 메뉴 상태
          onClose={() => setIsChatModalOpen(false)} // 모달 닫기
          onMenuClick={() => {}} // 사이드 메뉴 토글 (필요 시 구현)
          onCloseSideMenu={() => {}} // 사이드 메뉴 닫기
          onKeyDown={() => {}} // 메시지 입력 처리 (필요 시 구현)
          onCompositionStart={() => {}} // IME 입력 시작
          onCompositionEnd={() => {}} // IME 입력 종료
          setModalOpen={() => {}} // 디자인 불러오기 모달
          setModalOpen2={() => {}} // 의뢰 불러오기 모달
          onBlock={() => {}} // 차단 기능
          onReport={() => {}} // 신고 기능
          isConfirmOpen={false} // 확인 모달 상태
          confirmMessage="" // 확인 메시지
          onConfirmYes={() => {}} // 확인 예
          onConfirmNo={() => {}} // 확인 아니오
          isSuccessPopupOpen={false} // 성공 팝업 상태
          popupMessage="" // 성공 팝업 메시지
          bottomRef={bottomRef} // 스크롤 ref
        />
      )}
    </>
  );
}