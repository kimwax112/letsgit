package com.example.Loginpj.model;

import java.util.Objects;
import java.sql.Timestamp;

public class ChatRoom {
    private String roomId;
    private String roomName;
    private String creatorId;
    private Timestamp createdAt;

    // 생성자
    public ChatRoom() {}

    public ChatRoom(String roomId, String roomName, String creatorId, Timestamp createdAt) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.creatorId = creatorId;
        this.createdAt = createdAt;
    }

    // getter
    public String getRoomId() {
        return roomId;
    }

    public String getRoomName() {
        return roomName;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    // setter
    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    // toString, equals, hashCode 등 필요에 따라 추가
    @Override
    public String toString() {
        return "ChatRoom{" +
                "roomId='" + roomId + '\'' +
                ", roomName='" + roomName + '\'' +
                ", creatorId='" + creatorId + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChatRoom chatRoom = (ChatRoom) o;
        return Objects.equals(roomId, chatRoom.roomId) &&
                Objects.equals(roomName, chatRoom.roomName) &&
                Objects.equals(creatorId, chatRoom.creatorId) &&
                Objects.equals(createdAt, chatRoom.createdAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roomId, roomName, creatorId, createdAt);
    }
}