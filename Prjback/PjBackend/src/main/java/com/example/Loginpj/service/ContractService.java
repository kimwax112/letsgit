// com.example.Loginpj.service.ContractService.java
package com.example.Loginpj.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.Loginpj.mapper.ContractMapper;
import com.example.Loginpj.model.Contract;

@Service
public class ContractService {
    private final ContractMapper contractMapper;

    public ContractService(ContractMapper contractMapper) {
        this.contractMapper = contractMapper;
    }

    public List<Contract> getAllContracts() {
        List<Contract> contracts = contractMapper.selectAllContracts();
        System.out.println("서비스에서 받은 계약 데이터: " + contracts);
        return contracts;
    }

    public Contract getContractById(Long id) {
        Contract contract = contractMapper.selectContractById(id);
        System.out.println("서비스에서 받은 계약 데이터 (ID: " + id + "): " + contract);
        return contract;
    }

    public boolean updateStarStatus(Long id, boolean starredStatus) {
        return contractMapper.updateStarStatus(id, starredStatus);
    }

    public void createContract(Contract contract) {
        contractMapper.insertContract(contract);
    }

    public List<Contract> getContractsByDesigner(String designerId) {
        List<Contract> contracts = contractMapper.selectContractsByDesigner(designerId);
        System.out.println("서비스에서 받은 디자이너 계약 데이터: " + contracts);
        return contracts;
    }

    public void save(Contract contract) {
        contractMapper.updateContractStatus(contract.getContractId(), contract.getStatus());
    }

    // ⭐ 새로 추가할 메서드
    public Contract getContractByIdAndDesignerId(Long contractId, String designerId) {
        System.out.println("ContractService: contractId " + contractId + ", designerId '" + designerId + "'로 계약 조회 시도 중...");
        Contract contract = contractMapper.selectContractByIdForDesigner(contractId, designerId);
        System.out.println("ContractService: 조회 결과: " + contract);
        return contract;
    }
}
