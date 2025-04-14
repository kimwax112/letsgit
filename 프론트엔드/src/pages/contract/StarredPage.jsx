import React from "react";
import ContractLayout from "../../layouts/ContractLayout";
import ContractList from "../../components/contract/ContractList/ContractList";

const StarredPage = ({ contracts, handleToggleStar }) => {

  return (
    <ContractLayout>
      <div className="p-6">
        <ContractList
          mode="중요"
          contracts={contracts} 
          handleToggleStar={handleToggleStar}
        />
      </div>
    </ContractLayout>
  );
};

export default StarredPage;
