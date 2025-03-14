-- 1. ���� ���̺� ���� (�ʿ��� ���)
DROP TABLE files PURGE;
/

-- 2. ���� ���̺� ����
CREATE TABLE files (
    id NUMBER PRIMARY KEY, -- �������� ����Ͽ� ID �ڵ� ����
    file_name VARCHAR2(255) NOT NULL, -- ���� �̸�
    file_path VARCHAR2(500) NOT NULL, -- ���� ���
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- ���ε� �ð� (�⺻�� ���� �ð�)
);
/

-- 3. ������ ���� (ID �ڵ� ���� �뵵)
CREATE SEQUENCE files_seq
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;
/

-- 4. Ʈ���� ���� (INSERT �� �ڵ����� ID ���� ����)
CREATE OR REPLACE TRIGGER files_trigger
BEFORE INSERT ON files
FOR EACH ROW
WHEN (NEW.id IS NULL)
BEGIN
    SELECT files_seq.NEXTVAL INTO :NEW.id FROM dual;
END;
/
