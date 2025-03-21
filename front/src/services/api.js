import axios from "axios";

const BASE_URL = "http://localhost:8081"; // 스프링 부트 서버 주소

// 이미지 업로드
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${BASE_URL}/files/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    throw error;
  }
};

// 업로드된 이미지 목록 가져오기
export const fetchImages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/files/list`);
    return response.data;
  } catch (error) {
    console.error("이미지 목록 불러오기 실패:", error);
    throw error;
  }
};
