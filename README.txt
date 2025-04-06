1. design_id를 자동으로 1씩 증가시키기 위해 user_design_seq 시퀀스 작성

CREATE SEQUENCE user_design_seq
START WITH 1        -- 1부터 시작
INCREMENT BY 1      -- 1씩 증가
NOCACHE;            -- 캐싱 안 함 (즉시 반영)



2. UserDesignMapper.xml 에서 다음과 같이 작성하면 사용자가 디자인을 저장할 때마다 고유한 design_id가 자동 생성된다.

<selectKey keyProperty="designId" resultType="long" order="BEFORE">
  SELECT user_design_seq.NEXTVAL FROM dual
</selectKey>


3. Clothes, Fabric, Size, Sizespec.jsx에서 localStorage, sessionStorage를 이용하여 세션에 사용자가 선택한 항목을 임시 저장한다. 

4. FinalConfirmation.jsx에서 세션에 저장해뒀던 데이터를 불러와서 화면에 띄우고 디자인 이름 작성 후 저장버튼을 누르면 해당 데이터들을 데이터베이스에 최종 저장한다. 
