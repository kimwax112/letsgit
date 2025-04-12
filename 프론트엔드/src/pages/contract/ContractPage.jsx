import ContractLayout from "../../layouts/ContractLayout";
import ContractSearchAndFilter from "../../components/contract/ContractSearchAndFilter/ContractSearchAndFilter";
import ContractList from "../../components/contract/ContractList/ContractList";

const ContractPage = () => {
  return (
    <ContractLayout>
      <div className="p-6">
        <ContractList />
      </div>
    </ContractLayout>
  );
};

export default ContractPage;
