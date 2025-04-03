package com.example.Loginpj.controller;

import com.example.Loginpj.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat")
    @SendTo("/topic/chatroom") // 모든 클라이언트에게 전송
    public ChatMessage sendMessage(@Payload ChatMessage message) {
        System.out.println("받은 메시지: " + message.getSender() + " - " + message.getContent());
        return message;
    }
}
