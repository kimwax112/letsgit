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

const allStatuses = ["대기중", "진행중", "배송중", "완료"];

export default function MyProgressContent({ mode = "전체", username: propUsername }) {
  const [username, setUsername] = useState(propUsername);
  const [contracts, setContracts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!propUsername) {
      const fetchSession = async () => {
        try {
          const res = await fetch("http://localhost:8081/api/user", {
            credentials: "include",
          });
          if (!res.ok) throw new Error("세션 없음");
          const data = await res.json();
          if (data.username) {
            setUsername(data.username);
          }
        } catch (err) {
          console.warn("세션 정보 없음:", err);
        }
      };
      fetchSession();
    }
  }, [propUsername]);

  useEffect(() => {
    if (!username) return;

    axios
      .get(`http://localhost:8081/api/progress/client/contracts/${username}`)
      .then((response) => {
        const mappedContracts = response.data.map((contract) => ({
          id: contract.contractId,
          title: contract.contractTitle,
          step: contract.step || 0,
          status: allStatuses[contract.step] || "대기중", // fallback
          date: formatDate(contract.dueDate),
          starredStatus: contract.starredStatus === 1,
          preview: contract.contractContent || "",
        }));
        setContracts(mappedContracts);
      })
      .catch((error) => {
        console.error("계약 데이터 가져오기 실패:", error);
      });
  }, [username]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${year}.${month}.${day}`;
  };

  const handleToggleStar = (contractId) => {
    const updatedContracts = contracts.map((contract) =>
      contract.id === contractId
        ? { ...contract, starredStatus: !contract.starredStatus }
        : contract
    );
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
                  <div className="status-image-container">
                    <div className="status-images">
                      {allStatuses.map((status, index) => {
                        const isActive = contract.step === index;
                        return (
                          <div key={status} className="status-item">
                            <img
                              src={statusImages[status]}
                              alt={`${status} 상태 이미지`}
                              className={`status-image ${
                                isActive ? "active" : "inactive"
                              }`}
                            />
                            <span className="status-text">{status}</span>
                          </div>
                        );
                      })}
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
  );
}
