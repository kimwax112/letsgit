package com.example.Loginpj.model;

import java.sql.Date;

public class Contract {
    private int contractId;
    private int requestId;
    private String designerId;
    private Date dueDate;  // 변경: String → Date
    private int requestFee;
    private String status;
    private String clientId;
    private String contractTitle;
    private Integer starredStatus;  // 변경: Boolean → Integer
    private String contractContent;  // CLOB → String으로 매핑, 필요시 Clob으로 변경 가능
    private int step;  // 또는 int step;

    public int getStep() {
        return step;
    }

    public void setStep(int step) {
        this.step = step;
    }
    
    public int getContractId() {
        return contractId;
    }
    public void setContractId(int contractId) {
        this.contractId = contractId;
    }

    public int getRequestId() {
        return requestId;
    }
    public void setRequestId(int requestId) {
        this.requestId = requestId;
    }

    public String getDesignerId() {
        return designerId;
    }
    public void setDesignerId(String designerId) {
        this.designerId = designerId;
    }

    public Date getDueDate() {
        return dueDate;
    }
    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public int getRequestFee() {
        return requestFee;
    }
    public void setRequestFee(int requestFee) {
        this.requestFee = requestFee;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public String getClientId() {
        return clientId;
    }
    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getContractTitle() {
        return contractTitle;
    }
    public void setContractTitle(String contractTitle) {
        this.contractTitle = contractTitle;
    }

    public Integer getStarredStatus() {
        return starredStatus;  // 변경: Boolean → Integer
    }

    public void setStarredStatus(Integer starredStatus) {
        this.starredStatus = starredStatus;  // 변경: Boolean → Integer
    }

    public String getContractContent() {
        return contractContent;
    }

    public void setContractContent(String contractContent) {
        this.contractContent = contractContent;
    }
}
