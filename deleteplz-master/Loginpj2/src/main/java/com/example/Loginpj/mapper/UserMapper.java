package com.example.Loginpj.mapper;

import com.example.Loginpj.model.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    User findById(String id); // 특정 ID로 사용자 조회
    void insertUser(User user); // 회원가입 처리
    int countById(String id); // 아이디 중복 체크
}
