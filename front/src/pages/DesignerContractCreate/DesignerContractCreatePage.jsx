import React, { useState, useEffect, useRef } from "react";
import { MdDescription } from "react-icons/md";
import DesignerContractInputSection from "../../components/DesignerContractCreate/DesignerContractInputSection";
import DesignerContractEditor from "../../components/DesignerContractCreate/DesignerContractEditor";
import DesignerContractFileUpload from "../../components/DesignerContractCreate/DesignerContractFileUpload";
import SampleClauseSidebar, { sampleTemplates } from "../../components/DesignerContractCreate/SampleClauseSidebar";
import DesignerLayout from "../../DesignerLayout";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import ContractPreview from "../../components/DesignerContractCreate/ContractPreview";

const deliverableOptions = ["상의", "아우터", "바지", "원피스", "스커트", "스니커즈", "신발", "가방",];

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

  const [contentBySection, setContentBySection] = useState({
    basic: "",
    copyright: "",
    cancellation: "",
    security: "",
    dispute: "",
    etc: "",
  });

  const [showSamplePanel, setShowSamplePanel] = useState(false);

  //체크박스시, 작성완료버튼 활성화
  const [agreeToAll, setAgreeToAll] = useState(false);

  // 작업 범위 체크박스 상태
  const [deliverables, setDeliverables] = useState([]);

  // 샘플 문구 카테고리 관리
  const [sampleCategory, setSampleCategory] = useState("");

  // 개인정보 수집 동의 체크박스 상태 추가
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const navigate = useNavigate();

  // 로컬스토리지에서 작성중인 계약서 자동 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("contractDraft");
    if (saved) {
      const parsed = JSON.parse(saved);
      setContractData(parsed.contractData || {});
      setDeliverables(parsed.deliverables || []);
    }
  }, []);

  // 작성 내용 자동 저장 (contractData, deliverables가 바뀔 때)
  useEffect(() => {
    localStorage.setItem("contractDraft", JSON.stringify({ contractData, deliverables }));
  }, [contractData, deliverables]);

  const handleSampleInsert = (text) => {
    setContractData(prev => ({
      ...prev,
      contractContent: prev.contractContent
        ? prev.contractContent + "\n" + text
        : text,
    }));
  };

  // 작성 완료 버튼 클릭 시
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

  // 작업 범위 체크박스 처리
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

  // 미리보기용 ref & 핸들러
  const componentRef = useRef();
  const [showPreview, setShowPreview] = useState(false);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: contractData.contractTitle || "계약서",
  });

  return (    
    <div
      style={{
        padding: "1.875rem", // 30px → 1.875rem
        maxWidth: "62.5rem", // 1000px → 62.5rem
        margin: "0 auto",
        marginTop: "1.25rem", // 20px → 1.25rem
        marginBottom: "1.25rem", // 20px → 1.25rem
        backgroundColor: "#fff",
        borderRadius: "0.625rem", // 10px → 0.625rem
        boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)", // 4px 8px → 0.25rem 0.5rem
      }}
    >
      <h1
        style={{
          fontSize: "1.75rem", // 28px → 1.75rem
          marginBottom: "1.875rem", // 30px → 1.875rem
          color: "#799FC4",
          display: "flex",
          alignItems: "center",
        }}
      >
        <MdDescription style={{ marginRight: "0.625rem", fontSize: "2rem" }} />
        계약서 작성
      </h1>

      {/* 계약서 기본 정보 입력 섹션 */}
      <DesignerContractInputSection 
        contractData={contractData} 
        setContractData={setContractData} 
        handleFeeChange={handleFeeChange} // 금액 입력 커스텀 핸들러 전달
      />

      <br/>
      {/* 작업 범위 체크박스 추가 */}
      <div style={{ margin: "1.5rem 0" }}>
        <hr style={{  border: "0.7px solid #E6E6E6", margin: "1.3rem 0" }} />
        <h2 style={{ fontSize: "1.4375rem", marginBottom: "1.5rem" }}> 카테고리 선택</h2>
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

      {/* 샘플 문구 탭 UI
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
          selectedCategory={sampleCategory}
        />
      )}
      </div> */}

      {/* 계약서 본문 에디터 */}
      <DesignerContractEditor
        contractData={contentBySection}
        setContractData={setContentBySection}
      />

      <br/><br/>

      {/* 파일 업로드 */}
      <DesignerContractFileUpload />

      <br/><br/>

            {/* 서명란 */}
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

      {/* 동의 체크박스 UI*/}
      <div style={{ marginBottom: "1.5rem", fontSize: "0.9rem", color: "#555" }}>
      <input
        type="checkbox"
        checked={agreeToAll}
        onChange={(e) => setAgreeToAll(e.target.checked)}
      />
      <label>
        개인정보 수집 및 이용안내(필수, 선택)에 모두 동의합니다.
      </label>
      </div>

      {/* 저장 / 취소 버튼 */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
      {/* 미리보기 버튼 */}
      <button
        onClick={() => setShowPreview(true)}
        style={{
          backgroundColor: "#f0f4f8",
          color: "#799FC4",
          padding: "0.6rem 1.5rem",
          borderRadius: "6px",
          border: "1px solid #799FC4",
          minWidth: "100px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        미리보기
      </button>

      {/* 취소 버튼 */}
      <button
        onClick={handleCancel}
        style={{
          backgroundColor: "#eee",
          color: "#999",
          padding: "0.6rem 1.5rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          minWidth: "100px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        취소
      </button>

      {/* 작성 완료 버튼 (동의 체크 여부에 따라 비활성화) */}
      <button
        onClick={handleSubmit}
        disabled={!agreeToAll} // <- 이 변수에 체크 여부가 담겨 있어야 해
        style={{
          backgroundColor: agreeToAll ? "#799FC4" : "#ccc",
          color: "#fff",
          padding: "0.6rem 1.5rem",
          borderRadius: "6px",
          border: "none",
          minWidth: "100px",
          fontWeight: "bold",
          cursor: agreeToAll ? "pointer" : "not-allowed",
          opacity: agreeToAll ? 1 : 0.6,
          transition: "background-color 0.3s ease",
        }}
      >
        작성 완료
      </button>
    </div>

      {showPreview && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              maxWidth: "100%",
              maxHeight: "90%",
              overflowY: "auto",
            }}
          >
            <ContractPreview
              ref={componentRef}
              contractData={contractData}
              contentBySection={contentBySection}
              deliverables={deliverables}
              onClose={() => setShowPreview(false)}
              onPrint={handlePrint}
            />
          </div>
        </div>
      )}
    </div>
  );
};

DesignerContractCreatePage.getLayout = function getLayout(page) {
  return <DesignerLayout>{page}</DesignerLayout>;
};

export default DesignerContractCreatePage;
