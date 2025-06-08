//package com.example.Loginpj.controller;
//
//import org.springframework.http.ResponseEntity;
//import com.example.Loginpj.model.UserDesign;
//import com.example.Loginpj.service.UserDesignService;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/designs")
//public class UserDesignController {
//    private final UserDesignService userDesignService;
//
//    public UserDesignController(UserDesignService userDesignService) {
//        this.userDesignService = userDesignService;
//    }
//
//    @PostMapping("/add")
//    public ResponseEntity<String> addUserDesign(@RequestBody UserDesign userDesign) {
//        if (userDesign.getUserId() == null || userDesign.getDesignName() == null) {
//            return ResponseEntity.badRequest().body("사용자 ID 또는 디자인 이름이 없습니다.");
//        }
//
//        userDesignService.saveUserDesign(userDesign);
//        return ResponseEntity.ok("디자인 저장 완료!");
//    }
//
//    @GetMapping("/{userId}")
//    public ResponseEntity<List<UserDesign>> getUserDesigns(@PathVariable String userId) {
//        List<UserDesign> designs = userDesignService.getUserDesignsByUserId(userId);
//        return ResponseEntity.ok(designs);
//    }
//}



package com.example.Loginpj.controller;

import java.util.List;
import java.util.Map;


import org.springframework.http.ResponseEntity;
import com.example.Loginpj.model.UserDesign;
import com.example.Loginpj.service.UserDesignService;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/designs")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // ✅ React 요청 허용
public class UserDesignController {
    private final UserDesignService userDesignService;

    public UserDesignController(UserDesignService userDesignService) {
        this.userDesignService = userDesignService;
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addUserDesign(@RequestBody UserDesign userDesign, HttpSession session) {
<<<<<<< HEAD
        String id = (String) session.getAttribute("id");
        System.out.println("🔍 세션에서 가져온 ID: " + id);

        if (id == null || id.isEmpty()) {
=======
        String username = (String) session.getAttribute("username");
        System.out.println("🔍 세션에서 가져온 username: " + username);

        if (username == null || username.isEmpty()) {
>>>>>>> feature/sj
            return ResponseEntity.status(401).body(Map.of("message", "❌ 로그인 후 이용해주세요."));
        }

        if (userDesign.getDesignName() == null || userDesign.getDesignName().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "❌ 디자인 이름이 없습니다."));
        }

        if (userDesign.getColors() == null || userDesign.getColors().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "❌ 색상 데이터가 없습니다."));
        }

<<<<<<< HEAD
        userDesign.setId(id); // 세션에서 가져온 id를 설정
=======
        userDesign.setUsername(username); 
>>>>>>> feature/sj
        userDesignService.saveUserDesign(userDesign);
        return ResponseEntity.ok(Map.of("message", "✅ 디자인 저장 완료!"));
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<List<UserDesign>> getUserDesigns(@PathVariable String id) {
        List<UserDesign> designs = userDesignService.getUserDesignsById(id);
        return ResponseEntity.ok(designs);
    }
}
