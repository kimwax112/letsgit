import React from "react";
import styles from "./DesignerContractCreate.module.css";

const DesignerContractInputSection = () => {
  return (
    <div className={styles.container}>
      {/* 계약 의뢰 */}
      <div className={styles.inputRow}>
        <label className={styles.label}>
          계약 의뢰 <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          placeholder="계약 의뢰를 입력하세요"
          className={styles.input}
        />
        <button className={styles.browseButton}>찾아보기</button>
      </div>

      {/* 계약인(의뢰인) */}
      <div className={styles.inputRow}>
        <label className={styles.label}>
          계약인(의뢰인) <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="clientName"
          placeholder="계약인 이름을 입력하세요"
          className={styles.input}
        />
      </div>

      {/* 계약 기간 */}
      <div className={styles.inputRow}>
        <label className={styles.label}>
          계약 기간 <span style={{ color: "red" }}>*</span>
        </label>
        <input type="date" className={styles.dateInput} />
        ~
        <input type="date" className={styles.dateInput} />
      </div>

      {/* 계약금 */}
      <div className={styles.inputRow}>
        <label className={styles.label}>
          계약금 <span style={{ color: "red" }}>*</span>
        </label>
        <div className={styles.moneyWrapper}>
          <input
            type="number"
            placeholder="계약금을 입력하세요"
            className={styles.moneyInput}
          />
          <span className={styles.moneyUnit}>₩</span>
        </div>
      </div>
    </div>
  );
};

export default DesignerContractInputSection;
