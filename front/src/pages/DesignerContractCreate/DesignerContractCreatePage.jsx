import React, { useState } from "react";
import { MdDescription } from "react-icons/md";
import DesignerContractInputSection from "../../components/DesignerContractCreate/DesignerContractInputSection";
import DesignerContractEditor from "../../components/DesignerContractCreate/DesignerContractEditor";
import DesignerContractFileUpload from "../../components/DesignerContractCreate/DesignerContractFileUpload";
import DesignerLayout from "../../DesignerLayout";
import { useNavigate } from "react-router-dom";

const DesignerContractCreatePage = () => {
  const [contractData, setContractData] = useState({
    requestId: "",
    designerId: "designer001", // 로그인 없이도 이 값으로 설정하여 진행
    startDate: "",
    endDate: "",
    requestFee: "",
    status: "진행중", // 기본 진행중
    clientId: "",
    contractTitle: "",
    starredStatus: 0,
    contractContent: "", // 에디터 작성 내용
  });
   const navigate = useNavigate();
  // 작성 완료 버튼 클릭 시
  const handleSubmit = async () => {
    if (!contractData.contractTitle || !contractData.startDate || !contractData.requestFee) {
      alert("계약 제목, 마감일, 요청 비용을 모두 입력해주세요.");
      return;
    }

    const requestFee = Number(contractData.requestFee);
    if (isNaN(requestFee)) {
      alert("유효한 요청 비용을 입력해주세요.");
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
        }),
      });

      if (response.ok) {
        alert("작성 완료! 계약서가 저장되었습니다.");
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
        designerId: "designer001", // 로그인하지 않아도 임시값 사용
        startDate: "",
        endDate: "",
        requestFee: "",
        status: "진행중",
        clientId: "",
        contractTitle: "",
        starredStatus: 0,
        contractContent: "",
      });
    }
  };

  return (    
    <div
      style={{
        padding: "30px",
        maxWidth: "1000px",
        margin: "0 auto",
        marginTop: "20px",
        marginBottom: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          marginBottom: "30px",
          color: "#799FC4",
          display: "flex",
          alignItems: "center",
        }}
      >
        <MdDescription style={{ marginRight: "10px", fontSize: "32px" }} />
        계약서 작성
      </h1>

      {/* 계약서 기본 정보 입력 섹션 */}
      <DesignerContractInputSection contractData={contractData} setContractData={setContractData} />

      <hr style={{ border: "1px solid #E6E6E6", margin: "30px 0" }} />

      {/* 계약 내용 에디터 */}
      <div style={{ margin: "40px 0" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>계약 내용</h2>
        <DesignerContractEditor contractData={contractData} setContractData={setContractData} />
      </div>

      <hr style={{ border: "1px solid #E6E6E6", margin: "30px 0" }} />

      {/* 파일 업로드 (선택사항) */}
      <div>
        <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>첨부 파일</h2>
        <DesignerContractFileUpload />
      </div>

      {/* 작성 완료 / 취소 버튼 */}
      <div style={{ marginTop: "30px", display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{
            width: "10rem",
            padding: "10px 20px",
            backgroundColor: "#799FC4",
            color: "white",
            border: "none",
            borderRadius: "20px",
            marginRight: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
          onClick={handleSubmit}
        >
          작성 완료
        </button>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#E6E6E6",
            color: "#707070",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
          }}
          onClick={handleCancel}
        >
          작성 취소
        </button>
      </div>
    </div>
    
  );
};

export default DesignerContractCreatePage;
