import { useParams, useLocation } from "react-router-dom";
import ContractLayout from "../../layouts/ContractLayout";
import DesignerDetailList from "./DetailUi/DesignerDetailList.jsx";

export default function DesignerContractDetailPage() {
  const { id } = useParams();
  const { state } = useLocation();  // 필요 시 전달된 contract

  return (
    <ContractLayout>
      <DesignerDetailList contractId={id} contract={state?.contract} />
    </ContractLayout>
  );
}
