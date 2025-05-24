package com.example.Loginpj.controller;

import com.example.Loginpj.model.ChatRoom;
import com.example.Loginpj.service.ChatRoomService;
import com.example.Loginpj.mapper.ChatRoomMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class ChatRoomController {
    @Autowired
    private ChatRoomMapper chatRoomMapper;
    @Autowired
    private ChatRoomService chatRoomService;

    @PostMapping("/create")
    public String createRoom(@RequestBody ChatRoom room, HttpSession session) {
        String username = (String) session.getAttribute("username");
        room.setCreator(username);
        chatRoomMapper.createChatRoom(room);
        return "채팅방 생성 완료";
    }

    @GetMapping("/list")
    public List<ChatRoom> getAllRooms() {
        return chatRoomMapper.getAllChatRooms();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteRoom(@PathVariable Long id, HttpSession session) {
    	chatRoomService.deleteChatRoom(id); // 서비스 통해 트랜잭션 처리
        return "삭제 완료";
    }

    @GetMapping("/{id}")
    public ChatRoom getRoom(@PathVariable Long id) {
        return chatRoomMapper.getChatRoomById(id);
    }
}