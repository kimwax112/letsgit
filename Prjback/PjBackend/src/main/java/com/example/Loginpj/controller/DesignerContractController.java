package com.example.Loginpj.controller;

import com.example.Loginpj.model.Contract;
import com.example.Loginpj.service.ContractService;
import com.example.Loginpj.service.DesignerService;

import jakarta.servlet.http.HttpSession;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/designer")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class DesignerContractController {

    private final ContractService contractService;
    private final DesignerService designerService;  // 여기 추가

    public DesignerContractController(ContractService contractService, DesignerService designerService) {
        this.contractService = contractService;
        this.designerService = designerService;
    }

    // 👇 모든 계약 조회 (기존)
    @GetMapping("/contracts")
    public List<Contract> getAllContracts() {
        List<Contract> contracts = contractService.getAllContracts();
        System.out.println("받은 계약 데이터: " + contracts);
        return contracts;
    }

    @GetMapping("/contract/{contractId}")
    public Contract getContractDetail(@PathVariable Long contractId, HttpSession session) {
        String username = (String) session.getAttribute("username");

        if (username == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다."); // 401 Unauthorized
        }

        String loggedInDesignerId = designerService.findIdByUsername(username);
        System.out.println("DesignerService: username '" + username + "'을 designerId로 사용합니다."); // 로그 위치 이동

        if (loggedInDesignerId == null || loggedInDesignerId.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효한 사용자 정보를 찾을 수 없습니다."); // 401 Unauthorized
        }

        Contract contract = contractService.getContractByIdAndDesignerId(contractId, loggedInDesignerId);

        if (contract == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "계약이 존재하지 않거나 접근 권한이 없습니다."); // 404 Not Found
        }

        return contract;
    }
}