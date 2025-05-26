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
import axios from "axios";
import { useEffect } from "react";

// 하드코딩된 이미지 배열
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

const PortfoilModalContainer = styled(Modal)`
  display: flex;
  flex-direction: row;
  max-height: 600px; /* 팝업창 최대 높이 설정 */
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
  height : auto;
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
  height: 535x;
  display: flex;
  flex: 1;
  border: 2px solid #799fc4;
  border-radius: 15px;
  margin: 20px;
  justify-content: center;
  align-items: center;
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
  align-self: flex-start;
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
  &:focus {
    border-color: #799fc4;
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
  &:focus {
    border-color: #799fc4;
  }
`;

const Container = styled.div`
  display: flex;
  position: relative;
  width: 250px;
  height: 250px;
  background-color: white;
  border: 0.5px solid;
  margin: 30px;
  cursor: pointer;
  border-radius : 20px;
  border : solid 2px ;
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
const Text = styled.p`
  font-size : 30px;
  font-weight : bold;
  position : relative;
  z-index : 2;
  color :rgb(255, 255, 255);
  text-align : center;
`

export default function Profile({ post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestPopupOpen, setIsRequestPopupOpen] = useState(false);
   // 주석 처리: ChoseDesigner.jsx에서 이미 posts와 postsCount를 관리하므로 Profile 컴포넌트에서는 불필요함
  const [postsCount, setPostsCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();


  const clickCart = (e) => {
    e.stopPropagation();
    alert("장바구니에 추가되었습니다!");

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // 현재 post 데이터를 장바구니에 추가 (중복 방지 로직 포함 가능)
    const updatedCart = [...existingCart,  {
      postnum : post.postnum,
      id: post.id,
      contents: post.contents,
      image: profileImages[Math.abs(post.postnum % profileImages.length)], // 이미지 경로 추가
      timestamp: new Date().toISOString(), // 추가된 시간 기록
      },
    ];

    // 중복 제거 (id 기준)
    const uniqueCart = Array.from(
      new Map(updatedCart.map((item) => [item.id, item])).values()
    );

    // localStorage에 업데이트된 장바구니 데이터 저장
    localStorage.setItem("cartItems", JSON.stringify(uniqueCart));

  };

  const ChatEvent = () => {
    alert("대화방으로 이동합니다");
    navigate("/client/ChatMain");
  };
  
  // postnum을 기준으로 이미지 인덱스 계산
  const imageIndex = Math.abs(post.postnum % profileImages.length);
  const designerImageIndex = Math.abs(post.postnum % designerImages.length);
  const portfolioImageIndex = Math.abs(post.postnum % portfolioImages.length);

  // 주석 처리: ChoseDesigner.jsx에서 이미 fetchPosts를 호출하여 데이터를 가져오므로 중복 호출 방지
  const fetchPosts = () => {
    axios.get("http://localhost:8081/api/posts", { withCredentials: true })
      .then(response => {
        setPosts(response.data);
        setPostsCount(response.data.length); 
      })
      .catch(error => console.error("글 목록 불러오기 실패", error));
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Container onClick={() => setIsModalOpen(true)}>
        <div className="border-b py-2">
          <Text>{post.id}</Text>
         <Text>{post.contents}</Text>
          
        </div>
        <JeansImage src={profileImages[imageIndex]} alt="프로필 이미지" />
        <CartButton onClick={clickCart}>
          <CartImage src={cart2} alt="cart" />
        </CartButton>
      </Container>

      {isModalOpen && (
        <PortfoilModalContainer onClose={() => setIsModalOpen(false)}>
          <ModalContent>
            <DesignerImage src={designerImages[designerImageIndex]} alt="예시" />
            <h3 style={{color : "black"}}>{post.id}</h3>
            <p>
              의류 디자인 경력 약 5년 개인, 협업 디자인 경험도 있습니다. 기존 틀에
              벗어나 새로운 디자인을 하도록 노력하였습니다.
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
              <ModalButton onClick={ChatEvent}>대화하기</ModalButton>
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