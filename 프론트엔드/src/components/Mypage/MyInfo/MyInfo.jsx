import React, { useRef, useState } from "react";
import "./MyInfo.css";

export default function MyInfo() {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState("/default-profile.png");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setPreview("/default-profile.png");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="myinfo-container">
      <h2 className="myinfo-title">내 정보</h2>

      {/* 프로필 섹션 */}
      <div className="profile-section">
        <img
          src={preview}
          alt="프로필 사진"
          className="profile-image"
          onClick={() => setIsModalOpen(true)}
        />
        <div className="button-group">
          <button
            className="profile-change-button"
            onClick={() => fileInputRef.current.click()}
          >
            프로필 변경
          </button>
          <button
            className="profile-delete-button"
            onClick={handleImageDelete}
          >
            삭제
          </button>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>

      {/* 모달 미리보기 */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={preview} alt="확대된 프로필" className="modal-image" />
            <button className="modal-close-button" onClick={() => setIsModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}

      {/* 성명 */}
      <div className="input-group">
        <label className="input-label">성명</label>
        <input type="text" className="input-field" placeholder="성명 입력" />
      </div>

      {/* 이메일 주소 */}
      <div className="input-group">
        <label className="input-label">이메일 주소</label>
        <input type="email" className="input-field" placeholder="이메일 입력" />
      </div>

      {/* 비밀번호 */}
      <div className="input-group">
        <label className="input-label">비밀번호</label>
        <div className="input-with-button">
          <input type="password" className="input-field" placeholder="********" disabled />
          <button className="secondary-button">수정</button>
        </div>
      </div>

      {/* 전화번호 */}
      <div className="input-group">
        <label className="input-label">전화번호</label>
        <div className="input-with-button">
          <input type="tel" className="input-field" placeholder="전화번호 입력" />
          <button className="secondary-button">재인증</button>
        </div>
      </div>

      {/* 생년월일 */}
      <div className="input-group">
        <label className="input-label">생년월일</label>
        <input type="date" className="input-field" />
      </div>

      {/* 성별 */}
      <div className="input-group">
        <label className="input-label">성별</label>
        <div className="radio-group">
          <label className="radio-option">
            <input type="radio" name="gender" value="male" /> 남성
          </label>
          <label className="radio-option">
            <input type="radio" name="gender" value="female" /> 여성
          </label>
        </div>
      </div>

      {/* 환불 계좌 정보 */}
      <div className="input-group">
        <label className="input-label">환불 계좌 정보</label>
        <select className="input-field mb-2">
          <option value="personal">개인계좌</option>
          <option value="business">사업자계좌</option>
        </select>
        <input type="text" className="input-field" placeholder="계좌번호 입력" />
      </div>

      {/* 회원탈퇴 */}
      <div className="withdraw-section">
        <button className="withdraw-button">회원탈퇴</button>
      </div>

      {/* 저장 / 취소 */}
      <div className="action-buttons">
        <button className="cancel-button">취소</button>
        <button className="save-button">저장</button>
      </div>
    </div>
  );
}
