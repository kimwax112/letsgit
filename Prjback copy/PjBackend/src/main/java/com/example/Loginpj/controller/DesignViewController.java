package com.example.Loginpj.controller;

import com.example.Loginpj.service.DesignViewService;

import jakarta.servlet.http.HttpSession;

import com.example.Loginpj.model.UserDesign;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/designs")
@CrossOrigin(origins = "http://localhost:3000")
public class DesignViewController {

    @Autowired
    private DesignViewService designService;

    @PostMapping("/mydesigns")
    public List<UserDesign> getMyDesigns(@RequestBody Map<String, String> request) {
        String id = request.get("id");
        
        System.out.println("💡 전달받은 ID: " + id); // ✅ 추가

        if (id == null) {
            return new ArrayList<>();
        }

//        return designService.getDesignsByUser(id);
//    }
        List<UserDesign> result = designService.getDesignsByUser(id);
        System.out.println("🎯 불러온 디자인 수: " + result.size()); // ✅ 추가
        return result;
    }
}
