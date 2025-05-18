import ContractLayout from "../../layouts/ContractLayout";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import MessageHeader from "./SendMessageUi/Message/MessageHeader.jsx";
import Message from './SendMessageUi/Message/Message';
import { useState, useEffect } from "react";

export default function ContractSendMessagePage() {
  const { state } = useLocation();
  const contract = state?.contract; // ㅣㅐㅊ
  const initialMessageText = state?.messageText;
  const sendMessage = state?.sendMessage; // 추가: handleEditorSend에서 전달된 데이터

  const [messages, setMessages] = useState([]); // 변수명 통일

  useEffect(() => {
    if (sendMessage) { //만약에 sendMessage(DetailList에서 작성한content)가 존재하고
                      // contract또는 sendMessage 값이 바뀔때마다 messages상태를 갱신
                       // handleEditorSend에서 전달된 sendMessage를 사용
      setMessages([sendMessage]);
    } else if (initialMessageText) {
      // 백업: sendMessage가 없을 경우 initialMessageText 사용
      const newSendMessage = {
        id: `msg-${Date.now()}`, // 수정: 템플릿 리터럴 사용
        content: initialMessageText,
        time: new Date().toLocaleTimeString(), // "10:40:00 AM"
        contract: contract, 
      };
      setMessages([newSendMessage]);
    }
  }, [contract, sendMessage]); //의존성배열 : contract 값이 변경되면 useEfeect가 실행되어 messages 상태 업세이트 

  return (
    <div>
      <ContractLayout>
        <MessageHeader />
        {messages.map((msg) => (
          <Message
            key={msg.id}
            contract={msg.contract}
            content={msg.content}
            time={msg.time}
            id={msg.id} // 추가: 고유 ID 전달
          />
        ))}
      </ContractLayout>
    </div>
  );
}