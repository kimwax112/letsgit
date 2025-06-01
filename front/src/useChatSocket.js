import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';  // ✅ 이걸 import

const useChatSocket = (roomId, onMessageReceived) => {
  useEffect(() => {
    const socket = new SockJS('http://localhost:8081/ws'); // ✅ 백엔드 ws endpoint 주소

    const client = new Client({
      webSocketFactory: () => socket,   // ✅ 이 부분으로 대체
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Connected to WebSocket');
        client.subscribe(`/topic/chat/${roomId}`, (message) => {
          const body = JSON.parse(message.body);
          onMessageReceived(body);
        });
      },
      onStompError: (frame) => {
        console.error('Broker error', frame);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [roomId, onMessageReceived]);
};

export default useChatSocket;
