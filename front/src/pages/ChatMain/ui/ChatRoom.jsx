import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const ChatPage = ({ roomId }) => {
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(null); // ✅ 방 정보 상태 추가
  const messageEndRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("URL에서 받은 roomId:", roomId);
  }, [roomId]);
 
  useEffect(() => {
    const checkSessionAndLoadMessages = async () => {
        try {
          const res = await fetch("http://localhost:8081/api/checkSession", {
            credentials: "include",
          });
          const data = await res.json();
          if (data.username) {
            setUsername(data.username);
    
            // ✅ 메시지 불러오기
            const msgRes = await fetch(`http://localhost:8081/api/messages/${roomId}`);
            const msgs = await msgRes.json();
            setMessages(msgs); // 이전 메시지 저장
            // ✅ 방 정보 불러오기
        const roomRes = await fetch(`http://localhost:8081/api/rooms/${roomId}`);
        const roomData = await roomRes.json();
        setRoom(roomData);
        console.log("룸데이터터:", roomData);

          } else {
            alert("로그인이 필요합니다.");
            navigate("/");
          }
        } catch (err) {
          console.error("세션 확인 실패:", err);
          alert("세션 확인 중 오류 발생");
          navigate("/");
        }
      };
      checkSessionAndLoadMessages();
    
  

      if (!username) return; // username 없으면 아무것도 하지 않음

      const socket = new SockJS("http://localhost:8081/ws");
  const stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("WebSocket 연결 성공");

      // ✅ 채팅방 구독
      stompClient.subscribe(`/topic/chat/${roomId}`, (msg) => {
        const receivedMessage = JSON.parse(msg.body);
        setMessages((prev) => [...prev, receivedMessage]);
      });

      // ✅ 입장 메시지 전송
      stompClient.publish({
        destination: `/app/chat.addUser/${roomId}`,
        body: JSON.stringify({
          sender: username,
          content: `${username} 님이 입장하셨습니다.`,
          type: "JOIN",
        }),
      });

      setConnected(true);
    },
    onDisconnect: () => {
      console.log("WebSocket 연결 종료");
      setConnected(false);
    },
  });
  

  stompClient.activate();
  setClient(stompClient);

  return () => {
    stompClient.deactivate();
  };
  }, [username, roomId, navigate]);
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });  // 새로운 메시지가 들어오면 스크롤을 맨 아래로 이동
    }
  }, [messages]);  // 메시지가 바뀔 때마다 실행

  const sendMessage = () => {
    if (client && connected && message.trim() !== "") {
        client.publish({
          destination: `/app/chat.sendMessage/${roomId}`, // ✅ 전송 주소 수정
          body: JSON.stringify({ sender: username, content: message, type: "CHAT" }),
        });
        setMessage("");
      }
  };

  const handleLogout = async () => {
    try {
      // WebSocket으로 퇴장 메시지 전송
      if (client && connected) {
        client.publish({
          destination: "/app/chat",
          body: JSON.stringify({
            sender: username,
            content: `${username} 님이 퇴장하셨습니다.`,
            type: "LEAVE"
          }),
        });
      }
  
      await fetch("http://localhost:8081/api/logout", {
        method: "POST",
        credentials: "include",
      });
  
      navigate("/"); // 로그아웃 후 홈으로
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };
  const handleLeave = () => {
    if (client && connected) {
      client.publish({
        destination: `/app/chat.sendMessage/${roomId}`,
        body: JSON.stringify({
          sender: username,
          content: `${username} 님이 나가셨습니다.`,
          type: "LEAVE",
          roomId: roomId,
        }),
      });
    }
  
    navigate("/EnterChatRoom"); // 목록 페이지로 이동
  };
  const handleDeleteRoom = async () => {
    const confirmDelete = window.confirm("정말 이 채팅방을 삭제하시겠습니까?");
    if (!confirmDelete) return;
  
    try {
      await fetch(`http://localhost:8081/api/rooms/delete/${roomId}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      navigate("/EnterChatRoom"); // 삭제 후 목록 페이지로
    } catch (error) {
      console.error("채팅방 삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    }
  };
  const handleImageUpload = async (e) => {
    console.log("이미지 업로드 핸들러 호출됨");
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
    
    // FormData 내용 로그 출력
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    const res = await fetch("http://localhost:8081/files/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
  
    const uploadedFileName = await res.text();
    // WebSocket으로 이미지 메시지 전송s]
    if (client && connected) {
      client.publish({
        destination: `/app/chat.sendMessage/${roomId}`,
        body: JSON.stringify({
          sender: username,
          type: "IMAGE",
          fileName: uploadedFileName.split(": ")[1],
          roomId: roomId,

        }),
        
      });
    }
  };
  
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
  
    const res = await fetch("http://localhost:8081/files/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
  
    const uploadedFileName = await res.text();
  
    // WebSocket으로 파일 메시지 전송
    if (client && connected) {
      client.publish({
        destination: `/app/chat.sendMessage/${roomId}`,
        body: JSON.stringify({
          sender: username,
          type: "FILE",
          fileName: uploadedFileName.split(": ")[1],
          roomId: roomId,
        }),
      });
    }
  };
  
  return (
    <div>
   
<style>
{`
.custom-scroll {
  height: 500px;
  width: 660px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: flex;
  flex-direction: column;
}

.custom-scroll::-webkit-scrollbar {
  display: none;
}
.message-container {
height:100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 기본은 왼쪽 정렬 */
  margin-bottom: 10px;
}

.message-container.my-message {
  align-items: flex-end; /* 내가 보낸 메시지는 오른쪽 정렬 */
}

.sender-name {
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 2px;
}

.my-bubble {
  background-color: #dcf8c6;
  padding: 8px 12px;
  border-radius: 10px;
  max-width: 60%;
  text-align: left;
}

.other-bubble {
  background-color: #f1f0f0;
  padding: 8px 12px;
  border-radius: 10px;
  max-width: 60%;
  text-align: left;
}



`}
</style>

      

      {/*<h2>채팅방</h2>
      <p>접속자: <strong>{username}</strong></p>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={handleLeave}>나가기</button>*/}
      {room && room.creator === username && (
        <button onClick={handleDeleteRoom}>채팅방 삭제</button>
        )}

        

  <div className="custom-scroll">
  {messages.map((msg, index) => {
    const isMyMessage = msg.sender === username;

    const messageClass = isMyMessage ? "my-message" : "other-message";
    const messageBubbleClass = isMyMessage ? "my-bubble" : "other-bubble";

    const fileLink = `http://localhost:8081/files/view/${msg.fileName}`;

    return (
    <div key={index} className={`message-container ${messageClass}`}>
  <div className="sender-name">{msg.sender}</div>

  {msg.type === "IMAGE" ? (
    <div className={messageBubbleClass}>
      <img src={fileLink} alt="업로드 이미지" style={{ maxWidth: "200px" }} />
    </div>
  ) : msg.type === "FILE" ? (
    <div className={messageBubbleClass}>
      {/*<a href={fileLink} target="_blank" rel="noopener noreferrer" download={msg.fileName}>
        {msg.fileName}
      </a>*/}
     <div
  onClick={() => window.open(fileLink, "_blank")}
  className={messageBubbleClass}
  style={{
    padding: "8px 12px",
    backgroundColor: "#ddd",
    borderRadius: "8px",
    display: "inline-block",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
    maxWidth: "200px",
    wordBreak: "break-word"
  }}
>
  {msg.fileName?.split("_")[1] || "파일"}
</div>


    </div>
  ) : (
    <div className={messageBubbleClass}>{msg.content}</div>
  )}
</div>


    );
  })}
  <div ref={messageEndRef} />
</div>


      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지 입력"
      />
      
      <button onClick={sendMessage}>전송</button>
        {/* 이미지 업로드 버튼 */}
        <br></br>
        <button onClick={() => document.getElementById('image-upload').click()}>
          이미지 업로드
        </button>
        <input
          type="file"
          accept="image/*"
          id="image-upload"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />


        {/* 파일 업로드 버튼 */}
        
         <button onClick={() => document.getElementById('file-upload').click()}>
        파일 업로드
        </button>
        <input
        type="file"
        id="file-upload"
        style={{ display: "none" }}
        onChange={handleFileUpload}
        />
    </div>
  );
};

export default ChatPage;