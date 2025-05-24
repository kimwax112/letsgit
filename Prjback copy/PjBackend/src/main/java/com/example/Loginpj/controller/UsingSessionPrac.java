package com.example.Loginpj.controller;

import com.example.Loginpj.model.PostWhat;
import com.example.Loginpj.service.PostService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class UsingSessionPrac {

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<String> createPost(@RequestBody PostWhat post, HttpSession session) {

    	String username = (String) session.getAttribute("username");

        if (username == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다??.");
        }
        
        post.setId(username);
        
        // postnum 생성 (예: 현재 시간을 이용한 고유 번호 생성)
        long postnum = System.currentTimeMillis();
        post.setPostnum(postnum);
        System.out.println("들어오는거: " + post);

        postService.createPost(post);
        return ResponseEntity.ok("글이 저장되었습니다.");
    }

    @GetMapping
    public ResponseEntity<List<PostWhat>> getAllPosts() {
        List<PostWhat> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }
}
