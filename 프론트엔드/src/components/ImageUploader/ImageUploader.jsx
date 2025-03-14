// ImageUploader.jsx
import React, { useState } from "react";
import styled from "styled-components";

const UploadContainer = styled.div`

  background-color : white;
  border: 1px dashed #ccc;
  border-radius: 10px;
  display: flex;
  padding: 20px;
  width: 600px; /* 필요에 따라 조정 */
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 22%;
`;

const DropArea = styled.div`
  width: 150px;
  height: 150px;
  background-color:rgb(235, 235, 235);
  border: 1px solid #eee;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 40px; /* '+' 기호가 크게 보이도록 */
`;

const FileList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 150px; /* 스크롤이 필요한 경우 */
  overflow-y: auto;
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FileItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fafafa;
  padding: 5px 10px;
  border-radius: 4px;
`;

const FileName = styled.span`
  flex: 1;
`;

const FileSize = styled.span`
  color: #999;
  margin: 0 10px;
`;

const RemoveButton = styled.button`
  border: none;
  background: none;
  color: red;
  font-size: 16px;
  cursor: pointer;
`;

const ImageUploader = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // 파일 정보를 간단히 { name, size } 형태로 변환
    const newFiles = selectedFiles.map((file) => ({
      name: file.name,
      size: file.size,
    }));
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  // KB로 단순 변환 (1 KB = 1024 바이트)
  const formatSize = (size) => {
    const kb = Math.round(size / 1024);
    return `${kb} KB`;
  };

  // 숨겨진 input에 접근하기 위한 ref or id
  const handleClickDropArea = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <UploadContainer>
      {/* 왼쪽 영역: 이미지 업로드 박스 */}
      <DropArea onClick={handleClickDropArea}>
        +
      </DropArea>
      <input
        id="fileInput"
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* 오른쪽 영역: 업로드된 파일 목록 */}
      <FileList>
        {files.map((file, idx) => (
          <FileItem key={idx}>
            <FileName>{file.name}</FileName>
            <FileSize>{formatSize(file.size)}</FileSize>
            <RemoveButton onClick={() => removeFile(idx)}>x</RemoveButton>
          </FileItem>
        ))}
      </FileList>
    </UploadContainer>
  );
};

export default ImageUploader;
