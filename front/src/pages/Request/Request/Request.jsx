import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ContentHeader from '../ui/ContentHeader';
import ItemBox from './ui/ItemBox';

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

function RequestLayOut({ children }) {
  return (
    <Container>
      <ContentHeader1 />
      <Content>{children}</Content>
      <PaginationContainer>
        <PageButton className="active">1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
      </PaginationContainer>
    </Container>
  );
}

export default function Request() {
  const [requestItems, setRequestItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8081/api/requests")
      .then((response) => {
        setRequestItems(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API 요청 실패:", err);
        setError("데이터를 불러오는 데 실패했습니다.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <ContentHeader children="의뢰 등록하기" />
      <RequestLayOut>
        {loading && <p>로딩 중...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          requestItems.length > 0 ? (
            requestItems.map((item, index) => (
              <ItemBox key={item.requestId || index} data={item} />
            ))
          ) : (
            <p>의뢰 목록이 없습니다.</p>
          )
        )}
      </RequestLayOut>
    </>
  );
}
