import { useState } from "react";
import ContractItem from "./ContractItem/ContractItem";

const ContractList = () => {
  const [contracts, setContracts] = useState([
    {
      isStarred: true,
      title: "디자인 계약서 1",
      preview: "3페이지 분량 / 클라이언트 서명 완료",
      status: "진행중",
      date: "2025.04.11",
    },
    {
      isStarred: true,
      title: "위탁계약서",
      preview: "초안 전달 / 검토 중",
      status: "완료",
      date: "2025.04.05",
    },
    {
      isStarred: true,
      title: "프로젝트 계약서",
      preview: "계약 해지 요청 / 내용 확인 필요",
      status: "해지",
      date: "2025.03.30",
    },
  ]);

  // 별 클릭 시 상태 토글 함수
  const handleToggleStar = (index) => {
    const updatedContracts = [...contracts];
    updatedContracts[index].isStarred = !updatedContracts[index].isStarred;
    setContracts(updatedContracts);
  };

  // 중요 계약만 필터링 (isStarred가 true인 계약만)
  const starredContracts = contracts.filter(contract => contract.isStarred);

  return (
    <div>
      {starredContracts.length > 0 ? (
        starredContracts.map((contract, index) => (
          <ContractItem
            key={index}
            contract={contract}
            onToggleStar={() => handleToggleStar(index)} // 이벤트 핸들러 전달
          />
        ))
      ) : (
        <p>중요 계약이 없습니다.</p> // 중요 계약이 없을 경우 메시지 표시
      )}
    </div>
  );
};

export default ContractList;
