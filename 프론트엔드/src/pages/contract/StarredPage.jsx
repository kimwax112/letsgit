import ContractLayout from "../../layouts/ContractLayout";
import ContractSearchAndFilter from "../../components/contract/ContractSearchAndFilter/ContractSearchAndFilter";
import ContractList from "../../components/contract/ContractList/ContractList";

const StarredPage = () => {
  return (
    <ContractLayout>
      <div className="p-6">
        {/* 중요 계약들만 표시하는 리스트 */}
        <ContractList />
      </div>
    </ContractLayout>
  );
};

export default StarredPage;
