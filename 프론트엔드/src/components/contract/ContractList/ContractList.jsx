
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContractItem from "../ContractItem/ContractItem";
import ContractSearchAndFilter from "../ContractSearchAndFilter/ContractSearchAndFilter";
import "./ContractList.css";
import React from "react";
import jeans from "../../../assets/jeans.png"; // <-- 이미지 추가
import dress from "../../../assets/dress.png"; // <-- 다른 이미지
import hood from "../../../assets/후드집업.png"; // <-- 또 다른 이미지
const ContractList = ({ mode = "전체", onContractsChange }) => {
  const [contracts, setContracts] = useState([
    {
      id: "1",
      isStarred: true,
      title: "디자인 계약서 1",
      preview: "3페이지 분량 / 클라이언트 서명 완료",
      status: "진행중",
      date: "2025.04.11",
      image: jeans,  // <-- 이미지 추가
    },
    {
      id: "2",
      isStarred: false,
      title: "위탁계약서",
      preview: "초안 전달 / 검토 중",
      status: "완료",
      date: "2025.04.05",
      image: dress, // <-- 다른 이미지
    },
    {
      id: "3",
      isStarred: false,
      title: "프로젝트 계약서",
      preview: "계약 해지 요청 / 내용 확인 필요",
      status: "해지",
      date: "2025.03.30",
      image: hood, // <-- 또 다른 이미지
    },
  ]);
  

  // contracts가 변경될 때마다 부모 컴포넌트에 알림
  React.useEffect(() => {
    if (onContractsChange) {
      onContractsChange(contracts);
    }
  }, [contracts, onContractsChange]);

  const contract1 = contracts.find(c => c.id === "1");  // ① 예시로 id==="1"인 계약 하나만 골라내기


  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체");

  const navigate = useNavigate();

  const handleClick = (contract) => {
    navigate(`/client/contract/${contract.id}`, { state: { contract } });
  };

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

    const matchesStar = mode === "중요" ? contract.isStarred : true;

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
            onClick={() => handleClick(contract)}
          />
        ))
      ) : (
        <p className="no-contracts-message">조건에 맞는 계약이 없습니다.</p>
      )}
    </div>
  );
};

export default ContractList;