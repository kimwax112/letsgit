package com.example.Loginpj.model;

public class ChatMessage {
    private String sender;
    private String content;
    private MessageType type;

    public enum MessageType {
        CHAT, JOIN, LEAVE
    }

    public ChatMessage() {}

    public ChatMessage(String sender, String content, MessageType type) {
        this.sender = sender;
        this.content = content;
        this.type = type;
    }

    // Getter & Setter
    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public MessageType getType() { return type; }
    public void setType(MessageType type) { this.type = type; }
}
