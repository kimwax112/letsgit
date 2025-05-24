package com.example.Loginpj.service;

import com.example.Loginpj.mapper.UserDesignMapper;
import com.example.Loginpj.model.UserDesign;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserDesignService {
    private final UserDesignMapper userDesignMapper;

    public UserDesignService(UserDesignMapper userDesignMapper) {
        this.userDesignMapper = userDesignMapper;
    }

    public void saveUserDesign(UserDesign userDesign) {
        userDesignMapper.insertUserDesign(userDesign);
    }

    public List<UserDesign> getUserDesignsById(String id) {
        return userDesignMapper.findByUserId(id);
    }

    public boolean updateUserDesignSize(String id, String size) {
        int updatedRows = userDesignMapper.updateSizeByUserId(id, size);
        return updatedRows > 0;
    }
}
