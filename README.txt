<쿼리문>
CREATE TABLE CONTRACTS (
  CONTRACT_ID    NUMBER        NOT NULL PRIMARY KEY,
  REQUEST_ID     NUMBER,
  DESIGNER_ID    VARCHAR2(50),
  DUE_DATE       DATE,
  REQUEST_FEE    NUMBER,
  STATUS         VARCHAR2(20),
  CLIENT_ID      VARCHAR2(50),
  CONTRACT_TITLE VARCHAR2(80),
  STARRED_STATUS NUMBER(1)
);


<시퀀스>
1. - 자동으로 수가 증가 되도록 설정 (START WITH 1: 시퀀스 생성 후 첫번째 값, INCREMENT BY 1: 시퀀스 증가 값)

CREATE SEQUENCE CONTRACT_SEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;


2. - 자동으로 수가 증가 되도록 설정 (START WITH 1: 시퀀스 생성 후 첫번째 값, INCREMENT BY 1: 시퀀스 증가 값)

CREATE SEQUENCE REQUEST_SEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;


<트리거> - 해당 시퀀스에서 자동으로 해당 칼럼에 삽입 되도록 설정
1. contract_id 칼럼에 삽입 되도록
CREATE OR REPLACE TRIGGER contract_id_trigger
BEFORE INSERT ON contract
FOR EACH ROW
BEGIN
    -- contract_id 칼럼에 시퀀스에서 생성된 값을 자동으로 할당
    :NEW.contract_id := CONTRACT_SEQ.NEXTVAL;
END;


2. request_id 칼럼에 삽입 되도록
CREATE OR REPLACE TRIGGER request_id_trigger
BEFORE INSERT ON contract
FOR EACH ROW
BEGIN
    -- request_id 칼럼에 시퀀스에서 생성된 값을 자동으로 할당
    :NEW.request_id := REQUEST_SEQ.NEXTVAL;
END;




<테스트용 데이터>
INSERT INTO contract 
VALUES 
  (CONTRACT_SEQ.NEXTVAL, REQUEST_SEQ.NEXTVAL, 'designer001', TO_DATE('2025-06-30', 'yyyy-mm-dd'), 500000, '진행중', 'abc001', '디자인 계약서 1', 0),
  (CONTRACT_SEQ.NEXTVAL, REQUEST_SEQ.NEXTVAL, 'designer001', TO_DATE('2025-07-15', 'yyyy-mm-dd'), 800000, '완료', 'client002', '위탁 계약서', 0),
  (CONTRACT_SEQ.NEXTVAL, REQUEST_SEQ.NEXTVAL, 'designer001', TO_DATE('2025-08-01', 'yyyy-mm-dd'), 1200000, '해지', 'client003', '프로젝트 계약서', 0),
  (CONTRACT_SEQ.NEXTVAL, REQUEST_SEQ.NEXTVAL, 'designer001', TO_DATE('2025-04-28', 'yyyy-mm-dd'), 100000, '진행중', 'aaa', 'test1', 0);



<controller> - ContractController.java 파일
getContracts() 메서드 - 모든 계약을 가져옴(의뢰인 쪽으로 불러옴)
getContractById() 메서드 - 계약 검색할 때 사용한다.
updateStarStatus() 메서드 - 계약의 중요 표시 업데이트할 때 사용
createContract() 메서드 - 새 계약을 작성할 때 사용 Contract 객체를 받아서 이를 데이터 베이스에 저장한다.

<controller> - DesignerContractController.java 파일
getContracts() 메서드 - 모든 계약을 가져옴(디자이너 쪽으로 불러옴)



<service> - ContractService.java 파일
getAllContracts() 메서드 - 모든 계약 정보 가져옴(의뢰인 쪽 조회 처리)
getContractById(Long id) 메서드 - 특정 계약 불러오기(검색 기능)
updateStarStatus(Long id, boolean starredStatus) 메서드 - 중요 표시 상태 업데이트
createContract(Contract contract) 메서드 - 새로운 계약 추가
getContractsByDesigner(String designerId) 메서드 - 모든 계약 정보 가져옴(디자이너 쪽 조회 처리)


<ContractMapper>
selectAllContracts - DB에서 모든 계약 조회
selectContractById - 주어진 ID에 해당하는 계약을 조회(검색 기능)
updateStarStatus - 중요 계약 여부를 업데이트
insertContract - 새 계약을 DB에 삽입
selectContractsByDesigner - 특정 디자이너의 계약 목록 조회
