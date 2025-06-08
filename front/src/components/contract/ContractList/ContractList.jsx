import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ContractItem from "../ContractItem/ContractItem";
import ContractSearchAndFilter from "../ContractSearchAndFilter/ContractSearchAndFilter";
import "./ContractList.css";

const ContractList = ({ mode = "전체" }) => {
  const [contracts, setContracts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8081/client/contract")
      .then((response) => {
        const mappedContracts = response.data.map(contract => ({
          id: contract.contractId,
          starredStatus: false,
          title: contract.contractTitle,
          clientId: contract.clientId,
          status: contract.status,
          date: formatDate(contract.dueDate),
          preview: contract.preview || "",
        }));
        setContracts(mappedContracts);
      })
      .catch((error) => {
        console.error("계약 데이터 가져오기 실패:", error);
      });
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${year}.${month}.${day}`;
  };

  const handleClick = (contract) => {
    navigate(`/client/contract/${contract.id}`, { state: { contract } });
  };

  const handleToggleStar = (contractId) => {
    const updatedContracts = contracts.map((contract) => {
      if (contract.id === contractId) {
        return { ...contract, starredStatus: !contract.starredStatus };
      }
      return contract;
    });
    setContracts(updatedContracts);
  };

  const filteredContracts = contracts.filter((contract) => {
    const matchesStatus = statusFilter === "전체" || contract.status === statusFilter;
    const matchesSearch =
      (contract.title && contract.title.includes(searchTerm)) ||
      (contract.preview && contract.preview.includes(searchTerm));
    const matchesStar = mode === "중요" ? contract.starredStatus : true;

    return matchesStar && matchesStatus && matchesSearch;
  });

  const openReviewModal = (contract) => {
    // 리뷰 모달 열기 로직 (예시)
    console.log("리뷰 모달 열기:", contract);
  };

  return (
    <div>
      <ContractSearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      {filteredContracts.length > 0 ? (
        filteredContracts.map((contract) => (
          <div key={contract.id} style={{ display: "flex", alignItems: "center" }}>
            <ContractItem
              contract={contract}
              onToggleStar={() => handleToggleStar(contract.id)}
              onClick={() => handleClick(contract)}
            />
            {contract.status === "완료" && (
              <button style={{ marginLeft: "auto" }} onClick={() => openReviewModal(contract)}>
                계약<br />종료
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="no-contracts-message">조건에 맞는 계약이 없습니다.</p>
      )}
    </div>
  );
};

export default ContractList;
