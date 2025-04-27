import React from "react";
import { MdDescription } from "react-icons/md";  // 아이콘 추가
import DesignerContractSidebar from "../../components/DesignerContract/DesignerContractSidebar/DesignerContractSidebar";
import DesignerContractSearchAndFilter from "../../components/DesignerContract/DesignerContractSearchAndFilter/DesignerContractSearchAndFilter";
import DesignerContractSortAndCreate from "../../components/DesignerContract/DesignerContractSortAndCreate/DesignerContractSortAndCreate";
import DesignerContractList from "../../components/DesignerContract/DesignerContractList/DesignerContractList";
import "./DesignerContractManagePage.css";

const DesignerContractManagePage = () => {
  return (
    <div className="page-wrapper">
      {/* 왼쪽 사이드바 */}
      <DesignerContractSidebar />

      {/* 오른쪽 본문 */}
      <div className="main-content">
        {/* 제목 */}
        <h1 className="page-header" style={{ fontSize: "27px", display: "flex", alignItems: "center" }}>
          {/* 아이콘 추가 */}
          <MdDescription style={{ marginRight: "10px", fontSize: "36px" }} />
          계약서 조회
        </h1>

        {/* 검색 및 필터 */}
        <DesignerContractSearchAndFilter />

        <hr />

        {/* 정렬 및 신규 생성 버튼 */}
        <DesignerContractSortAndCreate />

        {/* 계약서 리스트 */}
        <DesignerContractList />
      </div>
    </div>
  );
};

export default DesignerContractManagePage;
