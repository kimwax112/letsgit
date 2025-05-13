import React, { useRef, useEffect } from "react";

import styles from "./DesignerContractCreate.module.css";

const DesignerContractEditor = ({ contractData, setContractData }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const handleInput = () => {
      const htmlContent = editorRef.current.innerHTML;
      setContractData(prev => ({
        ...prev,
        contractContent: htmlContent,
      }));
    };

    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("input", handleInput);
    }

    return () => {
      if (editor) {
        editor.removeEventListener("input", handleInput);
      }
    };
  }, [setContractData]);

  // 텍스트 스타일 변경 함수
  const handleStyleChange = (style) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0); // 선택된 범위

    // 선택된 범위가 텍스트 노드인지 확인
    if (range.startContainer.nodeType === 3) { // 텍스트 노드일 때만
      const selectedText = range.toString(); // 선택된 텍스트

      // 선택된 텍스트에 스타일 적용
      const span = document.createElement("span");

      // 스타일에 따라 span에 스타일 적용
      if (style === "bold") {
        span.style.fontWeight = "bold";
      } else if (style === "italic") {
        span.style.fontStyle = "italic";
      } else if (style === "underline") {
        span.style.textDecoration = "underline";
      } else if (style === "strikeThrough") {
        span.style.textDecoration = "line-through";
      }

      span.style.color = "black"; // 기본 글자색을 검정색으로 고정

      // 기존 텍스트를 span으로 대체
      range.deleteContents();
      span.textContent = selectedText;
      range.insertNode(span);
    }
  };

  // 글자색 변경 함수
  const handleColorChange = (color) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    if (range.startContainer.nodeType === 3) { // 텍스트 노드일 때만
      const span = document.createElement("span");
      span.style.color = color;

      const selectedText = range.toString();
      span.textContent = selectedText;

      range.deleteContents();
      range.insertNode(span);
    }
  };

  // 배경색 변경 함수
  const handleBgColorChange = (color) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    if (range.startContainer.nodeType === 3) { // 텍스트 노드일 때만
      const span = document.createElement("span");
      span.style.backgroundColor = color;

      const selectedText = range.toString();
      span.textContent = selectedText;

      range.deleteContents();
      range.insertNode(span);
    }
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <button
          onClick={() => handleStyleChange("bold")}
          className={styles.boldButton}
        >
          B
        </button>
        <button
          onClick={() => handleStyleChange("italic")}
          className={styles.italicButton}
        >
          I
        </button>
        <button
          onClick={() => handleStyleChange("underline")}
          className={styles.underlineButton}
        >
          U
        </button>
        <button
          onClick={() => handleStyleChange("strikeThrough")}
          className={styles.strikeButton}
        >
          S
        </button>
        <button onClick={() => handleColorChange("#ff0000")}>Red</button>
        <button onClick={() => handleBgColorChange("#ffff00")}>Yellow BG</button>
        <select onChange={(e) => handleStyleChange("fontSize")} defaultValue="16">
          <option value="16">16px</option>
          <option value="18">18px</option>
          <option value="20">20px</option>
        </select>
      </div>
      <div
        ref={editorRef}
        contentEditable
        placeholder="계약 세부사항을 입력하세요"
        className={styles.editor}
      />
    </div>
  );
};

export default DesignerContractEditor;
