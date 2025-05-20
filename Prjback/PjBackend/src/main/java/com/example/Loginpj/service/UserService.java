package com.example.Loginpj.service;

import com.example.Loginpj.mapper.UserMapper;
import com.example.Loginpj.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public boolean createUser(User user) {
        if (userMapper.findById(user.getId()) != null) {
            return false; // 아이디 중복
        }
        userMapper.insertUser(user);
        return true; // 회원가입 성공
    }
    

    public User login(String id, String passwd) {
        User user = userMapper.findById(id); // findById 사용
        System.out.println("User fetched from DB: " + user);

        if (user != null && user.getPasswd().equals(passwd)) {
            return user; // 로그인 성공
        }
        return null; // 로그인 실패
    }
}