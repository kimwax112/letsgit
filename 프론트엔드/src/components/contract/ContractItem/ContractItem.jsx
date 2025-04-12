import { Star, StarOff } from "lucide-react";
import "./ContractItem.css"; // CSS 파일 불러오기

const ContractItem = ({ contract }) => {
  const { isStarred, title, preview, status, date } = contract;

  return (
    <div className="contract-item">
      <div className="contract-left">
        <div className="contract-star">
          {isStarred ? (
            <Star className="star-icon active" size={18} />
          ) : (
            <StarOff className="star-icon" size={18} />
          )}
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
