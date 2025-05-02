import React, { useState } from "react";
import styled from "styled-components";

// 스타일 정의
const UploadContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DropArea = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(235, 235, 235);
  border: 1px solid #eee;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 40px; /* '+' 기호가 크게 보이도록 */
  position: relative;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
`;

const ImageUploader = ({ className, id, files, setFiles }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // 단일 파일만 처리
    if (selectedFile) {
      const newFile = {
        id,
        file: selectedFile,
        preview: URL.createObjectURL(selectedFile), // 미리보기 URL 생성
      };
      setFiles((prevFiles) => ({ ...prevFiles, [id]: newFile })); // 해당 id의 파일만 업데이트
    }
  };

  // 파일 삭제 처리
  const removeFile = () => {
    if (files[id]) {
      URL.revokeObjectURL(files[id].preview); // 메모리 해제
      setFiles((prevFiles) => {
        const updatedFiles = { ...prevFiles };
        delete updatedFiles[id];
        return updatedFiles;
      });
    }
  };

  // DropArea 클릭 시 파일 입력 열기
  const handleClickDropArea = () => {
    document.getElementById(`fileInput-${id}`).click();
  };

  return (
    <UploadContainer className={className}>
      <DropArea onClick={handleClickDropArea}>
        {files[id] ? (
          <>
            <PreviewImage src={files[id].preview} alt="Preview" />
            <RemoveButton onClick={removeFile}>×</RemoveButton>
          </>
        ) : (
          "+"
        )}
      </DropArea>
      <input
        id={`fileInput-${id}`}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </UploadContainer>
  );
};

export default ImageUploader;
