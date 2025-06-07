import React, { useRef, useEffect, useState } from "react";
import styles from "./DesignerContractCreate.module.css";
import SampleClauseSidebar, { sampleTemplates } from "../../components/DesignerContractCreate/SampleClauseSidebar";

const sectionTitles = {
  basic: "기본",
  copyright: "저작권",
  cancellation: "취소",
  security: "보안",
  dispute: "분쟁",
  etc: "추가 작성란",
};

const DesignerContractEditor = ({ contractData, setContractData }) => {
  const refs = {
    basic: useRef(null),
    copyright: useRef(null),
    cancellation: useRef(null),
    security: useRef(null),
    dispute: useRef(null),
    etc: useRef(null),
  };

  const [showSamplePanel, setShowSamplePanel] = useState(false);
  const [sampleCategory, setSampleCategory] = useState("");

  const handleSampleInsert = (category, text) => {
    setContentBySection(prev => ({
      ...prev,
      [category]: prev[category] ? prev[category] + "\n" + text : text,
    }));
  };

  const [contentBySection, setContentBySection] = useState({
    basic: contractData.contractContentBySection?.basic || "",
    copyright: contractData.contractContentBySection?.copyright || "",
    cancellation: contractData.contractContentBySection?.cancellation || "",
    security: contractData.contractContentBySection?.security || "",
    dispute: contractData.contractContentBySection?.dispute || "",
    etc: contractData.contractContentBySection?.etc || "",
  });

  useEffect(() => {
    if (contractData.contractContentBySection) {
      setContentBySection(contractData.contractContentBySection);
    }
  }, [contractData.contractContentBySection]);

  const updateContent = (section, html) => {
    setContentBySection((prev) => {
      const updated = { ...prev, [section]: html };
      setContractData((prevParent) => ({
        ...prevParent,
        contractContentBySection: updated,
      }));
      return updated;
    });
  };

  const handleInput = (section) => {
    if (!refs[section].current) return;
    updateContent(section, refs[section].current.innerHTML);
  };

  const handleStyleChange = (section, style) => {
    if (!refs[section].current) return;
    refs[section].current.focus();

    // etc(추가 작성란)은 모든 스타일 허용
    // 기본 섹션은 bold, italic, underline만 허용
    const allowedStylesForBasic = ["bold", "italic", "underline"];

    if (section !== "etc" && !allowedStylesForBasic.includes(style)) {
      return; // 취소: 기본 섹션에서 strikeThrough 등 제한
    }

    switch (style) {
      case "bold":
        document.execCommand("bold");
        break;
      case "italic":
        document.execCommand("italic");
        break;
      case "underline":
        document.execCommand("underline");
        break;
      case "strikeThrough":
        document.execCommand("strikeThrough");
        break;
      default:
        break;
    }

    updateContent(section, refs[section].current.innerHTML);
  };

  const handleInsertText = (section, text) => {
  const editor = refs[section]?.current;
  if (!editor) return;

  editor.focus();

  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const textNode = document.createTextNode(text);
  range.deleteContents();
  range.insertNode(textNode);

  // 커서 위치 업데이트
  range.setStartAfter(textNode);
  range.setEndAfter(textNode);
  selection.removeAllRanges();
  selection.addRange(range);

  updateContent(section, editor.innerHTML);
};

  const handleColorChange = (section, color) => {
    if (section !== "etc") return; // 자유 작성란 외엔 색상 변경 제한
    if (!refs[section].current) return;
    refs[section].current.focus();
    document.execCommand("foreColor", false, color);
    updateContent(section, refs[section].current.innerHTML);
  };

  const handleBgColorChange = (section, color) => {
    if (section !== "etc") return; // 자유 작성란 외엔 배경색 변경 제한
    if (!refs[section].current) return;
    refs[section].current.focus();
    document.execCommand("backColor", false, color);
    updateContent(section, refs[section].current.innerHTML);
  };

  const handleFontSizeChange = (section, sizePx) => {
    if (section !== "etc") return; // 자유 작성란 외엔 폰트 크기 변경 제한
    if (!refs[section].current) return;
    refs[section].current.focus();

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    if (!range.toString()) return;

    const span = document.createElement("span");
    span.style.fontSize = sizePx + "px";
    span.textContent = range.toString();

    range.deleteContents();
    range.insertNode(span);

    updateContent(section, refs[section].current.innerHTML);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, section) => {
    e.preventDefault();

    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;

    let parsed;
    try {
      parsed = JSON.parse(data);
    } catch {
      parsed = { text: data };
    }

    const { text } = parsed;

    const editor = refs[section].current;
    if (!editor) return;

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(text || "");
    range.insertNode(textNode);

    range.setStartAfter(textNode);
    range.setEndAfter(textNode);

    selection.removeAllRanges();
    selection.addRange(range);

    updateContent(section, editor.innerHTML);
  };

  return (
    <div>
      {Object.keys(sectionTitles).map((section) => (
        <div key={section} style={{ marginBottom: "2rem" }}>
          <h3>{sectionTitles[section]}</h3>

          {/* 기본 섹션은 굵게, 기울임, 밑줄만
          {section !== "etc" && (
            <div className={styles.toolbar} style={{ marginBottom: "0.5rem" }}>
              <button onClick={() => handleStyleChange(section, "bold")}>
                B
              </button>
              <button onClick={() => handleStyleChange(section, "italic")}>
                I
              </button>
              <button onClick={() => handleStyleChange(section, "underline")}>
                U
              </button>
            </div>
          )} */}

            {section !== "etc" && (
              <div>
                <button
                  onClick={() => {
                    setSampleCategory(section); // 클릭한 버튼의 섹션으로 설정
                    setShowSamplePanel(true);   // 사이드바 열기
                  }}
                  style={{
                    backgroundColor: "#799FC4",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    borderRadius: "5px",
                    border: "none",
                    marginBottom: "10px"
                  }}
                >
                  샘플 문구 보기
                </button>
                {showSamplePanel && (
                <SampleClauseSidebar
                  onInsert={handleSampleInsert}
                  onClose={() => setShowSamplePanel(false)}
                  selectedCategory={sampleCategory}
                />
              )}
              </div>
            )}


          {/* 자유 작성란(etc)만 전체 스타일 도구 */}
          {section === "etc" && (
            <div className={styles.toolbar} style={{ marginBottom: "0.5rem" }}>
              <button onClick={() => handleStyleChange(section, "bold")}>
                B
              </button>
              <button onClick={() => handleStyleChange(section, "italic")}>
                I
              </button>
              <button onClick={() => handleStyleChange(section, "underline")}>
                U
              </button>
              <button onClick={() => handleStyleChange(section, "strikeThrough")}>
                S
              </button>

              <select
                onChange={(e) => handleColorChange(section, e.target.value)}
                defaultValue=""
                style={{ marginLeft: "1rem" }}
              >
                <option value="" disabled>
                  글자색 선택
                </option>
                <option value="#000000">검정</option>
                <option value="#ff0000">빨강</option>
                <option value="#0000ff">파랑</option>
                <option value="#00b050">초록</option>
                <option value="#ff9900">주황</option>
              </select>

              <select
                onChange={(e) => handleBgColorChange(section, e.target.value)}
                defaultValue=""
                style={{ marginLeft: "1rem" }}
              >
                <option value="" disabled>
                  배경색 선택
                </option>
                <option value="#ffffff">하양</option>
                <option value="#ffff00">노랑</option>
                <option value="#f4cccc">분홍</option>
                <option value="#d9ead3">연두</option>
                <option value="#d0e0e3">하늘</option>
              </select>

              <select
                onChange={(e) => handleFontSizeChange(section, e.target.value)}
                defaultValue=""
                style={{ marginLeft: "1rem" }}
              >
                <option value="" disabled>
                  글자 크기
                </option>
                <option value="12">12px</option>
                <option value="14">14px</option>
                <option value="16">16px</option>
                <option value="18">18px</option>
                <option value="20">20px</option>
                <option value="24">24px</option>
              </select>
            </div>
          )}

          <div
            ref={refs[section]}
            contentEditable
            placeholder={`${sectionTitles[section]} 내용을 입력하세요`}
            className={styles.editor}
            onBlur={() => handleInput(section)}  //사용자가 입력 다 하고 포커스 이동할 때만 처리됨.
            onDrop={(e) => handleDrop(e, section)}
            onDragOver={handleDragOver}
            spellCheck={false}
            dangerouslySetInnerHTML={{ __html: contentBySection[section] }}
            style={{
              border: "1px solid #ccc",
              minHeight: "120px",
              padding: "0.5rem",
              borderRadius: "4px",
              overflowY: "auto",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DesignerContractEditor;
