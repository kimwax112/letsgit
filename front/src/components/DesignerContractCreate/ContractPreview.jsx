import React, { forwardRef } from "react";

// 미리보기 컴포넌트 (forwardRef로 ReactToPrint와 연동 가능)
const ContractPreview = forwardRef(({ contractData, deliverables, contentBySection }, ref) => {
  const today = new Date().toLocaleDateString();

  return (
    <div ref={ref} style={{ padding: "20px", fontFamily: "Arial, sans-serif", color: "#333" }}>
      <h2 style={{ borderBottom: "2px solid #799FC4", paddingBottom: "0.5rem" }}>계약서 미리보기</h2>

      <p><strong>의뢰제목:</strong> {contractData.contractTitle || "미입력"}</p>
      <p><strong>계약인 (의뢰인):</strong> {contractData.clientId || "미입력"}</p>
      <p><strong>계약 기간:</strong> {contractData.startDate || "미입력"} ~ {contractData.endDate || "미입력"}</p>
      <p><strong>계약금:</strong> {contractData.requestFee ? `${contractData.requestFee} 원` : "미입력"}</p>
      <p><strong>카테고리:</strong> {deliverables.length > 0 ? deliverables.join(", ") : "미선택"}</p>

      <div style={{ marginTop: "1.5rem" }}>
        <strong>계약서 항목:</strong>
        {Object.entries(contentBySection).map(([section, text]) => (
          <div key={section} style={{ marginTop: "1rem", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <h4 style={{ textTransform: "capitalize", borderBottom: "1px solid #ddd" }}>{section}</h4>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {text || "내용 없음"}
            </pre>
          </div>
        ))}
      </div>

      <p style={{ marginTop: "2rem" }}><strong>서명:</strong> {contractData.signature || "미입력"}</p>

      <p style={{ textAlign: "right", marginTop: "3rem", fontSize: "0.85rem", color: "#999" }}>
        작성일: {today}
      </p>
    </div>
  );
});

export default ContractPreview;
