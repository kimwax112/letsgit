// com.example.Loginpj.mapper.ContractMapper.java
package com.example.Loginpj.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.Loginpj.model.Contract;

@Mapper
public interface ContractMapper {
    List<Contract> selectAllContracts();

    // 기존 selectContractById는 그대로 유지하거나 (필요에 따라) 삭제
    Contract selectContractById(Long id); // 이 메서드를 ContractService에서 직접 사용 중

    boolean updateStarStatus(@Param("id") Long id, @Param("starredStatus") boolean starredStatus);

    void insertContract(Contract contract);

    List<Contract> selectContractsByDesigner(String designerId);

    void updateContractStatus(int contractId, String status);

    Contract selectContractByIdForDesigner(@Param("contractId") Long contractId, @Param("designerId") String designerId);
}