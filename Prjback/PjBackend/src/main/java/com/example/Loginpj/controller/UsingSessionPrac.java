package com.example.Loginpj.controller;

import com.example.Loginpj.model.PostWhat;
import com.example.Loginpj.model.wishlist_client;
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

    	String name = (String) session.getAttribute("username");

        if (name == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }
        
        post.setId(name);
        
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
    
    
 // 찜하기 기능
    @PostMapping("/like/{postnum}")
    public ResponseEntity<String> addToWishlist(@PathVariable Long postnum, HttpSession session) {
        String clientId = (String) session.getAttribute("username");
        System.out.println("찜하기 호출 - clientId: " + clientId + ", postnum: " + postnum);
        
        if (clientId == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        wishlist_client wishlist = new wishlist_client();
        wishlist.setClientId(clientId);
        wishlist.setPostnum(postnum);

        postService.addToWishlist(wishlist);

        return ResponseEntity.ok("찜 목록에 추가되었습니다.");
    }

    // 마이페이지 - 내가 찜한 포트폴리오 목록 조회
    @GetMapping("/wishlist")
    public ResponseEntity<List<PostWhat>> getWishlist(HttpSession session) {
        String clientId = (String) session.getAttribute("username");

        if (clientId == null) {
            return ResponseEntity.status(401).build();
        }

        List<PostWhat> wishlist = postService.getWishlistByClient(clientId);
        return ResponseEntity.ok(wishlist);
    }
    
    @PostMapping("/unlike/{postnum}")
    public ResponseEntity<?> unlikePost(@PathVariable Long postnum, HttpSession session) {
        String clientId = (String) session.getAttribute("username"); 

        System.out.println("unlike 요청 - clientId: " + clientId + ", postnum: " + postnum);  // 로그 추가

        if (clientId == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        wishlist_client wishlist = new wishlist_client();
        wishlist.setClientId(clientId);
        wishlist.setPostnum(postnum);

        try {
            postService.removeFromWishlist(wishlist);
            return ResponseEntity.ok("찜 해제 완료");
        } catch (Exception e) {
            e.printStackTrace();  // 전체 에러 로그 확인
            return ResponseEntity.status(500).body("찜 해제 실패: " + e.getMessage());
        }
    }




}
