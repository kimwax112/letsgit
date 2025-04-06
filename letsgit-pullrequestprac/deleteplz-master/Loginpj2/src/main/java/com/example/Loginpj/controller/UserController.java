package com.example.Loginpj.controller;

import com.example.Loginpj.model.User;
import com.example.Loginpj.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") 
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody User user, HttpServletRequest request) {
        boolean isSignupSuccess = userService.createUser(user); // UserService를 통해 회원가입 처리

        if (isSignupSuccess) {
            HttpSession session = request.getSession(); // ✅ 세션 생성
            session.setAttribute("id", user.getId());
            session.setAttribute("name", user.getName());
            session.setAttribute("userType", user.getUserType());

            Map<String, Object> response = Map.of(
                    "message", "회원가입 성공!",
                    "id", user.getId(),
                    "name", user.getName(),
                    "userType", user.getUserType()
                );
            return ResponseEntity.ok(response);
        } else {
        	 return ResponseEntity.status(400).body(Map.of("message", "회원가입 실패: 아이디가 이미 존재합니다."));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user, HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        User foundUser = userService.login(user.getId(), user.getPasswd());

        if (foundUser != null) {
            HttpSession session = request.getSession(); // 🔥 로그인 시에만 세션 생성
            session.setAttribute("id", foundUser.getId());
            session.setAttribute("name", foundUser.getName()); 
            session.setAttribute("userType", foundUser.getUserType());

            response.put("message", "로그인 성공!");
            response.put("id", foundUser.getId());
            response.put("name", foundUser.getName());
            response.put("userType", foundUser.getUserType());
            
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.");
            return ResponseEntity.status(400).body(response);
        }   
    }

    
    @PostMapping("/session")
    public Map<String, Object> getSession(HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        HttpSession session = request.getSession(false); // 🔥 기존 세션이 없으면 null 반환 (자동 생성 방지)
        if (session == null) {
            response.put("message", "세션 없음");
            return response;
        }
        
//        String name = (String) session.getAttribute("name");
//        String passwd = (String) session.getAttribute("passwd");
        String id = (String) session.getAttribute("id");
        if (id != null) {
            response.put("id", id);
            response.put("message", "세션 유지됨");
        } else {
            response.put("message", "세션 없음");
        }
        return response;
    }
 
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false); // 🔥 기존 세션 가져오기 (없으면 null)
        
        if (session != null) {
            session.invalidate(); // ✅ 세션 삭제
        }

        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/"); 
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0); // 즉시 만료
        response.addCookie(cookie);
        
        return ResponseEntity.ok(Map.of("message", "로그아웃 성공"));
    }

}
