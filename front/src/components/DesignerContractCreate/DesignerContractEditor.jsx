import React, { useRef, useEffect, useState  } from "react";
import styles from "./DesignerContractCreate.module.css";

const DesignerContractEditor = ({ contractData, setContractData }) => {
  const editorRef = useRef(null);

  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);

  // 부모 상태(contractContent)가 바뀔 때 에디터 내용 동기화
  useEffect(() => {
  if (
      editorRef.current &&
      editorRef.current.innerHTML !== (contractData.contractContent || "")
    ) {
      editorRef.current.innerHTML = contractData.contractContent || "";
    }
  }, [contractData.contractContent]);

  // contentEditable 변경 시 부모 상태 업데이트
  const handleInput = () => {
    setContractData((prev) => ({
      ...prev,
      contractContent: editorRef.current.innerHTML,
    }));
  };

  // 텍스트 스타일 변경 함수
  const handleStyleChange = (style) => {
  editorRef.current.focus(); // 포커스 필요

  if (style === "bold") {
    document.execCommand("bold");
  } else if (style === "italic") {
    document.execCommand("italic");
  } else if (style === "underline") {
    document.execCommand("underline");
  } else if (style === "strikeThrough") {
    document.execCommand("strikeThrough");
  }

  setContractData((prev) => ({
    ...prev,
    contractContent: editorRef.current.innerHTML,
  }));
};

  // 글자색 변경 함수
  const handleColorChange = (color) => {
  editorRef.current.focus();
  document.execCommand("foreColor", false, color);
  setContractData((prev) => ({
    ...prev,
    contractContent: editorRef.current.innerHTML,
  }));
};

  // 배경색 변경 함수
  const handleBgColorChange = (color) => {
  editorRef.current.focus();
  document.execCommand("backColor", false, color); // 또는 hiliteColor (Firefox 지원용)
  setContractData((prev) => ({
    ...prev,
    contractContent: editorRef.current.innerHTML,
  }));
};

  // 글자 크기 변경 함수
  const handleFontSizeChange = (sizePx) => {
  editorRef.current.focus();
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  if (!range.toString()) return;

  const span = document.createElement("span");
  span.style.fontSize = sizePx + "px";
  span.textContent = range.toString();

  range.deleteContents();
  range.insertNode(span);

  setContractData((prev) => ({
    ...prev,
    contractContent: editorRef.current.innerHTML,
  }));
};

  const handleDragOver = (e) => {
    e.preventDefault(); // 드롭을 허용
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const text = e.dataTransfer.getData("text/plain");
    if (!text) return;

    // 현재 selection을 얻어 Range로 가져오기
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    // 드롭 위치에 텍스트 노드 삽입
    // 기존 내용을 삭제하지 않고 삽입하려면 deleteContents 안 함
    range.deleteContents(); // 필요시 선택 영역 삭제
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);

    // 커서를 삽입한 텍스트 뒤로 이동
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);

    // contentEditable 내부 HTML이 바뀌었으니 부모 상태에 반영
    setContractData((prev) => ({
      ...prev,
      contractContent: editorRef.current.innerHTML,
    }));
  };

  return (
    <div>
      <div className={styles.toolbar}>
        {/* 기본 스타일 버튼들 */}
        <button onClick={() => handleStyleChange("bold")}>B</button>
        <button onClick={() => handleStyleChange("italic")}>I</button>
        <button onClick={() => handleStyleChange("underline")}>U</button>
        <button onClick={() => handleStyleChange("strikeThrough")}>S</button>

        {/* 글자색 버튼 */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            onClick={() => {
              setShowTextColorPicker((prev) => !prev);
              setShowBgColorPicker(false); // 다른 패널 닫기
            }}
          >
            글자색
          </button>
          {showTextColorPicker && (
            <div className={styles.colorPicker}>
              {["#000000", "#ff0000", "#0000ff", "#00b050", "#ff9900"].map((color) => (
                <button
                  key={color}
                  style={{ backgroundColor: color, width: 20, height: 20, margin: 2 }}
                  onClick={() => {
                    handleColorChange(color);
                    setShowTextColorPicker(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* 배경색 버튼 */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            onClick={() => {
              setShowBgColorPicker((prev) => !prev);
              setShowTextColorPicker(false);
            }}
          >
            배경색
          </button>
          {showBgColorPicker && (
            <div className={styles.colorPicker}>
              {["#ffffff", "#ffff00", "#f4cccc", "#d9ead3", "#d0e0e3"].map((color) => (
                <button
                  key={color}
                  style={{ backgroundColor: color, width: 20, height: 20, margin: 2 }}
                  onClick={() => {
                    handleBgColorChange(color);
                    setShowBgColorPicker(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        ref={editorRef}
          contentEditable
          placeholder="계약 세부사항을 입력하세요"
          className={styles.editor}
          onInput={handleInput}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          spellCheck={false}
      />
    </div>
  );
};

export default DesignerContractEditor;
