import { useParams, useLocation, useNavigate } from "react-router-dom";
import ContractLayout from "../../layouts/ContractLayout";
import DetailList from './DetailUi/DetailList';
import { useState } from "react";



export default function ContractDetailPage() {

  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [isStarred, setIsStarred] = useState(state?.contract?.isStarred ?? false);
  const toggleStar = () => setIsStarred(!isStarred);

  const contract = {
    ...state?.contract,
    isStarred: isStarred,
  };
 

  

  return (
<div>
  <ContractLayout>

<DetailList contract={contract} onToggleStar={toggleStar} />
  </ContractLayout>
</div>

  );
}