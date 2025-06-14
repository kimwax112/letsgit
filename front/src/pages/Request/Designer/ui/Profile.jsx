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
import { FaHeart, FaRegHeart } from "react-icons/fa"; // 💡 추가
import axios from "axios";

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

// Styled Components
const PortfoilModalContainer = styled(Modal)`
  display: flex;
  flex-direction: row;
  
  height : 800px;
  
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
  overflow-y: auto; /* 필요할 때만 스크롤바 표시 */
`;



const DesignerImage = styled.img`
  margin: 0 auto;
  width: 100%;
  max-width: 150px;
  height: auto;
  object-fit: contain;
  margin-top: 10px; 
  background-color : black;
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
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  z-index: 2;
  &:hover { background: rgba(0,0,0,0.7); }
`;

const PrevButton = styled(NavButton)` left: 8px; `;
const NextButton = styled(NavButton)` right: 8px; `;

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

const ModalButton2 = styled.button`
  all: unset;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    background-color: #f5f5f5;
  }
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

const CartButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  z-index: 2;
`;

const CartImage = styled.img`
  width: 100%;
  height: 100%;
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
    color: rgba(128, 128, 128, 0.5); /* 연한 회색빛 */
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
  display : flex;
  flex-direction : column;
  
  
`

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
  font-size: 1.2rem;      /* 조금 작게 */
  font-weight: 600;     /* 얇게 */
  color: #4a6171;
  margin-left: 4px;     /* id와 간격 */
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

const DesignerSuffix = styled.span`
  font-size: 1.2rem;      /* 조금 작게 */
  font-weight: 600;     /* 얇게 */
  color: #4a6171;
  margin-left: 4px;     /* id와 간격 */
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

  // 날짜를 "YYYY.MM.DD" 형식으로 변환하는 유틸 6.9
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
  const [liked, setLiked] = useState(false); // 💖 찜 상태 추가
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();

  const portfolioList = portfolioImages;
  const prevImage = (e) => { e.stopPropagation(); setCarouselIndex(i => (i === 0 ? portfolioList.length - 1 : i - 1)); };
  const nextImage = (e) => { e.stopPropagation(); setCarouselIndex(i => (i === portfolioList.length - 1 ? 0 : i + 1)); };

 const {
    reviewnum = "",
    id = "",
    reviewcontent = [null],
  } = reviews;

  const clickCart = (e) => {
    e.stopPropagation();
    alert("장바구니에 추가되었습니다!");
  };

  
  const ChatEvent = () => {
    alert("대화방으로 이동합니다");
    navigate("/client/ChatMain");
  };


  const matchedReview = reviews.find((review) => review.id === post.id);

  /*/* 디자이너고르기에서 id에 맞게 채팅방으로 이동되고 채팅방 생성되게 하는거 하다가 안한거
  const ChatEvent = async (postnum) => {
  let room;
  try {
    // 1) 기존 방 조회
    let res = await axios.get(`/api/rooms/post/${postnum}`,
  { withCredentials: true });
    room = res.data;
  } catch (err) {
    if (err.response?.status === 404) {
      // 2) 방이 없으면 새로 생성
      const createRes = await axios.post(
        "/api/rooms",
        { postId: postnum },
        { withCredentials: true }
      );
      room = createRes.data;
    } else {
      console.error("방 조회/생성 오류", err);
      return alert("채팅방 진입 중 오류가 발생했습니다.");
    }
  }

 
  // 3) 채팅화면으로 이동
    navigate(`/client/ChatMain/${room.id}`, {
    state: { newRoom: room }
  });
};
*/

/* 디자이너고르기에서 id에 맞게 채팅방으로 이동되고 채팅방 생성되게 하는거 하다가 안한거
const ChatEvent = async (postnum) => {
  let room;

  // ——— 더미 데이터로 바로 뿌려보기 ———
  // axios 호출 없이 더미 방 객체 생성
  room = {
    id: "dummy-room-3",   // 이동할 때 사용할 방 고유 ID
    creater : "dummyUser", // 방 생성자
    postId: postnum,        // 포스트 번호
    name: `더미 채팅방 #${postnum}`,
    participants: [],       // 필요하다면 여기에 유저 리스트 등 추가
    createdAt: new Date().toISOString()
  };


  // 3) 채팅화면으로 이동
  navigate(`/client/ChatMain/`, {
    state: { newRoom: room }
  });
};
*/
  useEffect(() => {
    async function fetchLiked() {
      try {
        const res = await fetch(`http://localhost:8081/api/posts/like/check/${post.postnum}`, {
          method: "GET",
          credentials: "include",
        });
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
    // 찜 해제 확인창
    const confirmUnlike = window.confirm("찜 해제를 하시겠습니까?");
    if (!confirmUnlike) return;

    // 찜 해제 API 호출
    try {
      const response = await fetch(`http://localhost:8081/api/posts/unlike/${post.postnum}`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setLiked(false);
      } else {
        alert("찜 해제 실패!");
      }
    } catch (error) {
      console.error("찜 해제 오류", error);
    }
  } else {
    // 찜하기 API 호출
    try {
      const response = await fetch(`http://localhost:8081/api/posts/like/${post.postnum}`, {
        method: "POST",
        credentials: "include",
      });

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


  const imageIndex = Math.abs(post.postnum % profileImages.length);
  const designerImageIndex = Math.abs(post.postnum % designerImages.length);
  // const portfolioImageIndex = Math.abs(post.postnum % portfolioImages.length);

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
              <p>
             {post.contents}
              </p>
            
            <PeriodContainer>
              <PeriodText>참여기간</PeriodText>
              <PeriodText>2025.01 ~ 2025.01</PeriodText>
              {/*{post.data}  참여기간 api 받아오는데이터 필요해요*/}
            </PeriodContainer>

            <PeriodContainer>
              {/*<ImgaeContainer src={cart2} alt="장바구니에 넣기" />
              <ModalButton onClick={clickCart}>장바구니에 넣기</ModalButton>*/}
            </PeriodContainer>

            <PeriodContainer>
              <ImgaeContainer src={chat} alt="대화하기" />
                <ModalButton onClick={(e) => { e.stopPropagation(); ChatEvent(post.num); }}>
              대화하기
            </ModalButton>
            </PeriodContainer>

            <PeriodContainer>
              <ImgaeContainer src={request} alt="의뢰신청하기 " />
              <ModalButton2 onClick={() => setIsRequestPopupOpen(true)}>
                의뢰신청하기
              </ModalButton2>
            </PeriodContainer>
            
          </ModalContent>
          <Modalcontainer>
          <ImageCarouselContainer>
            <PrevButton onClick={prevImage}>&lt;</PrevButton>
            <CarouselImage
              src={portfolioImages[carouselIndex]}
              alt={`포트폴리오 이미지 ${carouselIndex + 1}`}
            />
            <NextButton onClick={nextImage}>&gt;</NextButton>
            <PageIndicator>
              {carouselIndex + 1} / {portfolioList.length}
            </PageIndicator>
          </ImageCarouselContainer>
          <ModalContent3>  
            {/* choseDesigner에서 axios.get("/mock-review.json")에서 받아오는고 */}
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
          {isRequestPopupOpen && (
            <RequestPopup onClose={() => setIsRequestPopupOpen(false)} />
          )}
          
          
        </PortfoilModalContainer>
      )}
    </>
  );
}