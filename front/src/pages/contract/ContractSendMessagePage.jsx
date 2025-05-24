import React, { useEffect, useState } from 'react';
import ContractLayout from "../../layouts/ContractLayout";
import MessageHeader from "./SendMessageUi/Message/MessageHeader";
import Message from './SendMessageUi/Message/Message';

export default function ContractSendMessagePage() {
  // 1) 로컬스토리지 dratfRequest 키에서 드래프트 메시지를 불러와 상태에 저장
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("dratfRequest");
    if (!raw) return;

    try {
      const { contractMessage } = JSON.parse(raw);
      // contractMessage 객체를 배열로 만들어 메시지 리스트에 세팅
      setMessages([contractMessage]);
      // 읽고 나서 삭제하려면 아래 코드 주석 해제
      // localStorage.removeItem("dratfRequest");
    } catch (e) {
      console.error("dratfRequest 파싱 오류:", e);
    }
  }, []);

  return (
    <ContractLayout>
      <MessageHeader />
      {messages.length > 0 ? (
        messages.map((msg) => (
          <Message
            key={msg.id}
            contract={msg.contract}
            content={msg.content}
            time={msg.time}
            id={msg.id}
          />
        ))
      ) : (
        <p style={{ padding: '16px', textAlign: 'center' }}>전송할 메시지가 없습니다.</p>
      )}
    </ContractLayout>
  );
}
