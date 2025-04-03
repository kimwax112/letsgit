package com.example.Loginpj.mapper;

import com.example.Loginpj.model.ChatRoom;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ChatRoomMapper {
    List<ChatRoom> findAll();
    void insertChatRoom(ChatRoom chatRoom);
}