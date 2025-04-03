package com.example.Loginpj.controller;

import com.example.Loginpj.model.User;
import com.example.Loginpj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Loginpj.session.*;

import jakarta.servlet.http.HttpSession;  // 변경된 부분

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private SessionManager sessionManager; //세션 매니저 추가

    // 로그인 API (세션 저장)
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User loginUser, HttpSession session) {
        // 사용자 정보 확인
        User user = userService.login(loginUser.getUsername(), loginUser.getPassword());
        
        if (user != null) {
            // 로그인 성공 시, 세션에 사용자 이름 저장
            session.setAttribute("username", user.getUsername());
            session.setAttribute("usertype", user.getUserType());

            sessionManager.addSession(session);
            
            // JSON 응답으로 username과 usertype 반환
            Map<String, String> response = new HashMap<>();
            response.put("message", "로그인 성공!");
            response.put("username", user.getUsername());
            response.put("usertype", user.getUserType());
            
            return ResponseEntity.ok(response);
        } else {

            return ResponseEntity.status(401).body(null);
        }
    }
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        try {
            System.out.println("회원가입 요청 데이터: " + user);

            boolean isCreated = userService.createUser(user);
            if (isCreated) {
                return ResponseEntity.ok().body("{\"message\": \"회원가입 성공!\"}");
            } else {
                return ResponseEntity.badRequest().body("{\"message\": \"아이디가 이미 존재합니다.\"}");
            }
        } catch (Exception e) {
        	 e.printStackTrace();
            return ResponseEntity.status(500).body("{\"message\": \"서버 오류가 발생했습니다.\"}");
        }
    }

    // 로그아웃 API (세션 삭제)
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        // 세션 무효화
        sessionManager.removeSession(session);

        session.invalidate();
        return ResponseEntity.ok("로그아웃 성공!");
    }

    // 현재 로그인된 내 세션 정보 조회
    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> getUserSession(HttpSession session) {
        Map<String, Object> sessionData = new HashMap<>();
        session.getAttributeNames().asIterator().forEachRemaining(name ->
                sessionData.put(name, session.getAttribute(name))
        );

        if (sessionData.isEmpty()) {
            return ResponseEntity.status(401).body(null);
        }

        return ResponseEntity.ok(sessionData);
    }
    // 모든 유지 중인 세션 조회 (관리자용)

    @GetMapping("/all-sessions")
    public ResponseEntity<Map<String, Map<String, Object>>> getAllSessions() {
        Map<String, Map<String, Object>> allSessionsData = new HashMap<>();

        for (Map.Entry<String, HttpSession> entry : sessionManager.getActiveSessions().entrySet()) {
            HttpSession session = entry.getValue();
            Map<String, Object> sessionInfo = new HashMap<>();

            session.getAttributeNames().asIterator().forEachRemaining(name ->
                    sessionInfo.put(name, session.getAttribute(name))
            );

            allSessionsData.put(entry.getKey(), sessionInfo);
        }

        return ResponseEntity.ok(allSessionsData);
    }
}
