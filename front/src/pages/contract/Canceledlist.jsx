import ContractSearchAndFilter from "../../components/contract/ContractSearchAndFilter/ContractSearchAndFilter";
import CancledContractItem from "../../components/contract/ContractItem/CancledContractItem";
import { useState } from "react";

export default function Canceledlist() {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체");

  const cancledcontract = [
    {
      id: "1",
      starredStatus: false,
      title: "사무실 임대 계약 해지",
      preview: "서울 강남구 사무실 임대 계약 해지 진행",
      status: "해지",
      date: "2025.05.01",
    },
    {
      id: "2",
      starredStatus: true,
      title: "렌탈 서비스 해지",
      preview: "장비 렌탈 서비스 해지 요청 완료",
      status: "해지",
      date: "2025.04.20",
    },
    {
      id: "3",
      starredStatus: false,
      title: "소프트웨어 라이선스 해지",
      preview: "연간 라이선스 해지 및 환불 처리",
      status: "해지",
      date: "2025.03.15",
    },
  ];

  const filtered = cancledcontract.filter(c => {
    const matchSearch = 
    c.title.includes(searchTerm) || 
    c.preview.includes(searchTerm);
    const matchStatus = 
    statusFilter === "전체" || c.status == statusFilter;
    return matchSearch && matchStatus;
  })
  const handleToggleStar = (id) => {
    console.log("별 토글:", id);
  };

  return (
    <div>
      <ContractSearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      {filtered.length > 0 ? (
        filtered.map(cancledcontract => (
          <CancledContractItem
            key={cancledcontract.id}  // contract.id를 key로 사용
            cancledcontract={cancledcontract}
            onToggleStar={() => handleToggleStar(cancledcontract.id)}
          />
        ))
      ) : (
        <p>취소된 계약이 없습니다.</p>
      )}
       
    </div>
  );
}
  