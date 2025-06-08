import "./SearchRequest.css"
export default function SearchRequest ({searchTerm,setSearchTerm}) {

  return (
    <div className="searchrequest-container">
      <input
        type="text"
        placeholder="의뢰 제목 검색"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};