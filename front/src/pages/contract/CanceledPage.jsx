import Canceledlist from "./Canceledlist";
import ContractLayout from "../../layouts/ContractLayout";
import React,  {useEffect,useState} from "react"
import {useLocation} from "react-router-dom"
export default  function CanceledPage() {
const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const triggerCanceledList = searchParams.get("triggerCanceledList") === "true";
  const contract = searchParams.get("contract") ? JSON.parse(searchParams.get("contract")) : null;
  const [isListGenerated, setIsListGenerated] = useState(false);


  return (
    <div>
  <ContractLayout>{isListGenerated && <Canceledlist contract={contract} />}</ContractLayout>
    </div>
  )
}