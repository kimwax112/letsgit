/*import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
const useChatSocketMultiRoom = (roomIds, onMessageReceived) => {
  useEffect(() => {
    const socket = new SockJS('http://localhost:8081/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ WebSocket 연결됨');

        roomIds.forEach((roomId) => {
          // ✅ 경로를 백엔드 전송과 일치시킴
          client.subscribe(`/topic/room/${roomId}`, (message) => {
            const body = JSON.parse(message.body);
            console.log(`📩 방 ${roomId}로부터 메시지 수신:`, body);
            onMessageReceived(body);
          });
        });
      },
      onStompError: (frame) => {
        console.error('❌ STOMP 오류:', frame);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [roomIds, onMessageReceived]);
};
export default useChatSocketMultiRoom;*/

import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useChatSocketMultiRoom = (roomIds, onMessageReceived) => {
  useEffect(() => {
    const socket = new SockJS('http://localhost:8081/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ WebSocket 연결됨');

        roomIds.forEach((roomId) => {
          client.subscribe(`/topic/chat/${roomId}`, (message) => {
            const body = JSON.parse(message.body);
            console.log(`📩 방 ${roomId}로부터 메시지 수신:`, body);
            onMessageReceived(body);
          });
        });
      },
      onStompError: (frame) => {
        console.error('❌ STOMP 오류:', frame);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [roomIds, onMessageReceived]);
};

export default useChatSocketMultiRoom;
