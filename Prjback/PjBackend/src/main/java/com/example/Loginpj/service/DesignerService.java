// com.example.Loginpj.service.DesignerService.java
package com.example.Loginpj.service;

import org.springframework.stereotype.Service;
// import com.example.Loginpj.mapper.DesignerMapper; // DesignerMapper 임포트 제거

@Service
public class DesignerService {
    // DesignerMapper 의존성 주입이 더 이상 필요 없으므로 생성자 제거
    // public DesignerService(DesignerMapper designerMapper) {
    //     this.designerMapper = designerMapper;
    // }

    // ⭐ username을 그대로 반환하도록 수정합니다.
    public String findIdByUsername(String username) {
        System.out.println("DesignerService: 로그인한 username '" + username + "'을 디자이너 식별자로 사용합니다.");
        return username; // 데이터베이스 조회 없이 username을 그대로 반환
    }
}