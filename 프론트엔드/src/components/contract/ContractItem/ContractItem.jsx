import { Star } from "lucide-react";  // 기본 Star 아이콘만 사용
import "./ContractItem.css";  // CSS 파일 불러오기

const ContractItem = ({ contract, onToggleStar }) => {
  const { isStarred, title, preview, status, date } = contract;

  return (
    <div className="contract-item">
      <div className="contract-left">
        <div className="contract-star" onClick={onToggleStar}>
          <Star
            className={`star-icon ${isStarred ? "active" : ""}`}  // 선택되었을 때 색이 꽉 찬 별
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
