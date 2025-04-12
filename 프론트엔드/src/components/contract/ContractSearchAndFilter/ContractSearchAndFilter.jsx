import './ContractSearchAndFilter.css';

const ContractSearchAndFilter = () => {
  return (
    <div className="search-filter-container">
      {/* 필터 드롭다운 */}
      <select className="filter-select">
        <option>전체</option>
        <option>진행중</option>
        <option>완료</option>
        <option>해지</option>
      </select>
      
      {/* 검색 입력창 */}
      <input
        type="text"
        placeholder="계약 제목, 내용 검색"
        className="search-input"
      />
    </div>
  );
};

export default ContractSearchAndFilter;
