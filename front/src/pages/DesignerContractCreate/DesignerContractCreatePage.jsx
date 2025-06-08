import React, { useState, useRef } from "react";
import { MdDescription } from "react-icons/md";
import DesignerContractInputSection from "../../components/DesignerContractCreate/DesignerContractInputSection";
import DesignerContractEditor from "../../components/DesignerContractCreate/DesignerContractEditor";
import DesignerContractFileUpload from "../../components/DesignerContractCreate/DesignerContractFileUpload";
import SampleClauseSidebar from "../../components/DesignerContractCreate/SampleClauseSidebar";
import DesignerLayout from "../../DesignerLayout";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const deliverableOptions = ["상의", "아우터", "바지", "원피스", "스커트", "스니커즈", "신발", "가방"];

const DesignerContractCreatePage = ({ username, clientId }) => {
  const [contractData, setContractData] = useState({
    requestId: "",
    designerId: username || "", // 상위에서 전달받은 사용자 이름
    startDate: "",
    endDate: "",
    requestFee: "",
    status: "미수신",
    clientId: clientId || "", // 상위에서 전달받음
    contractTitle: "",
    starredStatus: 0,
    contractContent: "",
    signature: "",
  });

  const [deliverables, setDeliverables] = useState([]);
  const [showSamplePanel, setShowSamplePanel] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const navigate = useNavigate();

  const handleSampleInsert = (text) => {
    setContractData(prev => ({
      ...prev,
      contractContent: prev.contractContent
        ? prev.contractContent + "\n" + text
        : text,
    }));
  };

  const handleSubmit = async () => {
    if (!contractData.contractTitle || !contractData.startDate || !contractData.requestFee) {
      alert("계약 제목, 마감일, 요청 비용을 모두 입력해주세요.");
      return;
    }

    const requestFee = Number(contractData.requestFee.replace(/,/g, ""));
    if (isNaN(requestFee)) {
      alert("유효한 요청 비용을 입력해주세요.");
      return;
    }

    if (!contractData.signature) {
      alert("서명을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/client/contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...contractData,
          requestFee,
          deliverables,
        }),
      });

      if (response.ok) {
        alert("작성 완료! 계약서가 저장되었습니다.");
        navigate("/designer/DesignerContractManage");
      } else {
        alert("작성 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("작성 중 오류 발생:", error);
      alert("작성 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("정말 작성 취소하시겠습니까?")) {
      setContractData({
        requestId: "",
        designerId: username || "",
        startDate: "",
        endDate: "",
        requestFee: "",
        status: "미수신",
        clientId: clientId || "",
        contractTitle: "",
        starredStatus: 0,
        contractContent: "",
        signature: "",
      });
      setDeliverables([]);
    }
  };

  const handleDeliverableChange = (item) => {
    if (deliverables.includes(item)) {
      setDeliverables(deliverables.filter(d => d !== item));
    } else {
      setDeliverables([...deliverables, item]);
    }
  };

  const formatNumberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleFeeChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(value) || value === "") {
      setContractData(prev => ({
        ...prev,
        requestFee: value === "" ? "" : formatNumberWithCommas(value),
      }));
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: contractData.contractTitle || "계약서",
  });

  return (
    <div style={{ padding: "1.875rem", maxWidth: "62.5rem", margin: "0 auto", marginTop: "1.25rem", marginBottom: "1.25rem", backgroundColor: "#fff", borderRadius: "0.625rem", boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)" }}>
      <h1 style={{ fontSize: "1.75rem", marginBottom: "1.875rem", color: "#799FC4", display: "flex", alignItems: "center" }}>
        <MdDescription style={{ marginRight: "0.625rem", fontSize: "2rem" }} />
        계약서 작성
      </h1>

      <DesignerContractInputSection
        contractData={contractData}
        setContractData={setContractData}
        handleFeeChange={handleFeeChange}
      />

      <div style={{ margin: "1.5rem 0" }}>
        <hr style={{ border: "0.7px solid #E6E6E6", margin: "1.3rem 0" }} />
        <h2 style={{ fontSize: "1.4375rem", marginBottom: "1.5rem" }}>카테고리 선택</h2>
        {deliverableOptions.map((item, idx) => (
          <label key={idx} style={{ marginRight: "1rem", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={deliverables.includes(item)}
              onChange={() => handleDeliverableChange(item)}
              style={{ marginRight: "0.25rem" }}
            />
            {item}
          </label>
        ))}
      </div>

      <hr style={{ border: "1px solid #E6E6E6", margin: "1.3rem 0" }} />

      <div>
        <h2 style={{ fontSize: "1.4375rem", marginBottom: "1.5rem" }}>샘플 문구 삽입</h2>
        <button
          onClick={() => setShowSamplePanel(true)}
          style={{ backgroundColor: "#799FC4", color: "#fff", padding: "0.5rem 1rem", borderRadius: "5px", border: "none" }}
        >
          샘플 문구 보기
        </button>
        {showSamplePanel && (
          <SampleClauseSidebar
            onInsert={handleSampleInsert}
            onClose={() => setShowSamplePanel(false)}
          />
        )}
      </div>

      <hr style={{ border: "1px solid #E6E6E6", margin: "1.3rem 0" }} />

      <DesignerContractEditor contractData={contractData} setContractData={setContractData} />

      <DesignerContractFileUpload />

      <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <label htmlFor="signature" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
          서명 (이름 입력)
        </label>
        <input
          type="text"
          id="signature"
          placeholder="서명 입력 (이름)"
          value={contractData.signature}
          onChange={e => setContractData({ ...contractData, signature: e.target.value })}
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <hr style={{ border: "1px solid #E6E6E6", marginBottom: "1rem" }} />

      <div style={{ marginBottom: "1.5rem", fontSize: "0.9rem", color: "#555" }}>
        <label style={{ cursor: "pointer", userSelect: "none" }}>
          <input
            type="checkbox"
            checked={agreePrivacy}
            onChange={() => setAgreePrivacy(!agreePrivacy)}
            style={{ marginRight: "0.5rem" }}
          />
          개인정보 수집 및 이용안내(필수, 선택)에 모두 동의합니다.
        </label>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem", gap: "1rem" }}>
        <button
          onClick={handleCancel}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#f0f0f0",
            color: "#333",
          }}
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          disabled={!agreePrivacy}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            cursor: agreePrivacy ? "pointer" : "not-allowed",
            borderRadius: "4px",
            border: "none",
            backgroundColor: agreePrivacy ? "#799FC4" : "#ccc",
            color: "#fff",
          }}
        >
          작성 완료
        </button>
      </div>
    </div>
  );
};

DesignerContractCreatePage.getLayout = function getLayout(page) {
  return <DesignerLayout>{page}</DesignerLayout>;
};

export default DesignerContractCreatePage;
