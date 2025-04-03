package com.example.Loginpj.service;

import com.example.Loginpj.model.ChatRoom;
import com.example.Loginpj.mapper.ChatRoomMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID; // UUID 추가

@Service
public class ChatRoomService {

    @Autowired
    private ChatRoomMapper chatRoomMapper;

    public List<ChatRoom> getAllChatRooms() {
        return chatRoomMapper.findAll();
    }

    public void createChatRoom(ChatRoom chatRoom) {
        String roomId = UUID.randomUUID().toString(); // roomId 생성
        chatRoom.setRoomId(roomId); // roomId 설정
        chatRoomMapper.insertChatRoom(chatRoom);
    }
}