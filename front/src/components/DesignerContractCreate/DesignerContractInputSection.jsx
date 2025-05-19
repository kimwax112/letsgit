import React from "react";
import styles from "./DesignerContractCreate.module.css";

const DesignerContractInputSection = ({ contractData, setContractData }) => {
  // 계약 의뢰
  const handleContractTitleChange = (e) => {
    setContractData({ ...contractData, contractTitle: e.target.value });
  };

  // 계약인(의뢰인)
  const handleClientNameChange = (e) => {
    setContractData({ ...contractData, clientId: e.target.value });
  };

  // 계약 기간 (두 날짜 입력)
  const handleStartDateChange = (e) => {
    setContractData({ ...contractData, startDate: e.target.value });
  };

  const handleEndDateChange = (e) => {
    setContractData({ ...contractData, endDate: e.target.value });
  };

  // 계약금
  const handleRequestFeeChange = (e) => {
    setContractData({ ...contractData, requestFee: e.target.value });
  };

  return (
    <div className={styles.container}>
      {/* 계약 의뢰 */}
      <div className={styles.inputRow}>
        <label className={styles.label}>
          계약 의뢰 <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          value={contractData.contractTitle || ""} // 빈 문자열로 기본값 설정
          placeholder="계약 의뢰를 입력하세요"
          className={styles.input}
          onChange={handleContractTitleChange}
        />
        <button className={styles.browseButton}>찾아보기</button>
      </div>

      {/* 계약인(의뢰인) */}
      <div className={styles.inputRow}>
        <label className={styles.label}>
          계약인(의뢰인) <span style={{ color: "red" }}>*</span>
        </label>
        <input autoFocus
          type="text"
          value={contractData.clientId || ""} // 빈 문자열로 기본값 설정
          name="clientName"
          placeholder="계약인 이름을 입력하세요"
          className={styles.input}
          onChange={handleClientNameChange}
        />
      </div>

      {/* 계약 기간 */}
      <div className={styles.inputRow}>
        <label className={styles.label}>
          계약 기간 <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="date"
          value={contractData.startDate || ""} // 빈 문자열로 기본값 설정
          className={styles.dateInput}
          onChange={handleStartDateChange}
        />
        ~
        <input
          type="date"
          value={contractData.endDate || ""} // 빈 문자열로 기본값 설정
          className={styles.dateInput}
          onChange={handleEndDateChange}
        />
      </div>

      {/* 계약금 */}
      <div className={styles.inputRow}>
        <label className={styles.label}>
          계약금 <span style={{ color: "red" }}>*</span>
        </label>
        <div className={styles.moneyWrapper}>
          <input
            type="number"
            value={contractData.requestFee || ""} // 빈 문자열로 기본값 설정
            placeholder="계약금을 입력하세요"
            className={styles.moneyInput}
            onChange={handleRequestFeeChange}
          />
          <span className={styles.moneyUnit}>₩</span>
        </div>
      </div>
    </div>
  );
};

export default DesignerContractInputSection;
