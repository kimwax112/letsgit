package com.example.Loginpj.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.Loginpj.model.Contract;
import com.example.Loginpj.service.ContractService;

@RestController
@RequestMapping("/client")
@CrossOrigin(origins = "http://localhost:3000")
public class ContractController {

	private final ContractService contractService;

    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @GetMapping("/contract")
    public List<Contract> getContracts() {
    	List<Contract> contracts = contractService.getAllContracts();
        System.out.println("받은 계약 데이터: " + contracts);  // 추가된 로그
        return contracts;
    }
    
    @GetMapping("/contract/{id}")
    public Contract getContractById(@PathVariable("id") Long id) {
        Contract contract = contractService.getContractById(id);
        System.out.println("받은 계약 데이터 (ID: " + id + "): " + contract);  // 추가된 로그
        return contract;
    }
    
    
    @PutMapping("/contract/{id}/star")
    public ResponseEntity<?> updateStarStatus(@PathVariable("id") Long id, @RequestBody Map<String, Boolean> request) {
        boolean isStarred = request.get("isStarred");
        
        // 계약의 중요 표시 상태 업데이트
        boolean updated = contractService.updateStarStatus(id, isStarred);
        
        if (updated) {
            return ResponseEntity.ok().build(); // 업데이트 성공
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 실패
        }
    }
    
    
    //계약서 작성 (INSERT)
    @PostMapping("/contract")
    public ResponseEntity<?> createContract(@RequestBody Contract contract) {
        try {
            contractService.createContract(contract);
            return ResponseEntity.ok().build(); // 성공
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 실패
        }
    }
}
