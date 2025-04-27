import React from "react";
import DesignerContractSidebar from "../../components/DesignerContract/DesignerContractSidebar/DesignerContractSidebar";
import DesignerContractSearchAndFilter from "../../components/DesignerContract/DesignerContractSearchAndFilter/DesignerContractSearchAndFilter";
import DesignerContractSortAndCreate from "../../components/DesignerContract/DesignerContractSortAndCreate/DesignerContractSortAndCreate";
import DesignerContractList from "../../components/DesignerContract/DesignerContractList/DesignerContractList";

const DesignerContractManagePage = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* 왼쪽 사이드바 */}
      <DesignerContractSidebar />

      {/* 오른쪽 본문 */}
      <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
        {/* 제목 */}
        <h1 style={{ fontSize: "24px", marginBottom: "20px", color: "#799FC4" }}>계약서 조회</h1>

        {/* 검색 및 필터 */}
        <DesignerContractSearchAndFilter />

        <hr/>

        {/* 정렬 및 신규 생성 버튼 */}
        <DesignerContractSortAndCreate />

        {/* 계약서 리스트 */}
        <DesignerContractList />
      </div>
    </div>
  );
};

export default DesignerContractManagePage;
