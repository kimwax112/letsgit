import React, { useState } from "react";
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
  max-height: 600px;
  overflow-y: auto;
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

const DesignerImage = styled.img`
  margin: 0 auto;
  width: 100%;
  max-width: 150px;
  height: auto;
  object-fit: contain;
  margin-top: 10px; 
`;

const ModalContent2 = styled.img`
  width: 500px;
  height: 535px;
  display: flex;
  flex: 1;
  border: 2px solid #799fc4;
  border-radius: 15px;
  margin: 20px;
  object-fit: contain; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
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
  height: 250px;
  background-color: white;
  border-radius: 20px;
  border: 2px solid;
  margin: 30px;
  cursor: pointer;
`;

const JeansImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 200px;
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
  right: 50px;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  z-index: 2;
  cursor: pointer;
`;

const Text = styled.p`
  font-size: 30px;
  font-weight: bold;
  position: relative;
  z-index: 2;
  color: rgb(255, 255, 255);
  text-align: center;
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
export default function Profile({ post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestPopupOpen, setIsRequestPopupOpen] = useState(false);
  const [liked, setLiked] = useState(false); // 💖 찜 상태 추가
  const navigate = useNavigate();



  const clickCart = (e) => {
    e.stopPropagation();
    alert("장바구니에 추가되었습니다!");
  };

  
  const ChatEvent = () => {
    alert("대화방으로 이동합니다");
    navigate("/client/ChatMain");
  };

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


  const handleToggleLike = async (e) => {
    e.stopPropagation(); // 모달 방지
    try {
      const response = await fetch(`http://localhost:8081/api/posts/like/${post.postnum}`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setLiked((prev) => !prev);
      } else {
        alert("찜하기 실패!");
      }
    } catch (error) {
      console.error("찜하기 오류", error);
    }
  };

  const imageIndex = Math.abs(post.postnum % profileImages.length);
  const designerImageIndex = Math.abs(post.postnum % designerImages.length);
  const portfolioImageIndex = Math.abs(post.postnum % portfolioImages.length);

  return (
    <>
      <Container onClick={() => setIsModalOpen(true)}>
        <div className="border-b py-2">
          <p className="text-sm text-gray-500">{post.author}</p>
          <Text><p>{post.contents}</p></Text>
          <p>{post.name}</p>
        </div>
        <JeansImage src={profileImages[imageIndex]} alt="프로필 이미지" />
        {/* 6.10 <JeansImage src={post.image} alt="프로필 이미지" /> */} 
        <CartButton onClick={clickCart}>
          <CartImage src={cart2} alt="cart" />
        </CartButton>
        <HeartButton onClick={handleToggleLike}>
          {liked ? <FaHeart color="red" size={24} /> : <FaRegHeart color="gray" size={24} />}
        </HeartButton>
      </Container>

      {isModalOpen && (
        <PortfoilModalContainer onClose={() => setIsModalOpen(false)}>
          <ModalContent>
            <DesignerImage src={designerImages[designerImageIndex]} alt="예시" />
            <h3>{post.author}</h3>
            <p>
              의류 디자인 경력 약 5년 개인, 협업 디자인 경험도 있습니다.
              기존 틀에 벗어나 새로운 디자인을 하도록 노력하였습니다.
            </p>
            <PeriodContainer>
              <PeriodText>참여기간</PeriodText>
              <PeriodText>2025.01 - 2025.01</PeriodText>
            </PeriodContainer>
            <PeriodContainer>
              <ImgaeContainer src={cart2} alt="장바구니에 넣기" />
              <ModalButton onClick={clickCart}>장바구니에 넣기</ModalButton>
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

          <ModalContent2 src={portfolioImages[portfolioImageIndex]} alt="예시이미지" />
          {isRequestPopupOpen && (
            <RequestPopup onClose={() => setIsRequestPopupOpen(false)} />
          )}
        </PortfoilModalContainer>
      )}
    </>
  );
}
