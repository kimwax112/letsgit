import React, { useState, useEffect } from "react";
import axios from "axios";  // axios import
import styled from "styled-components";
import DesignerItemBox from "./DesignerItemBox";
import SearchRequest from "./SearchRequest";
import "./DesignerRequest.css";

export function RequestLayOut({ children }) {
  const Container = styled.div`
    width: 100%;
    background: white;
  `;

  const Content = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    margin: 0 auto;
    justify-content: center;
  `;

  const ContentHeader1 = styled.div`
    width: 50%;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    gap: 100px;
  `;

  const PaginationContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
    justify-content: center;
    padding: 25px 0;
    background-color: white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  `;

  const PageButton = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 50%;
    background-color: #f2f2f2;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #bfd7ee;
    }
    &.active {
      background-color: #BFD7EE;
      font-weight: bold;
    }
  `;

  return (
    <>
      <Container>
        <ContentHeader1 />
        <Content>{children}</Content>
        <PaginationContainer>
          <PageButton className="active">1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
        </PaginationContainer>
      </Container>
    </>
  );
}

export default function DesignerRequest({ headerText = "의뢰 찾기" }) {
  const [requestItems, setRequestItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 백엔드 API에서 데이터 가져오기
  useEffect(() => {
    axios.get("http://localhost:8081/api/requests")
      .then(response => {
        setRequestItems(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API 요청 실패:", err);
        setError("데이터를 불러오는 데 실패했습니다.");
        setLoading(false);
      });
  }, []);

  // 검색어 필터링
  const filteredItems = requestItems.filter((item) =>
    item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="designerrequest-header">
        <h1>{headerText}</h1>
        <div>
          <SearchRequest searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <RequestLayOut>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <DesignerItemBox key={item.requestId || index} data={item} />
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </RequestLayOut>
      )}
    </>
  );
}
