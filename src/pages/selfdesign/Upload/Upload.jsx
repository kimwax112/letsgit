import React, { useState } from "react";
import "../../CosMain/CosMainCss.css";
import "./Upload.css";
import { Edit } from "./UploadClick"; // Edit 컴포넌트 불러오기
import Canvas from "../../../components/Canvas/Canvas";

export default function Upload() {
  const [fileBoxes, setFileBoxes] = useState([
    { id: 1, fileName: "파일을 올려주세요", showEdit: false, image: null }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false); // 그림판 팝업 상태 관리

  // FileBox를 최대 3개까지만 생성하도록 제한
  const addFileBox = () => {
    if (fileBoxes.length < 3) {
      setFileBoxes(prevBoxes => [
        ...prevBoxes, 
        { id: prevBoxes.length + 1, fileName: "파일을 올려주세요", showEdit: false, image: null }
      ]);
    } else {
      alert("최대 3개까지만 생성할 수 있습니다.");
    }
  };

  const toggleEdit = (id) => {
    setFileBoxes(prevBoxes =>
      prevBoxes.map(file =>
        file.id === id ? { ...file, showEdit: !file.showEdit } : file
      )
    );
  };

  const removeFileBox = (id) => {
    setFileBoxes(prevBoxes => prevBoxes.filter(file => file.id !== id));
  };

  const handleUpload = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      reader.onloadend = () => {
        setFileBoxes(prevBoxes =>
          prevBoxes.map(fileBox =>
            fileBox.id === id
              ? { ...fileBox, fileName: fileNameWithoutExt, image: reader.result, showEdit: true }
              : fileBox
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearchChange = (event) => {
    setInputValue(event.target.value);
    if (!isComposing) {
      setSearchQuery(event.target.value);
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (event) => {
    setIsComposing(false);
    setSearchQuery(event.target.value);
  };

  const filteredFiles = fileBoxes.filter(file =>
    file.fileName
      .normalize("NFC")
      .trim()
      .toLowerCase()
      .includes(searchQuery.normalize("NFC").trim().toLowerCase())
  );

  return (
    <div>
      <div className="WholeWrapper">
        <div className="Container">
          <div className="Title">
            <h2 className="title">디자인 파일 업로드</h2>
          </div>
          <div className="InputWrapper">
            <h3 className="title2">디자인 이름</h3>
            <input 
              type="text" 
              className="title2input" 
              placeholder="파일명 검색"
              value={inputValue}
              onChange={handleSearchChange}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
            />
          </div>

          <div className="UploadpageWrapper">
            <div className="UploadpageWrapper2">
              <div className="FileContainer">
                <div className="FileUpload">
                  <h3>파일 목록</h3>
                  {filteredFiles.length > 0 ? (
                    filteredFiles.map((file) => (
                      <div key={file.id} className="FileBoxWrapper">
                        <div className="FileBox">
                          <div className="fileNameWrapper" style={{ width: "150px" }}> {/* fileNameWrapper의 폭을 줄임 */}
                            <p className="fileName">{file.fileName}</p>
                          </div>
                          <div className="ButtonGroup">
                            <button className="deleteButton" onClick={() => removeFileBox(file.id)}>삭제</button>
                            <input 
                              type="file" 
                              accept="image/*" 
                              style={{ display: "none" }} 
                              id={`upload-${file.id}`}
                              onChange={(event) => handleUpload(event, file.id)}
                            />
                            <button className="uploadButton" onClick={() => document.getElementById(`upload-${file.id}`).click()}>
                              업로드
                            </button>
                            {/* 그림판 버튼 추가 */}
                            <button className="canvasButton" onClick={() => setShowCanvas(true)}>
                              그림판
                            </button>
                          </div>
                        </div>
                        <Edit show={file.showEdit} toggleEdit={() => toggleEdit(file.id)} image={file.image} />
                      </div>
                    ))
                  ) : (
                    <p>검색된 파일이 없습니다.</p>
                  )}

                  <div className="ButtonContainer">
                    <button className="resetButton" onClick={() => setFileBoxes([])}>초기화</button>
                    <button className="saveButton">저장</button>
                  </div>
                  <div className="createFile">
                    <button 
                      className="createButton" 
                      onClick={addFileBox} 
                      disabled={fileBoxes.length >= 3}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 그림판 팝업 */}
        {showCanvas && (
          <div className="canvasPopup">
            <div className="canvasPopupContent">
              <Canvas />
              <button className="closebtn" onClick={() => setShowCanvas(false)}>닫기</button> {/* 닫기 버튼 추가 */}
            </div>
          </div>
        )}

        {/* 디자인 파일 업로드 끝 */}
        <div className='ActiveInfo'>
        </div>
        <div className='StaticInfo'>
          (주)중개 플랫폼 | 경기도 부천시 원미구 신흥로56번길 25, 6층 | 팀장 :  | 팀원 :  | 사업자등록번호 : 123-45-67891
          <br/>
          통신판매업신고 : 2025-부천시초-1234 | 유료직업소개사업등록번호 : 제2025-12345678-91-0-12345호 | 고객센터 : 1234-1234 | 호스팅 사업자 : Bucheon(Bu) | 1:1 문의하기
          <br/>
          <br/>
          <br/>
          (주)중개플랫폼은 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은 판매회원에게 있습니다.
          <br/>
          (주)중개 플랫폼의 상품/판매회원/중개 서비스/거래 정보, 콘텐츠, UI 등에 대한 무단복제, 전송, 배포, 스크래핑 등의 행위는 저작권법, 콘텐츠산업 진흥법 등 관련법령에 의하여 엄격히 금지됩니다.
          <br/>
          <br/>
          Copyright © 2025 kmong Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
}
