import React, { useState, useEffect, useRef } from "react";
import { MdDescription } from "react-icons/md";
import DesignerContractInputSection from "../../components/DesignerContractCreate/DesignerContractInputSection";
import DesignerContractEditor from "../../components/DesignerContractCreate/DesignerContractEditor";
import DesignerContractFileUpload from "../../components/DesignerContractCreate/DesignerContractFileUpload";
import DesignerLayout from "../../DesignerLayout";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const sampleTemplates = [
  "의뢰인은 계약된 일정에 따라 제작 결과물을 전달받을 수 있습니다.",
  "디자이너는 의뢰인의 요구사항을 성실히 반영하며 작업을 진행합니다.",
  "계약 기간 동안 계약 내용을 무단 변경할 수 없습니다.",
  "요청 비용은 계약서에 명시된 금액을 기준으로 합니다.",
  "양측의 합의 없이는 계약을 해지할 수 없습니다.",
];

// 추가 샘플 카테고리별 샘플 문구
const rightsSamples = [
  "디자인 저작권은 디자이너에게 귀속됩니다.",
  "의뢰인은 디자인의 2차 가공 시 디자이너의 동의를 받아야 합니다.",
];
const cancelSamples = [
  "계약 변경 시 최소 7일 전에 서면으로 통보해야 합니다.",
  "계약 해지 시 위약금 20%를 지불해야 합니다.",
];
const securitySamples = [
  "양측은 계약 관련 정보를 외부에 공개하지 않으며 비밀을 유지합니다.",
  "보안 위반 시 법적 책임을 질 수 있습니다.",
];
const disputeSamples = [
  "분쟁 발생 시 상호 협의를 우선으로 하며, 해결되지 않으면 중재 기관에 의뢰합니다.",
];

const deliverableOptions = ["상의", "아우터", "바지", "원피스", "스커트", "스니커즈", "신발", "가방",];

const ComponentToPrint = React.forwardRef(({ contractData, deliverables }, ref) => (
  <div ref={ref} style={{ padding: "1rem", fontFamily: "Arial, sans-serif", color: "#000" }}>
    <h1 style={{ textAlign: "center" }}>계약서 미리보기</h1>
    <h2>계약 제목: {contractData.contractTitle}</h2>
    <p><strong>계약 기간:</strong> {contractData.startDate} ~ {contractData.endDate || "미정"}</p>
    <p><strong>요청 비용:</strong> {contractData.requestFee} 원</p>
    <p><strong>작업 범위:</strong> {deliverables.length > 0 ? deliverables.join(", ") : "없음"}</p>
    <hr />
    <div style={{ whiteSpace: "pre-wrap", marginBottom: "1rem" }}>
      {contractData.contractContent}
    </div>
    <hr />
    <p><strong>서명:</strong> {contractData.signature || "(서명 없음)"}</p>
  </div>
));

