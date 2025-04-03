package com.example.Loginpj.controller;

import com.example.Loginpj.model.ChatRoom;
import com.example.Loginpj.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;  // 변경된 부분

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ChatRoomController {

    @Autowired
    private ChatRoomService chatRoomService;

    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoom>> getChatRooms(HttpSession session) {
        if (session.getAttribute("username") == null) {
            return ResponseEntity.status(401).build(); // 로그인되지 않은 사용자
        }
        List<ChatRoom> chatRooms = chatRoomService.getAllChatRooms();
        return ResponseEntity.ok(chatRooms);
    }

    @PostMapping("/rooms")
    public ResponseEntity<String> createChatRoom(@RequestBody ChatRoom chatRoom, HttpSession session) {
        if (session.getAttribute("username") == null) {
            return ResponseEntity.status(401).build(); // 로그인되지 않은 사용자
        }
        String username = (String) session.getAttribute("username"); // 세션에서 사용자 이름 가져오기
        String roomId = UUID.randomUUID().toString();
        chatRoom.setRoomId(roomId);
        chatRoom.setCreatorId(username);
        chatRoomService.createChatRoom(chatRoom);
        return ResponseEntity.ok("{\"message\": \"채팅방 생성 성공!\"}");
    }
}
