import "./MyProgressContent.css"
import {useState, useEffect} from "react"
import axios from "axios";
import ContractItem from "../../../components/contract/ContractItem/ContractItem";

const statusImages = {
  "대기중": "/image/대기중.png",
  "배송중": "/image/배송중.png",
  "진행중": "/image/진행중.png", 
  "완료": "/image/완료됨.png",
  
};

export default function MyProgressContent({mode ="전체"}) {
  const [contracts, setContracts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("전체");
    const [searchTerm, setSearchTerm] = useState("");
const allStatuses = ["대기중","배송중","진행중", "완료"]; // 모든 상태 목록

  useEffect(() => {

  
//   axios.get("http://localhost:8081/client/contract")
//     .then((response) => {
//       console.log("받은 계약 데이터:", response.data);
//       const mappedContracts = response.data.map(contract => ({
//         id: contract.contractId,
//         starredStatus: false,
//         title: contract.contractTitle,
//         clientId: contract.clientId,
//         status: contract.status,
//         date: formatDate(contract.dueDate),
//         preview: contract.preview || "",
//       }));
      

//       setContracts(mappedContracts);
//     })
//     .catch((error) => {
//       console.error("계약 데이터 가져오기 실패:", error);
//     });
// }, []);

// 테스트 데이터 하드코딩
    const mockContracts = [
      {
        id: 1,
        starredStatus: false,
        title: "계약 1",
        clientId: "client1",
        status: "진행중",
        date: formatDate("2025-05-24"),
        preview: "이것은 진행 중인 계약입니다.",
      },
      {
        id: 2,
        starredStatus: true,
        title: "계약 2",
        clientId: "client2",
        status: "완료",
        date: formatDate("2025-05-20"),
        preview: "이것은 완료된 계약입니다.",
      },
      {
        id: 3,
        starredStatus: false,
        title: "계약 3",
        clientId: "client3",
        status: "배송중",
        date: formatDate("2025-05-30"),
        preview: "이것은 대기 중인 계약입니다.",
      },
        {
        id: 4,
        starredStatus: false,
        title: "계약 3",
        clientId: "client3",
        status: "대기중",
        date: formatDate("2025-05-30"),
        preview: "이것은 대기 중인 계약입니다.",
      },
    ];

    setContracts(mockContracts);
  }, []);

 const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${year}.${month}.${day}`;
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
  <div className="progress-container">
    <div className="progress-title"></div>
    <div className="progress-content">
      <div className="progress-contract">
            {filteredContracts.length > 0 ? (
        filteredContracts.map((contract) => (
          <div key={contract.id} className="contract-with-images">
          <ContractItem
            contract={contract}
            onToggleStar={() => handleToggleStar(contract.id)}
            
          />
           {/* 모든 상태 이미지 렌더링 */}
                <div className="status-image-container">
                  <div className="status-images">
                    {allStatuses.map((status) => (
                      <div key={status} className="status-item">
                      <img
                        src={statusImages[status] || "/images/default.png"}
                        alt={`${status} 상태 이미지`}
                        className={`status-image ${contract.status === status ? "active" : "inactive"}`}
                      />
                      
                      <span style={{fontWeight : "bold"}} className="status-text">{status}</span>
                      </div> 
                    ))}
            
                  </div>
                
                </div>
          </div>
        ))
      ) : (
        <p className="no-contracts-message">조건에 맞는 계약이 없습니다.</p>
      )}
        
      </div>
    </div>

  </div>
</div>
  )
}