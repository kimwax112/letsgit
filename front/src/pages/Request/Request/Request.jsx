import React from "react";
import styled from "styled-components";
import ContentHeader from '../ui/ContentHeader';
import ItemBox from './ui/ItemBox';
import {useState, useEffect} from 'react'
import SearchRequest from "../../../pages2/Request/SearchRequest";
import "./Request.css"
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

  // 페이지네이션 스타일 추가
  const PaginationContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
    justify-content: center;
    padding:25px 0; /* 여백 추가 */
    background-color: white; /* 바탕색 */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 효과 */
    border-radius: 8px; /* 모서리 둥글게 */
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
        <Content>
          {children}
        </Content>

        {/* 페이지네이션 추가 */}
        <PaginationContainer>
          <PageButton className="active">1</PageButton>
          <PageButton>2</PageButton>
          <PageButton>3</PageButton>
        </PaginationContainer>
      </Container>
    </>
  );
}

export default function Request({headerText = "의뢰 등록하기"}) {
   const [requestItems, setRequestItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  // localStorage에서 requestData 가져오기
  useEffect(() => {
    const storedData = localStorage.getItem("requestData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
          setRequestItems(parsedData);
        }
      } catch (error) {
        console.error("requestData 파싱 오류:", error);
      }
    }
  }, []);

   const filteredItems = requestItems.filter((item) =>
    item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    
        <div  className="clientrequest-header">
          <div className="clientrequest-titlecontainer">
          <h1>{headerText}</h1>
          <div><SearchRequest searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></div>
          </div>
          <div className=""></div>
          <div className="cientrequest-titlecontainer2">
            <ContentHeader/></div>
        </div>
        
        
          
        <RequestLayOut>

        {filteredItems.length > 0 ? (
          // requestData가 있으면 동적으로 ItemBox 렌더링
          filteredItems.map((item, index) => (
            <ItemBox key={index} data={item} />
          ))
        ) : (
          // requestData가 없으면 기본 ItemBox 표시 또는 빈 상태
          <>
         
          </>
        )}
      </RequestLayOut>
    </>
  );
}
