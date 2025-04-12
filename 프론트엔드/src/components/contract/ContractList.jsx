// 계약 리스트 전체 (맵으로 반복 렌더링)

import ContractItem from "./ContractItem/ContractItem";

const ContractList = () => {
    const mockContracts = [
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
    ];
  
    return (
      <div>
        {mockContracts.map((contract, index) => (
          <ContractItem key={index} contract={contract} />
        ))}
      </div>
    );
  };
  

export default ContractList;