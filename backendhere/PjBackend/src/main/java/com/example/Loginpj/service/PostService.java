package com.example.Loginpj.service;

import com.example.Loginpj.mapper.PostMapper;
import com.example.Loginpj.model.PostWhat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostMapper postMapper;

    // 글 저장
    public void createPost(PostWhat post) {
        postMapper.createPost(post);
    }

    // 모든 글 조회
    public List<PostWhat> getAllPosts() {
        return postMapper.getAllPosts();
    }
}
