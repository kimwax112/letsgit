package com.example.Loginpj.mapper;

import com.example.Loginpj.model.PostWhat;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;


@Mapper

public interface PostMapper {
    void createPost(PostWhat post);
    List<PostWhat> getAllPosts();
}
