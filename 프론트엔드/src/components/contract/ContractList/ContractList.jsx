import { useState } from "react";
import ContractItem from "../ContractItem/ContractItem";
import ContractSearchAndFilter from "../ContractSearchAndFilter/ContractSearchAndFilter";
import './ContractList.css'

const ContractList = ({ mode = "전체" }) => {
  const [contracts, setContracts] = useState([
    {
      isStarred: true,
      title: "디자인 계약서 1",
      preview: "3페이지 분량 / 클라이언트 서명 완료",
      status: "진행중",
      date: "2025.04.11",
    },
    {
      isStarred: false,
      title: "위탁계약서",
      preview: "초안 전달 / 검토 중",
      status: "완료",
      date: "2025.04.05",
    },
    {
      isStarred: false,
      title: "프로젝트 계약서",
      preview: "계약 해지 요청 / 내용 확인 필요",
      status: "해지",
      date: "2025.03.30",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체");

  const handleToggleStar = (index) => {
    const updatedContracts = [...contracts];
    updatedContracts[index].isStarred = !updatedContracts[index].isStarred;
    setContracts(updatedContracts);
  };

  const filteredContracts = contracts.filter((contract) => {
    const matchesStatus =
      statusFilter === "전체" || contract.status === statusFilter;
    const matchesSearch =
      contract.title.includes(searchTerm) || contract.preview.includes(searchTerm);

    const matchesStar =
      mode === "중요" ? contract.isStarred : true;

    return matchesStar && matchesStatus && matchesSearch;
  });

  return (
    <div>
      <ContractSearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      {filteredContracts.length > 0 ? (
        filteredContracts.map((contract, index) => (
          <ContractItem
            key={index}
            contract={contract}
            onToggleStar={() => handleToggleStar(index)}
          />
        ))
      ) : (
        <p className="no-contracts-message">조건에 맞는 계약이 없습니다.</p>
      )}
    </div>
  );
};

export default ContractList;
