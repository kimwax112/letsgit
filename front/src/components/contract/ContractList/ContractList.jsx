import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // 추가
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
      console.log("받은 계약 데이터:", response.data);
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

  
// 5/20 병합 한 코드
// const id = localStorage.getItem("id");
//   useEffect(() => {
//     // 처음 컴포넌트 뜰 때 계약 데이터 가져오기
//     axios.get("http://localhost:8081/client/contract")
//       .then((response) => {
//         console.log("받은 계약 데이터:", response.data);
//         // 받아온 데이터 형태에 맞게 가공 (React에서 필요한 형태로)
//         const mappedContracts = response.data.map(contract => ({
//           id: contract.contractId,
//           starredStatus: false, // 별표 기본 false
//           title: contract.contractTitle, // 계약 제목 바로 넣기
//           clientId: contract.clientId,  // client_id → clientId
//           designerId: contract.designerId,
//           status: contract.status,
//           date: formatDate(contract.dueDate),
//           preview: contract.preview || "",  // preview가 없을 경우 빈 문자열로 기본 설정
//         }));

//         const filteredByLoginId = mappedContracts.filter(c => c.clientId === id);
//         setContracts(filteredByLoginId);
//       })
//       .catch((error) => {
//         console.error("계약 데이터 가져오기 실패:", error);
//       });
//   }, [id]);

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
        return { ...contract, starredStatus: !contract.starredStatus };  // 해당 계약만 업데이트
      }
      return contract;
    });
    setContracts(updatedContracts);
  };
  

  const filteredContracts = contracts.filter((contract) => {
    const matchesStatus = statusFilter === "전체" || contract.status === statusFilter;
    
    // contract.title과 contract.preview가 null이나 undefined가 아닌 경우에만 includes 호출
    const matchesSearch =
      (contract.title && contract.title.includes(searchTerm)) || 
      (contract.preview && contract.preview.includes(searchTerm));
  
    const matchesStar = mode === "중요" ? contract.starredStatus : true;
  
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
        filteredContracts.map((contract) => (
          <ContractItem
            key={contract.id}  // contract.id를 key로 사용
            contract={contract}
            onToggleStar={() => handleToggleStar(contract.id)}
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
