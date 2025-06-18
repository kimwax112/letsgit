import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  width: 400px;
  height: auto;
`;

const DetailBox = styled.div`
  flex: 0.8;
  width: 100%;
  max-width: 400px;
  height: 200px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.6;
  letter-spacing: 0.5px;
  color: rgb(58, 159, 232);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  white-space: pre-wrap;
  word-break: break-word;
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
  margin: 20px;
`;

const ImgItem = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  background: #f0f0f0;
`;

const ImgContainer1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 16px;
  min-height: 150px;
  padding: 8px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #fafafa;
  position: relative;

  &:empty::before {
    content: "이미지를 업로드 해주세요";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #888;
    font-size: 1rem;
    pointer-events: none;
  }
`;

export default function PostCotent3({ data = {} }) {
  const { requestId = "", description = "" } = data;

  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description || "");
  const [isSaving, setIsSaving] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!requestId) return;

    axios
      .get("/mock-requestpostImage.json")
      .then((res) => {
        const req = res.data.find((r) => r.requestId === requestId);
        if (req) {
          const urls = [req.image1Url, req.image2Url, req.image3Url].filter((u) => u);
          setImages(urls.slice(0, 3));
        }
      })
      .catch((err) => console.error("이미지 로드 실패:", err));
  }, [requestId]);

  useEffect(() => {
    console.log("PostCotent3 data:", data);
    console.log("RequestId:", requestId);
    console.log("Description:", description);
  }, [data, requestId, description]);

  const handleEditToggle = () => {
    setEditMode(true);
    setEditedDescription(description || "");
  };

  const handleSave = async () => {
    if (!editedDescription.trim()) {
      alert("상세설명을 입력해주세요.");
      return;
    }

    if (!requestId) {
      alert("요청 ID가 없습니다.");
      return;
    }

    setIsSaving(true);
    try {
      const updatedPost = {
        description: editedDescription,
      };

      console.log("Sending PATCH request:", {
        url: `http://localhost:8081/api/requests/${requestId}/description`,
        data: updatedPost,
      });

      const response = await axios.patch(
        `http://localhost:8081/api/requests/${requestId}/description`,
        updatedPost,
        { withCredentials: true }
      );

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
    setEditedDescription(description || "");
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
          <Text>{description || "수정하기"}</Text>
        </DetailBox>
      )}
      <ImgContainer1>
        {images.map((src, idx) => (
          <ImgItem
            key={idx}
            src={src}
            alt={`요청 이미지 ${idx + 1}`}
            onError={(e) => {
              e.currentTarget.style.visibility = "hidden";
            }}
          />
        ))}
      </ImgContainer1>
    </Container>
  );
}