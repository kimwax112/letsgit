import React from "react";
import { MdDescription } from "react-icons/md";
import DesignerContractInputSection from "../../components/DesignerContractCreate/DesignerContractInputSection";
import DesignerContractEditor from "../../components/DesignerContractCreate/DesignerContractEditor";
import DesignerContractFileUpload from "../../components/DesignerContractCreate/DesignerContractFileUpload";

const DesignerContractCreatePage = () => {
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
          alignItems: "center", // 아이콘과 텍스트 수평 정렬
        }}
      >
        {/* 아이콘 추가 */}
        <MdDescription style={{ marginRight: "10px", fontSize: "32px" }} />
        계약서 작성
      </h1>
      <DesignerContractInputSection />
      
      {/* 계약금과 계약 내용 사이 구분선 */}
      <hr
        style={{
          border: "1px solid #E6E6E6",
          margin: "30px 0", // 간격을 주어 구분선 위아래로 여백
        }}
      />
      
      <div style={{ margin: "40px 0" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>계약 내용</h2>
        <DesignerContractEditor />
      </div>

      {/* 계약 내용과 첨부 파일 사이 구분선 */}
      <hr
        style={{
          border: "1px solid #E6E6E6",
          margin: "30px 0", // 간격을 주어 구분선 위아래로 여백
        }}
      />

      <div>
        <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>첨부 파일</h2>
        <DesignerContractFileUpload />
      </div>

      {/* 버튼 추가 */}
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
          onClick={() => alert("작성 완료")}
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
          onClick={() => alert("작성 취소")}
        >
          작성 취소
        </button>
      </div>
    </div>
  );
};

export default DesignerContractCreatePage;
