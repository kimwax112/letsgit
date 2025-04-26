import ContractLayout from "../../layouts/ContractLayout";
import SendMessageList from "./SendMessageList.jsx";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function ContractSendMessagePage() {
  const { state } = useLocation();
  const contract = state?.contract;

  return (
    <div>
      <ContractLayout>
        <SendMessageList contract={contract}> 

          </SendMessageList>
 
      </ContractLayout>

    </div>
  )
}