package com.example.Loginpj.service;

import com.example.Loginpj.mapper.UserMapper;
import com.example.Loginpj.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    // 회원가입 메서드
    public boolean createUser(User user) {
        int count = userMapper.countById(user.getId()); // 아이디 중복 체크
        if (count > 0) {
            System.out.println("[회원가입 실패] 아이디가 이미 존재함: " + user.getId());
            return false; // 아이디 중복
        }

        userMapper.insertUser(user);
        System.out.println("[회원가입 성공] 새로운 유저 추가: " + user.getId());
        return true; // 회원가입 성공
    }

    // 로그인 메서드
    public User login(String id, String passwd) {
        User user = userMapper.findById(id); // DB에서 사용자 조회
        System.out.println("[로그인 시도] ID: " + id);

        if (user != null && user.getPasswd().equals(passwd)) {
            System.out.println("[로그인 성공] ID: " + id + " | UserType: " + user.getUserType());
            return user; // 로그인 성공
        }

        System.out.println("[로그인 실패] ID 또는 비밀번호 불일치: " + id);
        return null; // 로그인 실패
    }
}
