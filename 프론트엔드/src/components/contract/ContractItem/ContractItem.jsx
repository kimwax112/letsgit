import { Star } from "lucide-react";
import "./ContractItem.css";

const ContractItem = ({ contract, onToggleStar }) => {
  const { isStarred, title, preview, status, date } = contract;

  return (
    <div className="contract-item">
      <div className="contract-left">
        <div className="contract-star" onClick={onToggleStar}>
          <Star
            className={`star-icon ${isStarred ? "active" : ""}`} // star 아이콘 상태 변경
            size={23}
          />
        </div>
        <div className="contract-text">
          <h3 className="contract-title">{title}</h3>
          <p className="contract-preview">{preview}</p>
        </div>
      </div>
      <div className="contract-right">
        <p className={`contract-status ${status.toLowerCase()}`}>{status}</p>
        <p className="contract-date">{date}</p>
      </div>
    </div>
  );
};

export default ContractItem;
