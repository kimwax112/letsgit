import ContractLayout from "../../layouts/ContractLayout";

import { useParams, useLocation, useNavigate } from "react-router-dom";
import MessageHeader from "./SendMessageUi/Message/MessageHeader.jsx";
import Message from './SendMessageUi/Message/Message';
export default function ContractSendMessagePage() {
  const { state } = useLocation();
  const contract = state?.contract;

  return (
    <div>
      <ContractLayout>
      <MessageHeader/>
      <Message contract={contract} /> 
        
 
      </ContractLayout>

    </div>
  )
}