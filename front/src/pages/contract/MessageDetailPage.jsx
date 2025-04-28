// MessageDetailPage.jsx
import { useLocation } from "react-router-dom";
import ContractLayout from '../../layouts/ContractLayout.jsx'
import MessageDetail from './SendMessageUi/MessageDetail.jsx'
import MessageList from './SendMessageUi/Message/MessageList.jsx'

export default function MessageDetailPage() {
  const { state } = useLocation();
  const contract = state?.contract;

  console.log("MessageDetailPage: Received contract:", contract);

  return (
    <div>
      <ContractLayout>
        
        <MessageDetail contract={contract} />
        {/* 현재 계약을 제외한 다른 계약 메시지 리스트 표시 */}
        {contract && <MessageList excludeContractId={contract.id} />}
      </ContractLayout>
    </div>
  );
}