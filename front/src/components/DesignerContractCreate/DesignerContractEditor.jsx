import React, { useRef, useEffect } from "react";
import styles from "./DesignerContractCreate.module.css";

const DesignerContractEditor = ({ contractData, setContractData }) => {
  const editorRef = useRef(null);

  // 부모 상태(contractContent)가 바뀔 때 에디터 내용 동기화
  useEffect(() => {
    if (
      editorRef.current &&
      editorRef.current.innerText !== (contractData.contractContent || "")
    ) {
      editorRef.current.innerText = contractData.contractContent || "";
    }
  }, [contractData.contractContent]);

  // contentEditable 변경 시 부모 상태 업데이트
  const handleInput = () => {
    setContractData((prev) => ({
      ...prev,
      contractContent: editorRef.current.innerText,
    }));
  };

  // 텍스트 스타일 변경 함수
  const handleStyleChange = (style) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    if (range.startContainer.nodeType === 3) {
      const selectedText = range.toString();
      if (!selectedText) return;

      const span = document.createElement("span");

      if (style === "bold") {
        span.style.fontWeight = "bold";
      } else if (style === "italic") {
        span.style.fontStyle = "italic";
      } else if (style === "underline") {
        span.style.textDecoration = "underline";
      } else if (style === "strikeThrough") {
        span.style.textDecoration = "line-through";
      }

      span.style.color = "black";

      range.deleteContents();
      span.textContent = selectedText;
      range.insertNode(span);

      // 스타일 변경 후 부모 상태 업데이트
      setContractData((prev) => ({
        ...prev,
        contractContent: editorRef.current.innerText,
      }));
    }
  };

  // 글자색 변경 함수
  const handleColorChange = (color) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    if (range.startContainer.nodeType === 3) {
      const selectedText = range.toString();
      if (!selectedText) return;

      const span = document.createElement("span");
      span.style.color = color;
      span.textContent = selectedText;

      range.deleteContents();
      range.insertNode(span);

      setContractData((prev) => ({
        ...prev,
        contractContent: editorRef.current.innerText,
      }));
    }
  };

  // 배경색 변경 함수
  const handleBgColorChange = (color) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    if (range.startContainer.nodeType === 3) {
      const selectedText = range.toString();
      if (!selectedText) return;

      const span = document.createElement("span");
      span.style.backgroundColor = color;
      span.textContent = selectedText;

      range.deleteContents();
      range.insertNode(span);

      setContractData((prev) => ({
        ...prev,
        contractContent: editorRef.current.innerText,
      }));
    }
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <button
          onClick={() => handleStyleChange("bold")}
          className={styles.boldButton}
          type="button"
        >
          B
        </button>
        <button
          onClick={() => handleStyleChange("italic")}
          className={styles.italicButton}
          type="button"
        >
          I
        </button>
        <button
          onClick={() => handleStyleChange("underline")}
          className={styles.underlineButton}
          type="button"
        >
          U
        </button>
        <button
          onClick={() => handleStyleChange("strikeThrough")}
          className={styles.strikeButton}
          type="button"
        >
          S
        </button>
        <button onClick={() => handleColorChange("#ff0000")} type="button">
          Red
        </button>
        <button onClick={() => handleBgColorChange("#ffff00")} type="button">
          Yellow BG
        </button>
        {/* 폰트 크기 변경은 필요하면 추가 구현 가능 */}
      </div>
      <div
        ref={editorRef}
        contentEditable
        placeholder="계약 세부사항을 입력하세요"
        className={styles.editor}
        onInput={handleInput}
        spellCheck={false}
      />
    </div>
  );
};

export default DesignerContractEditor;
