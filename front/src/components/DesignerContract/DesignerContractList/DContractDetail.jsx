import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DContractDetail = () => {
  const { contractId } = useParams();  // URL에서 contractId 받기
  const [contract, setContract] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 1. 로그인 세션 체크
  useEffect(() => {
  const fetchSession = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/user", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("세션 없음");
      const data = await res.json();
      if (data.username) {
        setUsername(data.username);
      }
    } catch (err) {
      setUsername(null);
    } finally {
      setLoading(false);  // 반드시 넣어야 함
    }
  };
  fetchSession();
}, []);


  // 2. 세션 체크 후 contractId가 있으면 상세 정보 요청
  useEffect(() => {
    if (!username) return; // 로그인 안 되어 있으면 API 호출 안함
    if (!contractId) return;

    const fetchContract = async () => {
      try {
                console.log("API 호출 전 contractId:", contractId); 

        const res = await fetch(`http://localhost:8081/designer/contract/${contractId}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("계약 상세 정보 불러오기 실패");
        const data = await res.json();
        setContract(data);
      } catch (err) {
        console.error("계약 상세 정보 불러오기 실패:", err);
      }
    };

    fetchContract();
  }, [username, contractId]);

  if (loading) return <div>로딩 중...</div>;

  if (!username) return <div>로그인이 필요합니다.</div>;

  if (!contract) return <div>계약 정보를 불러오는 중...</div>;

  return (
    <div>
      <h2>계약 상세 정보</h2>
      <p>계약명: {contract.contractTitle}</p>
      <p>상태: {contract.status}</p>
      <p>계약 기간: {contract.dueDate}</p>
      {/* 필요하면 더 상세한 정보 출력 */}
    </div>
  );
};

export default DContractDetail;
