import React, { useRef } from 'react';
import styled from 'styled-components';

// 스타일 정의 (기존과 동일)
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
  border: 1px dashed #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  font-size: 2rem;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
`;

export default function ImageUploader({ className, id, files, setFiles, onImageUpload }) {
  const inputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setFiles((prev) => ({ ...prev, [id]: { file, preview: previewUrl, serverUrl: null } }));

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8081/files/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} ${errorText}`);
      }

      // 서버 응답 처리 (JSON 또는 텍스트)
      let uploadedUrl;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        uploadedUrl = data.url;
      } else {
        uploadedUrl = await response.text();
      }

      setFiles((prev) => ({
        ...prev,
        [id]: { file, preview: previewUrl, serverUrl: uploadedUrl },
      }));

      // 부모 컴포넌트에 서버 URL 전달
      if (onImageUpload) {
        onImageUpload(id.replace('upload', '') - 1, uploadedUrl);
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      
      alert('이미지 업로드에 실패했습니다: ' + error.message);
      URL.revokeObjectURL(previewUrl);
      setFiles((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  const removeFile = () => {
    if (!files[id]) return;
    URL.revokeObjectURL(files[id].preview);
    setFiles((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    // 부모 컴포넌트에 URL 제거 알림
    if (onImageUpload) {
      onImageUpload(id.replace('upload', '') - 1, '');
    }
  };

  const handleClick = () => inputRef.current.click();

  return (
    <UploadContainer className={className}>
      <DropArea onClick={handleClick}>
        {files[id] ? (
          <>
            <PreviewImage src={files[id].preview} alt="Preview" />
            <RemoveButton onClick={removeFile}>×</RemoveButton>
          </>
        ) : (
          '+'
        )}
        <input
          ref={inputRef}
          id={`fileInput-${id}`}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </DropArea>
    </UploadContainer>
  );
}