package com.example.Loginpj.service;

import com.example.Loginpj.model.ChatRoom;
import com.example.Loginpj.mapper.ChatRoomMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID; // UUID 추가

@Service
public class ChatRoomService {
	  private final ChatRoomMapper chatRoomMapper;

	    public ChatRoomService(ChatRoomMapper chatRoomMapper) {
	        this.chatRoomMapper = chatRoomMapper;
	    }
    public List<ChatRoom> getAllChatRooms() {
        return chatRoomMapper.getAllChatRooms();
    }

    public void createChatRoom(ChatRoom chatRoom) {
        chatRoomMapper.createChatRoom(chatRoom);
    }
    public ChatRoom getChatRoomById(Long id) {
        return chatRoomMapper.getChatRoomById(id);
    }
    @Transactional
    public void deleteChatRoom(Long id) {
        chatRoomMapper.deleteMessagesByRoomId(id);
        
        chatRoomMapper.deleteChatRoom(id);
    }
    
}