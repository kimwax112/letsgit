import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  width: 400px;
  height: auto;
`;

const DetailBox = styled.div`
  flex : 0.8;
   width: 100%;                   /* 반응형 대응 */
  max-width: 400px;   
  height: 200px; 
  background-color: #ffffff;     /* 깔끔한 흰색 배경 */
  border: 1px solid #e0e0e0;     /* 연한 회색 테두리 */
  border-radius: 12px;           /* 둥근 모서리 */
  /* 폰트 스타일링 */
  
  font-weight: 500;              /* 중간 굵기 */
  font-size: 1.125rem;           /* 18px 정도 */
  line-height: 1.6;              /* 행간 여유 */
  letter-spacing: 0.5px;         /* 글자 사이 약간 띄우기 */
  color: rgb(58, 159, 232);      /* 차분한 텍스트 컬러 */
  text-shadow: 0 1px 1px rgba(0,0,0,0.05); /* 미묘한 입체감 */

  box-shadow: 0 2px 6px rgba(0,0,0,0.1); /* 부드러운 그림자 */
  white-space: pre-wrap;         /* 줄바꿈 유지 */
  word-break: break-word;        /* 단어가 길어도 줄바꿈 */
  
`;
const TextArea = styled.textarea`
  aspect-ratio: 1 / 1;
  width: 100%;
  height: 100%;
  background-color: white;
  border: 2px solid;
  padding: 10px;
  font-size: 16px;
  resize: none;
  
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ButtonDetailContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #799fc4;
  width: 120px;
  height: 30px;
  border: 1px solid;
  font-weight: bold;
  font-size: 18px;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Text = styled.div`
margin : 20px;
`

export default function PostCotent3({ data = {} }) {
    const {
    requestId="",
    description="",
    categoryTags = "",
    style = "",
    amount = "",
    deadline = "",
  } = data;

  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState(data?.description || "");
  const [requests, setRequests] = useState([]);
  const [isSaving, setIsSaving] = useState(false);


  // 디버깅 로그
  useEffect(() => {
    console.log("PostCotent3 data:", data);
    console.log("RequestId:", requestId);
    console.log("Description:", description);
  }, [data, requestId, description]);
  
  // GET /api/requests 호출
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/requests", { withCredentials: true })
      .then((response) => {
        console.log("Fetched requests:", response.data);
        setRequests(response.data);
      })
      .catch((error) => console.error("목록 조회 실패:", error));
  }, []);

  // 디버깅 로그
  console.log("PostCotent3 data:", data);
  console.log("RequestId:", data?.requestId);
  console.log("Description:", data?.description);

  const handleEditToggle = () => {
    setEditMode(true);
    setEditedDescription(data?.description || "");
  };

  const handleSave = async () => {
    if (!editedDescription.trim()) {
      alert("상세설명을 입력해주세요.");
      return;
    }

    if (!data?.requestId) {
      alert("요청 ID가 없습니다.",);
      return;
    }

    setIsSaving(true);
    try {
      const updatedPost = {
        description: editedDescription,
        // 최소 본문 테스트
        // 추가 필드 필요 시:
        // title: data?.title || "",
        // categoryTags: data?.categoryTags || "", // 문자열 유지
        // style: data?.style || "",
        // amount: data?.amount || "",
        // deadline: data?.deadline || ""
      };

      console.log("Sending PUT request:", {
        url: `http://localhost:8081/api/requests/${requestId}`,
        
        data: updatedPost,
        
      });
      

      const response = await axios.put(
        `http://localhost:8081/api/requests/${requestId}`,
        updatedPost,
        { withCredentials: true }
      );

      // 대안: PATCH
      // const response = await axios.patch(
      //   `http://localhost:8081/api/requests/${data.requestId}`,
      //   updatedPost,
      //   { withCredentials: true }
      // );

      console.log("서버 응답:", response.data);
      setEditMode(false);
      setIsSaving(false);
      alert("수정 완료!");
    } catch (error) {
      console.error("수정 실패:", error);
      setIsSaving(false);
      if (error.response?.status === 404) {
        alert("요청을 찾을 수 없습니다. requestId와 엔드포인트를 확인하세요.");
      } else if (error.response?.status === 500) {
        alert("서버 내부 오류가 발생했습니다. 서버 로그를 확인하세요.");
      } else if (error.response?.status === 400) {
        alert("잘못된 요청입니다. 입력 데이터를 확인하세요.");
      } else {
        alert(`수정에 실패했습니다: ${error.message}`);
      }
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedDescription(data?.description || "");
  };

  return (
    <Container>
      <ButtonContainer>
        <ButtonDetailContainer>상세설명</ButtonDetailContainer>
        {editMode ? (
          <>
            <ButtonDetailContainer disabled={isSaving} onClick={handleSave}>
              {isSaving ? "저장 중..." : "저장"}
            </ButtonDetailContainer>
            <ButtonDetailContainer onClick={handleCancel}>취소</ButtonDetailContainer>
          </>
        ) : (
          <ButtonDetailContainer onClick={handleEditToggle}>수정하기</ButtonDetailContainer>
        )}
      </ButtonContainer>
      {editMode ? (
        <TextArea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          placeholder="상세설명을 입력하세요"
        />
      ) : (
        <DetailBox>
          <Text>{data?.description || "수정하기"}</Text>
          </DetailBox>
      )}
      
    </Container>
  );
}