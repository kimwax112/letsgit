import React, { useState } from "react";
import ContractSidebar from "../components/contract/ContractSidebar/ContractSidebar";

const dummyData = [
  {
    title: "계약서 1",
    preview: "이건 계약 내용의 미리보기",
    status: "계약 중",
    date: "2024-04-11",
    isStarred: true,
  },
  {
    title: "계약서 2",
    preview: "이건 두번째 계약",
    status: "계약 완료",
    date: "2024-04-10",
    isStarred: false,
  },
];

const ContractLayout = ({ children }) => {
  const [contracts, setContracts] = useState(dummyData);

  const handleToggleStar = (title) => {
    setContracts((prev) =>
      prev.map((c) =>
        c.title === title ? { ...c, isStarred: !c.isStarred } : c
      )
    );
  };

  return (
    <div className="flex">
      <ContractSidebar />
      <div className="flex-1">
        {/* children을 여기에 렌더링 */}
        {children && React.cloneElement(children, { contracts, handleToggleStar })}
      </div>
    </div>
  );
};

export default ContractLayout;