const DesignerContractCreatePage = () => {
  const [contractData, setContractData] = useState({
    requestId: "",
    designerId: "", // 로그인한 사용자의 ID로 설정
    startDate: "",
    endDate: "",
    requestFee: "",
    status: "미수신", // 기본 진행중
    clientId: "",
    contractTitle: "",
    starredStatus: 0,
    contractContent: "", // 에디터 작성 내용
    signature: "",
  });

  // 작업 범위 체크박스 상태
  const [deliverables, setDeliverables] = useState([]);

  // 샘플 문구 카테고리 관리
  const [sampleCategory, setSampleCategory] = useState("basic"); // 기본은 기존 샘플문구

  // 개인정보 수집 동의 체크박스 상태 추가
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const navigate = useNavigate();

  // 로컬스토리지에서 사용자 ID 가져오기
  useEffect(() => {
    const id = localStorage.getItem("id"); // 로컬 스토리지에서 userId 가져오기
    if (id) {
      setContractData(prevData => ({
        ...prevData,
        designerId: id, // designerId를 로그인한 사용자 ID로 설정
      }));
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login"); // 로그인 페이지로 리디렉션
    }
  }, [navigate]);

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
          requestFee, // 숫자로 변환한 값 전달
          deliverables,
        }),
      });

      if (response.ok) {
        alert("작성 완료! 계약서가 저장되었습니다.");
        localStorage.removeItem("contractDraft"); // 저장된 초안 삭제
        navigate('/designer/DesignerContractManage');
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
        designerId: "", // 취소 시에도 designerId 초기화
        startDate: "",
        endDate: "",
        requestFee: "",
        status: "미수신",
        clientId: "",
        contractTitle: "",
        starredStatus: 0,
        contractContent: "",
        signature: "",
      });
      setDeliverables([]);
      localStorage.removeItem("contractDraft");
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

  // 금액 입력 콤마 자동 포맷팅
  const formatNumberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleFeeChange = (e) => {
    // 입력값 콤마 제거 후 숫자만 다시 포맷
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(value) || value === "") {
      setContractData(prev => ({
        ...prev,
        requestFee: value === "" ? "" : formatNumberWithCommas(value),
      }));
    }
  };

  // PDF 미리보기용 ref & 핸들러
  const componentRef = useRef();
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

      {/* 작업 범위 체크박스 추가 */}
      <div style={{ margin: "1.5rem 0" }}>
        <hr style={{ border: "1px solid #E6E6E6", marginBottom: "1rem" }} />
        <h2 style={{ fontSize: "1.4375rem", marginBottom: "0.75rem" }}>작업 범위 (Deliverables)</h2>
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

      <hr style={{ border: "1px solid #E6E6E6", margin: "1.5rem 0" }} />

      {/* 샘플 문구 탭 UI */}
      <div>
        <h2 style={{ fontSize: "1.4375rem", marginBottom: "0.75rem" }}>샘플 문구 삽입</h2>
        <div style={{ marginBottom: "1rem" }}>
          <button
            style={{ marginRight: "0.5rem", padding: "0.5rem 1rem", cursor: "pointer", backgroundColor: sampleCategory === "basic" ? "#799FC4" : "#ccc", border: "none", borderRadius: "5px", color: "#fff" }}
            onClick={() => setSampleCategory("basic")}
          >
            기본
          </button>
          <button
            style={{ marginRight: "0.5rem", padding: "0.5rem 1rem", cursor: "pointer", backgroundColor: sampleCategory === "rights" ? "#799FC4" : "#ccc", border: "none", borderRadius: "5px", color: "#fff" }}
            onClick={() => setSampleCategory("rights")}
          >
            권리
          </button>
          <button
            style={{ marginRight: "0.5rem", padding: "0.5rem 1rem", cursor: "pointer", backgroundColor: sampleCategory === "cancel" ? "#799FC4" : "#ccc", border: "none", borderRadius: "5px", color: "#fff" }}
            onClick={() => setSampleCategory("cancel")}
          >
            변경/해지
          </button>
          <button
            style={{ marginRight: "0.5rem", padding: "0.5rem 1rem", cursor: "pointer", backgroundColor: sampleCategory === "security" ? "#799FC4" : "#ccc", border: "none", borderRadius: "5px", color: "#fff" }}
            onClick={() => setSampleCategory("security")}
          >
            보안
          </button>
          <button
            style={{ padding: "0.5rem 1rem", cursor: "pointer", backgroundColor: sampleCategory === "dispute" ? "#799FC4" : "#ccc", border: "none", borderRadius: "5px", color: "#fff" }}
            onClick={() => setSampleCategory("dispute")}
          >
            분쟁
          </button>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          {(sampleCategory === "basic" ? sampleTemplates
            : sampleCategory === "rights" ? rightsSamples
            : sampleCategory === "cancel" ? cancelSamples
            : sampleCategory === "security" ? securitySamples
            : disputeSamples
          ).map((text, idx) => (
            <button
              key={idx}
              onClick={() => handleSampleInsert(text)}
              title={text}
              style={{
                marginRight: "0.5rem",
                marginBottom: "0.5rem",
                padding: "0.4rem 0.8rem",
                cursor: "pointer",
                backgroundColor: "#799FC4",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontSize: "0.9rem",
              }}
              type="button"
            >
              {text.length > 20 ? text.slice(0, 20) + "..." : text}
            </button>
          ))}
        </div>
      </div>

      {/* 계약서 본문 에디터 */}
      <DesignerContractEditor
        contractData={contractData}
        setContractData={setContractData}
      />

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

      {/* 파일 업로드 */}
      <DesignerContractFileUpload />

      <hr style={{ border: "1px solid #E6E6E6", marginBottom: "1rem" }} />

      {/* 동의 체크박스 UI*/}
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

      {/* 저장 / 취소 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "2rem",
          gap: "1rem",
        }}
      >
        <button
          onClick={handleCancel}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#f0f0f0", // 완전 흰색 대신 연한 회색으로 변경
            color: "#333",
          }}
          type="button"
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
          type="button"
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
